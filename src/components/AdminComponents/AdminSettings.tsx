import React, { useState } from "react";
import { category} from "../../hooks/Fetchinfo";
import apiClient from "../../apiClient";

import { Table } from "../../types";
import { useToast } from "../../context/ToastContext";
import { WaiterLoading } from "../Loading";

interface AdminSettingsProps {
  categories: category[];
  setCategories: React.Dispatch<React.SetStateAction<category[]>>;
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  tablesLoading: boolean;
  secretCode: string;
  username: string;
}

const AdminSettings = ({
  categories,
  setCategories,
  tables,
  setTables,
  tablesLoading,
  secretCode,
  username,

}: AdminSettingsProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [newCategory, setNewCategory] = useState<string>("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const [isTablesOpen, setIsTablesOpen] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState("");
  const [newTableCapacity, setNewTableCapacity] = useState("");

  const handleAddTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNumber || !newTableCapacity) return;

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await apiClient.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/table/add`,
        {
          number: parseInt(newTableNumber),
          capacity: parseInt(newTableCapacity),
        },
        {
          headers: { Authorization: token },
        },
      );

      if (response.data && response.data.table) {
        setTables((prev) => [...prev, response.data.table]);
        setNewTableNumber("");
        setNewTableCapacity("");
        showToast(`Table #${newTableNumber} added successfully!`);
      }
    } catch (error) {
      console.error("Error adding table:", error);
      showToast("Failed to add table. Number might be duplicate.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTable = async (id: number) => {
    if (!confirm("Are you sure you want to delete this table?")) return;
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      await apiClient.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/table/${id}`,
        {
          headers: { Authorization: token },
        },
      );
      setTables((prev) => prev.filter((t) => t.id !== id));
      showToast("Table deleted successfully!");
    } catch (error) {
      console.error("Error deleting table:", error);
      showToast("Failed to delete table. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const DeleteCategory = async (categoryToDelete: category) => {
    try {
      setIsLoading(true);
      await apiClient
        .delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/delete/${categoryToDelete.id}`,
        )
        .then(() => {
          setCategories((prevCategories) =>
            prevCategories.filter(
              (category) => category.id !== categoryToDelete.id,
            ),
          );
          showToast(
            `Category "${categoryToDelete.name}" deleted successfully!`,
          );
        });
    } catch (error) {
      console.error("Error deleting category:", error);
      showToast("Failed to delete category.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const AddCategory = async (name: string) => {
    try {
      setIsLoading(true);
      await apiClient
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/category/add`, {
          name,
        })
        .then((response) => {
          setCategories((prevCategories) => [
            ...prevCategories,
            response.data.category,
          ]);
          setNewCategory("");
          showToast(`Category "${name}" added successfully!`);
        });
    } catch (error) {
      console.error("Error adding category:", error);
      showToast("Failed to add category. Name might be duplicate.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler to copy the secret code to the clipboard
  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(secretCode)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  if (isLoading || tablesLoading ) {
    return <WaiterLoading />;
  }

  return (
    <div className="p-2 md:p-4 lg:p-6">
      <div className="flex flex-col gap-2 sticky top-6 z-20  pt-2 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="mt-1 mb-0 text-gray-600">
          Manage your account and application settings here.
        </p>
      </div>

      <div className="flex flex-col gap-2 relative">
        <div className="pl-1">
          <h2 className="text-4xl font-bold text-gray-800"> {username}'s Restaurent</h2>
        </div>
        {/* --- Secret Code Section (No changes) --- */}
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1 ">
              Secret Code
            </h2>
            <p className="text-sm text-gray-500 ">
              This code is required for certain administrative actions.
            </p>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md">
            <span className="flex-grow font-mono text-gray-700 tracking-wider">
              {secretCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center justify-center w-24 px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            >
              {isCopied ? (
                "Copied!"
              ) : (
                <>
                  <CopyIcon className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* --- Categories Accordion Section --- */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          {/* Header row with title, form, and toggle */}
          <div className="flex justify-between items-start gap-2">
            <div className="flex-shrink pr-4">
              <h2 className="text-xl font-bold text-gray-800 text-left">
                Manage Categories
              </h2>
              <p className="text-sm text-gray-500 text-left mt-1">
                Add or remove categories for your menu items.
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <form
                className="flex-grow flex items-center gap-2 max-w-sm"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newCategory.trim()) {
                    AddCategory(newCategory);
                  }
                }}
              >
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category name"
                  className="flex-grow px-6 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                >
                  Add
                </button>
              </form>

              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
              >
                <ChevronDownIcon
                  className={`w-6 h-6 transition-transform duration-300 ${isCategoriesOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          <div className="flex justify-end  pt-2 ml-2">
            {/* Accordion Content */}
            {isCategoriesOpen && (
              <div className=" w-4/12 flex-shrink-0  border-gray-200 pl-6">
                <div className="space-y-3">
                  <h3 className="text-md font-semibold text-gray-700 border-b pb-2">
                    Existing Categories
                  </h3>
                  {/* CHANGE: Check categories.length (which is now safely an array) */}
                  {categories.length > 0 ? (
                    <ul className="space-y-2 pt-2">
                      {/* CHANGE: Loop over 'categories' array */}
                      {categories.map((category) => (
                        <li
                          // CHANGE: Use 'category.id' for the key
                          key={category.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200"
                        >
                          {/* CHANGE: Display 'category.name' */}
                          <span className="text-gray-800 font-medium">
                            {category.name}
                          </span>
                          <button
                            onClick={() => DeleteCategory(category)}
                            // CHANGE: Pass the entire 'category' object to the handler
                            className="p-1 text-red-500 rounded-md hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                            // CHANGE: Use 'category.name' in the aria-label
                            aria-label={`Delete ${category.name}`}
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No categories added yet.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* --- Tables Accordion Section --- */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-shrink pr-4">
              <h2 className="text-xl font-bold text-gray-800 text-left">
                Manage Tables
              </h2>
              <p className="text-sm text-gray-500 text-left mt-1">
                Add or remove tables for your restaurant.
              </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <form
                className="flex-grow flex items-center gap-2"
                onSubmit={handleAddTable}
              >
                <input
                  type="number"
                  required
                  min="1"
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 w-24"
                  placeholder="No."
                />
                <input
                  type="number"
                  required
                  min="1"
                  value={newTableCapacity}
                  onChange={(e) => setNewTableCapacity(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 w-24"
                  placeholder="Cap."
                />
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                >
                  Add
                </button>
              </form>

              <button
                onClick={() => setIsTablesOpen(!isTablesOpen)}
                className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
              >
                <ChevronDownIcon
                  className={`w-6 h-6 transition-transform duration-300 ${isTablesOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-2 ml-2">
            {/* Accordion Content */}
            {isTablesOpen && (
              <div className="w-full pl-6 border-t border-gray-100 mt-4 pt-4">
                <div className="space-y-3">
                  <h3 className="text-md font-semibold text-gray-700 border-b pb-2">
                    Existing Tables
                  </h3>

                  {tablesLoading ? (
                    <p className="text-center text-gray-500 py-4">
                      Loading tables...
                    </p>
                  ) : tables.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                      {tables.map((table) => (
                        <div
                          key={table.id}
                          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                        >
                          <div>
                            <span className="block text-lg font-bold text-gray-800">
                              Table #{table.number}
                            </span>
                            <span className="text-sm text-gray-500">
                              Capacity: {table.capacity}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteTable(table.id)}
                            className="p-2 text-red-500 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors"
                            aria-label={`Delete Table ${table.number}`}
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No tables added yet.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminSettings;

const CopyIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const TrashIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
