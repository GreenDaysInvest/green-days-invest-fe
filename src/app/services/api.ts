import axios from 'axios';

// Create a new instance of axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',  // Base URL of your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Set up interceptors if needed
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Export the singleton instance
export default axiosInstance;
