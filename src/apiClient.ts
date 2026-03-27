import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Your backend URL
  withCredentials: true,             // The critical setting
});

export default apiClient;