import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/Authcontext';

export enum Role {
    ADMIN = "ADMIN",
    WAITER = "WAITER",
    KITCHEN = "KITCHEN"
}

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, { email, password });
            
            if (response.status === 200) {
                const userRole = response.data.ROLE as Role;
                const token = response.data.token;
                
                localStorage.setItem("role", userRole);
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
                setError(response.data.message || "An unexpected error occurred.");
            }
        } catch (err: any) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Invalid credentials or server error.";
            setError(errorMessage);
        }
    }

    return (
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

            {/* Right Pane - Login Form */}
            <div className="flex justify-center items-center bg-gray-50 p-6 md:p-8">
                <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <div className="text-center mb-5">
                        <h2 className="text-xl font-bold text-gray-800 mb-1">Welcome Back!</h2>
                        <p className="text-xs text-gray-500">
                            Log in to continue managing your operations.
                        </p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-50 text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                                required
                            />
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-md text-sm" role="alert">
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="pt-2">
                             <button
                                type="submit"
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition duration-150"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center mt-5">
                        <p className="text-xs text-gray-500">
                           Don't have an account?{' '}
                            <span onClick={() => navigate('/signup')} className="font-medium text-amber-600 hover:underline cursor-pointer">
                                Sign Up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}