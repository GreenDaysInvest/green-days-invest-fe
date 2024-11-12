import axios from 'axios';
import axiosInstance from './api'; 
import { User } from '../types/Auth.type';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

const AuthService = {
  getUserFromSession: async (): Promise<any | null> => {
    const userProfile = await AuthService.getProfile();
    if (userProfile) {
      return userProfile;
    }
    return null;
  },

  saveToken: (token: string): void => {
    localStorage.setItem('token', token); // Save token in localStorage
  },

  clearToken: (): void => {
    localStorage.removeItem('token'); // Clear token from localStorage
  },

  register: async (userData: User): Promise<any> => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      return response.data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data;
      }
      throw error;
    }
  },

  login: async (email: string, password: string): Promise<string> => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      AuthService.saveToken(response.data.token); // Use AuthService here
      return response.data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data; 
      }
      throw error; 
    }
  },

  loginWithFirebase: async (token: string): Promise<string> => {
    try {
      const response = await axiosInstance.post('/auth/login/firebase', { token });
      AuthService.saveToken(response.data.token); // Use AuthService here
      return response.data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data;
      }
      throw error; 
    }
  },

  getProfile: async (): Promise<any> => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      console.warn("Token not found, user might be logged out.");
      return null; // Return null if no token, or handle accordingly
    }
    try {
      const response = await axiosInstance.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data;
      }
      throw error;
    }
  },

  updateProfile: async (userData: User): Promise<any> => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) throw new Error("Token not found"); // Handle missing token
    try {
      const response = await axiosInstance.put('/auth/profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data;
      }
      throw error;
    }
  },

  logout: (): void => {
    AuthService.clearToken();
    localStorage.removeItem('token'); 
    signOut(auth);
  },
};

export default AuthService;
