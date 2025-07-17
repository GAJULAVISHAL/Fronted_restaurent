import { MdChevronLeft, MdChevronRight, MdLogout, MdRestaurantMenu  } from "react-icons/md";
import { motion } from 'framer-motion';
import { useAuth } from "../hooks/Authcontext";
import { useState } from "react";
import AdminMenu from "../components/AdminComponents/AdminMenu";
import { useItems } from "../hooks/Fetchitems";

export type AdminView = 'Dashboard' | 'Menu' | 'Settings';
export const AdminPage: React.FC = () => {
    const { logout } = useAuth();
    const { loading, items, setItems } = useItems();
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeView, setActiveView] = useState('Menu'); // State to control the view

    const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

    const navItems = [
        { icon: <MdRestaurantMenu size={24} />, text: 'Menu' },
        
    ];

    const renderActiveView = () => {
        switch (activeView) {
            case 'Menu':
                return <AdminMenu loading={loading} items={items} setItems={setItems}/>;
            
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <aside
                className={`fixed top-0 left-0 h-full bg-white shadow-lg flex flex-col transition-all duration-300 ease-in-out z-40 ${isSidebarCollapsed ? 'w-20' : 'w-64'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 h-16">
                    {!isSidebarCollapsed && <span className="text-xl font-bold text-indigo-600">Delish</span>}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
                    >
                        {isSidebarCollapsed ? <MdChevronRight size={24} /> : <MdChevronLeft size={24} />}
                    </button>
                </div>
                <nav className="flex-1 mt-6">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.text} className="px-4 py-2">
                                <motion.button
                                    onClick={() => setActiveView(item.text)}
                                    className={`flex items-center w-full p-2 text-gray-600 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition-colors ${activeView === item.text ? 'bg-indigo-100 text-indigo-600' : ''
                                        }`}
                                >

                                    {item.icon}
                                    {!isSidebarCollapsed && <span className="ml-4 font-medium">{item.text}</span>}
                                </motion.button>
                               
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={logout}
                        className="w-full flex items-center p-2 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
                        <MdLogout size={24} />
                        {!isSidebarCollapsed && <span className="ml-4 font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            <main
                className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-20' : 'ml-64'
                    }`}
            >
                {renderActiveView()}
            </main>
        </div>
    );
};

