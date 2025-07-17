import { motion } from 'framer-motion';
import {  LogOut, Plus } from 'lucide-react';
import type { WaiterView } from '../../Pages/WaiterPage';

// Navigation items remain the same
const navItems = [
  { id: 'new-order', label: 'Place Order', icon: Plus },
];

interface WaiterSidebarProps {
  activeView: WaiterView;
  setActiveView: (view: WaiterView) => void;
}

export const WaiterSidebar = ({ activeView, setActiveView }: WaiterSidebarProps) => {
  return (
    
    <aside className="
      bg-blue-600 text-white flex justify-between items-center fixed z-50 top-0 left-0 w-full h-16 px-4 md:flex-col md:h-screen md:w-64 md:p-4 md:justify-start md:items-stretch
    ">
      {/* Logo - visible on desktop, hidden on mobile for space */}
      <div className="hidden md:block text-2xl font-bold mb-10">
        Delish<span className="text-blue-200"></span>
      </div>

      {/* Navigation List */}
      <ul className="
        flex items-center gap-x-2
        md:flex-col md:items-stretch md:gap-y-2
      ">
        {navItems.map((item) => (
          <li key={item.id}>
            <motion.button
              onClick={() => setActiveView(item.id as WaiterView)}
              className={`
                flex items-center w-full font-semibold rounded-lg transition-colors duration-200
                p-3 md:p-2.5 md:pl-4 
                focus:outline-none focus:ring-2 focus:ring-white/50
                ${
                  activeView === item.id
                    ? 'bg-white text-blue-600' 
                    : 'hover:bg-blue-500'       
                }`
              }
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-6 h-6 md:w-5 md:h-5" />
              <span className="hidden md:inline-block ml-4">{item.label}</span>
            </motion.button>
          </li>
        ))}
      </ul>

      {/* User Profile / Logout - at the bottom on desktop, right side on mobile */}
      <div className="md:mt-auto">
        <button className="flex items-center p-2 rounded-lg hover:bg-blue-500 transition-colors">
            <div className="hidden md:flex flex-col items-start ml-3">
                <span className="text-xs text-blue-200"><LogOut/></span>
            </div>
        </button>
      </div>
    </aside>
  );
};