import React, { createContext, useContext, useState, useEffect} from "react";
import { Role } from "../Pages/LoginPage";

interface AuthContextProps {
  userRole: Role | null;
  isAuthenticated: Boolean;
  login: (role: Role) => void; // Function to log in
  logout: () => void; // Function to log out
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<Role | null>(null); // Initially, no role is set
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [loading , setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log("Restoring session",token, role);

    if (token && role) {
      setUserRole(role as Role);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (role: Role) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  if(loading){
    return <div>Loading...</div>
  }
  return (
    <AuthContext.Provider value={{ userRole, isAuthenticated , login , logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
