// src/components/MenuItemCard.tsx
import React, { useState } from 'react';
import { MdEdit, MdDelete, MdCheck, MdClose } from 'react-icons/md';
import { MenuItem } from './AdminMenu'; // Assuming MenuItem is exported from AdminDashboard

// --- Prop Definition ---
interface MenuItemCardProps {
    item: MenuItem;
    onSave: (id: number, name: string, price: number) => void; // Changed from onEdit to onSave for clarity
    onDelete: (id: number) => void;
    onToggleAvailability: (id: number, currentStatus: boolean) => void;
}

// A simple toggle switch component (can be in its own file or here)
const AvailabilityToggle: React.FC<{ isAvailable: boolean; onChange: () => void }> = ({ isAvailable, onChange }) => (
    <label className="flex items-center cursor-pointer">
        <div className="relative">
            <input type="checkbox" className="sr-only" checked={isAvailable} onChange={onChange} />
            <div className={`block w-14 h-8 rounded-full transition ${isAvailable ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isAvailable ? 'transform translate-x-6' : ''}`}></div>
        </div>
    </label>
);

// --- The Card Component ---
export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSave, onDelete, onToggleAvailability }) => {
    // --- State for In-Place Editing ---
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(item.name);
    const [editedPrice, setEditedPrice] = useState(item.price.toString()); // Use string for input field compatibility

    // --- Handlers for Edit Mode ---
    const handleSaveClick = () => {
        // Basic validation
        if (!editedName.trim() || !Number(editedPrice) || Number(editedPrice) <= 0) {
            alert("Please enter a valid name and price.");
            return;
        }
        onSave(item.id, editedName, Number(editedPrice));
        setIsEditing(false); // Exit edit mode
    };

    const handleCancelClick = () => {
        // Reset changes and exit edit mode
        setEditedName(item.name);
        setEditedPrice(item.price.toString());
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between transition-shadow hover:shadow-xl duration-300">
            <div>
                <img
                    src={item.imageUrl || 'https://via.placeholder.com/400x250.png?text=No+Image'}
                    alt={item.name}
                    className="w-full h-28 object-cover" 
                />
                <div className="p-2"> {/* Reduced padding */}
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
                        {item.category}
                    </span>
                    
                    {isEditing ? (
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-lg font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <div className='flex items-center'>
                                <span className='text-gray-500 mr-1'>₹</span>
                                <input
                                    type="number"
                                    value={editedPrice}
                                    onChange={(e) => setEditedPrice(e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-base font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-lg font-bold text-gray-800 truncate">{item.name}</h3> {/* Reduced font size */}
                            <p className="text-base font-semibold text-gray-600 mt-1">₹ {item.price}</p> {/* Reduced font size */}
                        </>
                    )}
                </div>
            </div>

            {/* --- Action Bar --- */}
            <div className="p-2 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    {!isEditing && (
                        <div className='flex flex-col'>
                            <AvailabilityToggle
                                isAvailable={item.isAvailable}
                                onChange={() => onToggleAvailability(item.id, item.isAvailable)}
                            />
                            <span className="text-gray-600 font-medium text-xs mt-1">
                                {item.isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                        </div>
                    )}
                    <div className="flex space-x-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSaveClick}
                                    className="p-2 text-green-600 hover:bg-green-100 rounded-full transition"
                                    title="Save Changes"
                                >
                                    <MdCheck size={24} />
                                </button>
                                <button
                                    onClick={handleCancelClick}
                                    className="p-2 text-red-600 hover:bg-red-100 rounded-full transition"
                                    title="Cancel Edit"
                                >
                                    <MdClose size={24} />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition"
                                    title="Edit Item"
                                >
                                    <MdEdit size={22} />
                                </button>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition"
                                    title="Delete Item"
                                >
                                    <MdDelete size={22} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};