import React, { useState } from "react";
import { MdCloudUpload, MdClose } from "react-icons/md";
import { category, item } from "../../hooks/Fetchinfo";
import apiClient from "../../apiClient";
import { useToast } from "../../context/ToastContext";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  setItems: React.Dispatch<React.SetStateAction<item[]>>;
  categories: category[];
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  setItems,
  categories,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    categoryId: 0,
    price: 0,
    imageUrl: "",
  });
  const [imageUpload, setImageUpload] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUpload(true);
    setImagePreview(URL.createObjectURL(file));

    const data = new FormData();
    data.append("file", file);

    try {
      // Use the new backend API endpoint
      const response = await apiClient.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/uploadImage`,
        data,
      );
      
      const imageUrl = response.data.secure_url;
      setFormData((prev) => ({ ...prev, imageUrl }));
      showToast("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed", error);
      setImagePreview(null); // Clear preview on error
      showToast("Image upload failed.", "error");
    } finally {
      setImageUpload(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    if (!formData.name || !formData.categoryId || formData.price <= 0) {
      alert("Please fill in all fields correctly");
      return;
    }

    setIsSubmitting(true); // Disable button

    try {
      // 1. API Call
      const response = await apiClient.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/addItem`,
        formData,
      );

      // 2. Extract backend data
      const backendItem = response.data;

      // 3. CRITICAL FIX for White Screen
      // We must find the category object because your interface requires it.
      const categoryObj = categories.find(
        (c) => c.id === Number(formData.categoryId),
      );

      // Create an object that STRICTLY matches your 'item' interface
      const newItemForState: item = {
        id: backendItem.id,
        name: backendItem.name,
        price: backendItem.price,
        imageUrl: backendItem.imageUrl,
        isAvailable: backendItem.isAvailable,
        // This is the magic fix: We put the Object into the property, not the Number
        category: categoryObj as category,
      };

      // 4. Update State
      setItems((prevItems) => [...prevItems, newItemForState]);

      // 5. Cleanup
      setFormData({
        name: "",
        categoryId: 0,
        price: 0,
        imageUrl: "",
      });
      showToast(`Item "${formData.name}" added successfully!`);
      onClose();
    } catch (error) {
      console.error("Error adding item", error);
      showToast(
        "Failed to add item. Check your connection or duplicates.",
        "error",
      );
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Add New Menu Item
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <MdClose size={24} className="text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields styled for the light theme */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
              required
            />
          </div>

          {/* Improved Image Uploader */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-24 w-auto rounded-md"
                  />
                ) : (
                  <MdCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                  >
                    <span>
                      {imageUpload ? "Uploading..." : "Upload a file"}
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-2 px-4 font-semibold rounded-md shadow-sm text-white ${isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
            >
              {isSubmitting ? "Saving..." : "Save Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
