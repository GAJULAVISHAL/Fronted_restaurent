import { LogOut, ChevronLeft, ChevronRight, List } from "lucide-react";
import { useAuth } from "../../hooks/Authcontext";

interface KitchenSidebarProps {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const KitchenSidebar = ({
  isSidebarCollapsed,
  toggleSidebar,
}: KitchenSidebarProps) => {
  const { logout } = useAuth();

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

      {/* Navigation Links - Placeholder for now as Kitchen mainly uses the dashboard */}
      <nav className="flex-1 mt-6 px-2">
        <ul className="flex flex-col gap-y-2">
          <li>
            <div
              className={`flex items-center w-full rounded-lg p-3 bg-white text-blue-600 font-bold`}
            >
              <List
                className={`w-6 h-6 ${isSidebarCollapsed ? "mx-auto" : ""}`}
              />
              {!isSidebarCollapsed && <span className="ml-4">Orders</span>}
            </div>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer (for logout) */}
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
