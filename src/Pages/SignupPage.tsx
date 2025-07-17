import { FormEvent, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/Authcontext';
import { useNavigate } from 'react-router-dom';
import { Role } from '../types';
import { AdminCodeModal } from '../components/AdminCode';

export const SignupPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State for the form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: Role.ADMIN,
    code : ''
  });
  const [error, setError] = useState<string | null>(null);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedSecretCode, setGeneratedSecretCode] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/admin');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.role !== Role.ADMIN && !formData.code) {
        setError("A secret code is required for this role.");
        return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, formData);
      
      if (response.status === 200) {
        const userRole = response.data.ROLE as Role;
        const token = response.data.token;
        
        localStorage.setItem("role", userRole);
        localStorage.setItem("token", token);
        login(userRole);

        if (userRole === Role.ADMIN && response.data.adminCode) {
          setGeneratedSecretCode(response.data.adminCode);
          setIsModalOpen(true);
        } else {
          switch (userRole) {
            case Role.WAITER: navigate("/waiter"); break;
            case Role.KITCHEN: navigate("/kitchen"); break;
            default: navigate("/login");
          }
        }
      } else {
        setError(response.data.message || "An unexpected error occurred.");
      }
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Invalid details or server error.";
      setError(errorMessage);
    }
  };

  return (
    <>
      <AdminCodeModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        secretCode={generatedSecretCode}
      />
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Pane - Branding & Quote */}
        <div 
          className="relative hidden lg:flex flex-col justify-center items-center bg-cover bg-center text-white p-12"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">Delish</h1>
            <p className="text-2xl italic font-light">"Where every flavor tells a story."</p>
          </div>
        </div>

        {/* Right Pane - Signup Form */}
        <div className="flex justify-center items-center bg-gray-50 p-6 md:p-8">
          <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 border border-gray-200">
             <div className="text-center mb-5">
               <h2 className="text-xl font-bold text-gray-800 mb-1">Create Your Account</h2>
               <p className="text-xs text-gray-500">
                 Join Delish to manage your operations.
               </p>
             </div>
             <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name Input */}
               <div>
                 <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                 <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" placeholder="Enter your full name" required /> {/* Changed */}
               </div>
               {/* Email Input */}
               <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" placeholder="you@example.com" required /> {/* Changed */}
               </div>
               {/* Password Input */}
               <div>
                  <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1">Password</label>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-gray-50 text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" placeholder="Enter a secure password" required /> {/* Changed */}
               </div>
               {/* Role Select */}
               <div>
                  <label htmlFor="role" className="block text-xs font-medium text-gray-600 mb-1">Role</label>
                  <select id="role" name="role" value={formData.role} onChange={handleChange} className="w-full bg-gray-50 text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" required> {/* Changed */}
                      <option value={Role.ADMIN}>Admin</option>
                      <option value={Role.WAITER}>Waiter</option>
                      <option value={Role.KITCHEN}>Kitchen</option>
                  </select>
               </div>
               {/* Conditional Secret Code Input */}
               {formData.role !== Role.ADMIN && (
                   <div>
                      <label htmlFor="code" className="block text-xs font-medium text-gray-600 mb-1">Secret Code</label>
                      <input type="password" id="code" name="code" value={formData.code} onChange={handleChange} className="w-full bg-gray-50 text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" placeholder="Enter the admin's secret code" required /> {/* Changed */}
                  </div>
               )}
               {/* Error Display (No change needed here) */}
               {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-md text-sm" role="alert">
                    <span>{error}</span>
                  </div>
               )}
               {/* Submit Button */}
               <div className="pt-2">
                  <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition duration-150">Sign Up</button> {/* Changed */}
               </div>
             </form>
             {/* Login Link */}
             <div className="text-center mt-5">
               <p className="text-xs text-gray-500">Already have an account?{' '}
                  <span onClick={() => navigate('/login')} className="font-medium text-amber-600 hover:underline cursor-pointer">Log in</span> {/* Changed */}
               </p>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};