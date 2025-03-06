import React, { useState, useCallback } from 'react';
import { useItems } from '../hooks/Fetchitems';
import { Items } from './Items';
import axios from 'axios';
import { AdminLoading } from './Loading';
import { AddImageIcon } from './Icons';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

const AdminBody: React.FC = () => {
  const { loading, items, setItems } = useItems();
  const [activeTab, setActiveTab] = useState('All');
  const [additem, setAdditem] = useState<boolean>(false)
  const [imageUpload, setImageUpload] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    imageUrl: ""
  });

  const categories = [
    'JUICE', 'MILKSHAKE', 'SMOOTHIE', 'SALAD', 'SHARJAH',
    'LASSI', 'MOJITO', 'FALOODA', 'CHAAT', 'FRIES'
  ];

  const handleSave = useCallback(async (id: number, name: string, price: number) => {
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

  const handleDelete = useCallback(async (id: number) => {
    try {
      // Optimistic update - immediately remove from UI
      setItems(prevItems => prevItems.filter(item => item.id !== id));

      // API call to delete
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/deleteItem/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
    } catch (error) {
      console.error("Error deleting item", error);
      // Optionally, refetch items or show error toast
    }
  }, [setItems]);

  const HandleAddItem = () => {
    setAdditem(true)
  }

  const HandleSubmitItem = async () => {
    // Validate form data
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

      setAdditem(false);
      // Reset form data
      setFormData({
        name: '',
        category: '',
        price: 0,
        imageUrl: ""
      });
    } catch (error) {
      console.error("Error adding item", error);
      // Remove the optimistically added item if API call fails
      setItems(prevItems => prevItems.filter(item => item.id !== tempId));
      alert('Failed to add item. Please try again.');
    }
  }

  const HandleCanceItem = () => {
    setAdditem(false)
  }

  const HandleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return
    setImageUpload(true)
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', `${import.meta.env.VITE_CLOUDINARY_PRESET}`)
    data.append('cloud_name', `${import.meta.env.VITE_CLOUDINARY_NAME}`)

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
        data
      );
      const url = response.data.url;
      setFormData(prevState => ({
        ...prevState,
        imageUrl: url
      }));
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setImageUpload(false)
    }
  }

  const filteredItems =
    activeTab === 'All'
      ? items
      : items.filter((item) => item.category === activeTab);

  if (loading) {
    return <div><AdminLoading /></div>;
  }


  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 relative">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <div className="flex space-x-6 mb-6 border-b border-gray-700">
        {['All', ...new Set(items.map((item) => item.category as string))].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={HandleAddItem}
        >
          Add Item
        </button>
      </div>


      {
        additem && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="w-full max-w-md mx-auto p-6 bg-gray-700 text-black rounded-lg shadow-md">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        name: e.target.value
                      })
                    }}
                    className="w-full px-3 py-2 bg-black text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter item name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-white">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        category: e.target.value
                      })
                    }}
                    className="w-full px-3 py-2 bg-black text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-medium text-white">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        price: Number(e.target.value)
                      })
                    }}
                    className="w-full px-3 py-2 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-black"
                    placeholder="Enter price"
                    min="0"
                    step="1"
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <label htmlFor="price" className="block text-sm font-medium text-white">
                    Upload Image
                  </label>
                  <div className="w-full px-3 py-2 bg-black rounded-md shadow-sm flex flex-col justify-center items-center" >
                    {
                      imageUpload ? (<div className='text-white'>Uploading...</div>) : <AddImageIcon />
                    }
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept='image/*'
                      onChange={HandleUploadImage}
                      className="text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                      required
                    />
                  </div>
                </div>

                <div className='flex gap-2'>
                  <button
                    onClick={HandleSubmitItem}
                    className="w-full bg-gray-700 border border-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Save Item
                  </button>

                  <button
                    onClick={HandleCanceItem}
                    className="w-full bg-gray-700 border border-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>)
      }

      {filteredItems.map((item) => (
        <Items
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default AdminBody;
