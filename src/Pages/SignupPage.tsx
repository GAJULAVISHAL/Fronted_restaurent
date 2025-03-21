import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/Authcontext';
import { useNavigate } from 'react-router-dom';

export enum Role {
  ADMIN = "ADMIN",
  WAITER = "WAITER",
  KITCHEN = "KITCHEN"
}

export const SignupPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN' // Default role
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, formData)
      if (response.status == 200) {
        const userRole = response.data.ROLE as Role;
        const token = response.data.JWT;
        localStorage.setItem(" ", userRole);
        localStorage.setItem("token", token);
        login(userRole);

        switch (userRole) {
          case Role.ADMIN:
            navigate("/admin");
            break;
          case Role.WAITER:
            navigate("/waiter");
            break;
          case Role.KITCHEN:
            navigate("/kitchen");
            break;
          default:
            navigate("/login");
        }
      } else {
        alert("Incorrect Role")
      }
    } catch (err) {
      console.error(err)
      alert("invalid Details")
    }

  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
        {/* Sign Up Form */}
        <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to Delish</h2>
            <p className="text-gray-400">
              Create an account to access the restaurant menu portal.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-white mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="ADMIN">Admin</option>
                <option value="WAITER">Waiter</option>
                <option value="KITCHEN">Kitchen</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-150"
            >
              Sign Up
            </button>
          </form>
          <div>
            <p className="text-white mt-4">
              Already have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Log in
              </span>
            </p>
          </div>
        </div>

        {/* Default Credentials */}
        <div className="flex flex-col items-center bg-gray-900 text-gray-200 p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Try with default credentials in login page:
          </h2>
          <div className="bg-gray-800 p-4 rounded-lg w-full">
            <p className="mb-2">
              <strong className="text-blue-400">Admin:</strong>{" "}
              <span className="text-gray-300">vishalgajula0709@gmail.com</span>
            </p>
            <p className="mb-2">
              <strong className="text-green-400">Waiter:</strong>{" "}
              <span className="text-gray-300">waiter@gmail.com</span>
            </p>
            <p className="mb-2">
              <strong className="text-yellow-400">Cook:</strong>{" "}
              <span className="text-gray-300">cook@gmail.com</span>
            </p>
            <p className="mt-2">
              <strong className="text-red-400">Password:</strong>{" "}
              <span className="text-gray-300">qwertyuiop</span>
            </p>
          </div>
        </div>
      </div>
    </div>


  );
};
