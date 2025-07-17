// src/components/AddItemModal.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { MdCloudUpload, MdClose } from 'react-icons/md';
import { MenuItem } from './AdminMenu';

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    setItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, setItems }) => {
    const [formData, setFormData] = useState({ name: '', category: '', price: 0, imageUrl: '', isAvailable: true });
    const [imageUpload, setImageUpload] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const categories = ['JUICE', 'MILKSHAKE', 'SMOOTHIE', 'SALAD', 'SHARJAH', 'LASSI', 'MOJITO', 'FALOODA', 'CHAAT', 'FRIES'];

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageUpload(true);
        setImagePreview(URL.createObjectURL(file));

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', `${import.meta.env.VITE_CLOUDINARY_PRESET}`);
        data.append('cloud_name', `${import.meta.env.VITE_CLOUDINARY_NAME}`);

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, data);
            setFormData(prev => ({ ...prev, imageUrl: response.data.secure_url }));
        } catch (error) {
            console.error("Image upload failed", error);
            setImagePreview(null); // Clear preview on error
        } finally {
            setImageUpload(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.category || formData.price <= 0) {
            alert('Please fill in all fields correctly');
            return;
        }

        const tempId = Date.now(); // Temporary unique ID
        try {
            // Optimistic update
            const newItem: MenuItem = {
                ...formData,
                id: tempId, 
            };
            setItems(prevItems => [...prevItems, newItem]);

            // API call to add item
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/addItem`, formData, {
                headers: {
                    Authorization: localStorage.getItem("token") || ""
                }
            });

            // Update the item with the actual ID from the server
            setItems(prevItems =>
                prevItems.map(item =>
                    item.id === tempId
                        ? { ...item, id: response.data.id }
                        : item
                )
            );

            onClose(); 
            setFormData({
                name: '',
                category: '',
                price: 0,
                imageUrl: "",
                isAvailable: true
            });
        } catch (error) {
            console.error("Error adding item", error);
            // Remove the optimistically added item if API call fails
            setItems(prevItems => prevItems.filter(item => item.id !== tempId));
            alert('Failed to add item. Please try again.');
        }

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Add New Menu Item</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <MdClose size={24} className="text-gray-600" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Form fields styled for the light theme */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Item Name</label>
                        <input type="text" name="name" onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select name="category" onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
                            <option value="">Select a category</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input type="number" name="price" onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" min="0" required />
                    </div>

                    {/* Improved Image Uploader */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="mx-auto h-24 w-auto rounded-md" />
                                ) : (
                                    <MdCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                                )}
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                        <span>{imageUpload ? 'Uploading...' : 'Upload a file'}</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700">Save Item</button>
                    </div>
                </form>
            </div>
        </div>
    );
};