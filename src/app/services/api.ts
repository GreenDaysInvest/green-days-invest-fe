import axios from 'axios';

// Backend URL from the environment variables
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create a new instance of axios
const axiosInstance = axios.create({
  baseURL,  // Base URL of your backend
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
