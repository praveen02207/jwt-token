import axios from 'axios';
import { getValidAccessToken, logout } from './tokenService';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getValidAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
