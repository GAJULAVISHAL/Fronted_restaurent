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
    const { login } = useAuth();
    const navigate = useNavigate()

    const Login = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, { email, password });
            if (response.status === 200) {
                const userRole = response.data.ROLE as Role;
                const token = response.data.JWT;
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
            }
            else {
                alert("Incorrect Role");
            }
        } catch (err) {
            console.error(err);
            alert("Invalid credentials");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-xl shadow-2xl">
                <h1 className="text-2xl font-semibold text-center mb-2">Welcome to Delish</h1>
                <p className="text-center text-gray-400 mb-6">
                    Enter your username and password to access the restaurant menu portal.
                </p>
                <form onSubmit={Login} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                            Username
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="text-right">
                        <a
                            href="#"
                            className="text-sm text-blue-400 hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}