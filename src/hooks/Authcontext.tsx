import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // You'll need axios here
import { Role } from "../types";

interface AuthContextProps {
    userRole: Role | null;
    isAuthenticated: boolean; // Use boolean, not Boolean
    loading: boolean; // Expose loading state to consumers
    login: (role: Role) => void;
    logout: () => Promise<void>; // Logout is now an async operation
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userRole, setUserRole] = useState<Role | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Start in a loading state

    useEffect(() => {
        // This function will run on initial app load to check if a valid
        // session cookie exists.
        const verifyAuth = async () => {
            try {
                // You need an endpoint that verifies the cookie and returns user info.
                // This endpoint must be protected by your AuthMiddleware.
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile`, {
                    withCredentials: true,
                });

                // If the request succeeds, the user is authenticated.
                if (response.data && response.data.user) {
                    setUserRole(response.data.user.role as Role);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                // Any error (e.g., 401 Unauthorized) means the user is not logged in.
                setUserRole(null);
                setIsAuthenticated(false);
            } finally {
                // Stop loading once the check is complete.
                setLoading(false);
            }
        };

        verifyAuth();
    }, []); // The empty array ensures this runs only once.

    // This function can be called from your login page *after* the
    // login API call has succeeded and set the cookie.
    const login = (role: Role) => {
        setUserRole(role);
        setIsAuthenticated(true);
    };

    // Logout must now call a backend endpoint to clear the HttpOnly cookie.
    const logout = async () => {
        try {
            // You need an endpoint that clears the authentication cookie.
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`, {}, {
                withCredentials: true,
            });
        } catch (error) {
            console.error("Logout failed on the server:", error);
        } finally {
            // Always clear the state on the client-side.
            setUserRole(null);
            setIsAuthenticated(false);
        }
    };

    // Show a loading indicator while we verify the user's session.
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ userRole, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// useAuth hook remains the same
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};