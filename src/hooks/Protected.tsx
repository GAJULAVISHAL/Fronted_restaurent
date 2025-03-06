import { Navigate } from "react-router-dom";
import { Role } from "../Pages/LoginPage";
import { useAuth } from "./Authcontext";

interface ProtectedRouteProps{
    children: React.ReactNode;
    role: Role;
}
export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
    const { userRole , isAuthenticated} = useAuth();

    if(isAuthenticated === false){
        return <Navigate to="/" />
    }

    if(isAuthenticated && userRole !== role){
        return <Navigate to="/unAuthorized" />
    }       
    
    return (
        <div>
            {children}
        </div>
    )
}