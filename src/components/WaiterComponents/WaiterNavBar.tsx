import { motion } from "framer-motion";
import {
  LogOut,
  LayoutGrid,
  ListOrdered,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { WaiterView } from "../../Pages/WaiterPage";

// Navigation items
const navItems = [
  { id: "new-order", label: "Place Order", icon: Plus },
  { id: "active-orders", label: "Active Orders", icon: ListOrdered },
  { id: "table-map", label: "Table Map", icon: LayoutGrid },
];

interface WaiterSidebarProps {
  activeView: WaiterView;
  setActiveView: (view: WaiterView) => void;
  logout: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const WaiterSidebar = ({
  activeView,
  setActiveView,
  logout,
  isSidebarCollapsed,
  toggleSidebar,
}: WaiterSidebarProps) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-blue-600 text-white shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out z-50 ${
        isSidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header with Logo and Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-blue-500 h-16">
        {!isSidebarCollapsed && (
          <span className="text-2xl font-bold">Delish</span>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-blue-500 text-white transition-colors"
        >
          {isSidebarCollapsed ? (
            <ChevronRight size={24} />
          ) : (
            <ChevronLeft size={24} />
          )}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 mt-6 px-2">
        <ul className="flex flex-col gap-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <motion.button
                onClick={() => setActiveView(item.id as WaiterView)}
                className={`
                  flex items-center w-full rounded-lg transition-colors duration-200
                  p-3 
                  focus:outline-none focus:ring-2 focus:ring-white/50
                  ${
                    activeView === item.id
                      ? "bg-white text-blue-600 font-bold"
                      : "hover:bg-blue-500 text-white"
                  }
                `}
                whileTap={{ scale: 0.95 }}
                title={isSidebarCollapsed ? item.label : ""}
              >
                <item.icon
                  className={`w-6 h-6 ${isSidebarCollapsed ? "mx-auto" : ""}`}
                />
                {!isSidebarCollapsed && (
                  <span className="ml-4">{item.label}</span>
                )}
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile / Logout */}
      <div className="p-4 border-t border-blue-500">
        <button
          onClick={logout}
          className={`flex items-center w-full p-2 rounded-lg hover:bg-blue-500 transition-colors ${isSidebarCollapsed ? "justify-center" : ""}`}
          title="Logout"
        >
          <LogOut className="w-6 h-6" />
          {!isSidebarCollapsed && (
            <span className="ml-4 font-semibold">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};
