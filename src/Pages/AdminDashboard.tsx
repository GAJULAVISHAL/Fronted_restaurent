import AdminBody from "../components/AdminBody"
import { AppBar } from "../components/AppBar"

export const AdminPage = () => {
    return (
        <div className="min-h-screen relative">
            <AppBar/>
            <AdminBody/>
        </div>
    )
}