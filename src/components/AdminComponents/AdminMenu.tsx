// src/components/AdminDashboard.tsx
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { item} from '../../hooks/Fetchitems'; // Assuming this hook exists and works
import { AdminLoading } from '../Loading'; // Assuming this component exists
import { AddItemModal } from './AddMenuItem'; // We'll keep the modal separate for cleanliness
import { MenuItemCard } from './Items'; // And the card component separate too
import { MdAdd } from 'react-icons/md';

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
}

export interface AdminMenuProps {
  items: item[];
  setItems: React.Dispatch<React.SetStateAction<item[]>>;
  loading: boolean;
}

const AdminMenu = ({items, setItems, loading}:AdminMenuProps) => {
  // --- State Management ---
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setModalOpen] = useState(false);


  const handleToggleAvailability = async (id: number, currentStatus: boolean) => {
    // Optimistic Update
    setItems(prev => prev.map(item => item.id === id ? { ...item, isAvailable: !currentStatus } : item));
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/updateItem`,
        { id, isAvailable: !currentStatus },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
    } catch (error) {
      console.error("Failed to update availability", error);
      // Revert on failure
      setItems(prev => prev.map(item => item.id === id ? { ...item, isAvailable: currentStatus } : item));
    }
  };

  const handleDelete = useCallback(async (id: number) => {
    // Optimistic delete
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/deleteItem/${id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
    } catch (error) {
      console.error("Error deleting item", error);
      // Consider re-fetching or showing an error toast to revert
    }
  }, [setItems]);

  const handleEdit = useCallback(async (id: number, name: string, price: number) => {
    try {
      // Optimistic update
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, name, price } : item
        )
      );

      // API call to update
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/updateItem`, { id, name, price }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
    } catch (error) {
      console.error("Error updating item", error);
      // Revert the optimistic update if API call fails
      // You might want to show an error toast here
    }
  }, [setItems]);

  const uniqueCategories = ['All', ...new Set(items.map((item) => item.category))];
  const filteredItems = activeTab === 'All'
    ? items
    : items.filter((item) => item.category === activeTab);

  return (
    <div>
      <div className="p-6 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Menu Management</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            <MdAdd size={20} />
            Add New Item
          </button>
        </header>

        {loading ? (
          <AdminLoading />
        ) : (
          <>
            {/* Category Filters */}
            <div className="mb-6">
              <div className="flex space-x-2 border-b border-gray-300 overflow-x-auto pb-2 scrollbar-hide">
                {uniqueCategories.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors ${activeTab === tab
                      ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50'
                      : 'text-gray-500 hover:text-gray-800'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Item Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  onToggleAvailability={handleToggleAvailability}
                  onSave={handleEdit}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        setItems={setItems}
      />
    </div>
  );
};

export default AdminMenu;