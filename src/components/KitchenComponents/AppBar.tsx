// src/components/Sidebar.tsx
import { useAuth } from "../../hooks/Authcontext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the sidebar
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { logout } = useAuth();

  // SVG icons for a cleaner look
  const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );

  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <>
      {/* Overlay: appears when sidebar is open, closes sidebar on click */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-blue-600 text-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-blue-500">
            <span className="text-2xl font-bold">Delish</span>
            <button onClick={onClose} className="text-blue-200 hover:text-white">
                <CloseIcon />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow p-4">
            {/* You can add more links here in the future */}
          </nav>

          {/* Sidebar Footer (for logout) */}
          <div className="p-4 border-t border-blue-500">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LogoutIcon />
              <span className="font-semibold">Logout</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};