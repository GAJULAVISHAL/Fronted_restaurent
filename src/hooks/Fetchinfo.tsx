import { useEffect, useState } from "react";
import apiClient from "../apiClient";
import { Table } from "../types";

export interface category {
  id: number;
  name: string;
  adminId: number;
}

export interface item {
  id: number;
  name: string;
  price: number;
  category: category;
  imageUrl: string;
  isAvailable: boolean;
}

// No changes are needed here.
export const useItems = (availabelOnly: boolean = false) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<item[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // withCredentials: true is the key. It tells the browser to automatically
    // send the HttpOnly cookie with this request.
    const fetchItems = async () => {
      try {
        const url = availabelOnly
          ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/get?available=true`
          : `${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/get`;

        const response = await apiClient.get(url);
        setItems(response.data.items);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { loading, items, setItems, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<category[]>([]);
  useEffect(() => {
    apiClient
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/category/get`)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);
  return { categories, setCategories };
};

export const useTables = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [tablesLoading, setTablesLoading] = useState(false);
  useEffect(()=>{
    const fetchTables = async()=>{
        setTablesLoading(true);
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/table`);
            // Assuming response structure matches TableMap: { tables: [...] }
            if (response.data && response.data.tables) {
                setTables(response.data.tables);
            }
        } catch (error) {
            console.error("Error fetching tables:", error);
        } finally {
            setTablesLoading(false);
        }
    }
    fetchTables();
  },[])
  return { tables, setTables, tablesLoading };
};

export const UseAdminProfile =()=>{
  const [adminSecret, setAdminSecret] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loading, SetLoading] = useState(true);
  useEffect(()=>{
    const fetchAdminId = async()=>{
      try {
        const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile`);
        setAdminSecret(response.data.user.adminCode);
        setUsername(response.data.user.name);
      } catch (error) {
        console.error("Error fetching admin ID:", error);
      } finally {
        SetLoading(false);
      }
    }
    fetchAdminId();
  },[]);
  return { adminSecret, username, loading };
}
