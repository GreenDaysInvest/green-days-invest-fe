import axios from 'axios';
import axiosInstance from './api'; 
import { CreateQuestionnaireRequest } from '../types/Questionnaire.type';


const QuestionnaireService = {
  createQuestionnaire: async (questions: CreateQuestionnaireRequest): Promise<any> => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) throw new Error("Token not found"); // Handle missing token
    try {
      const response = await axiosInstance.post('/questionnaires', questions, {
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

  getUserQuestionnaires: async (userId: string): Promise<any[]> => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) throw new Error("Token not found"); // Handle missing token
    try {
      const response = await axiosInstance.get(`/questionnaires/user/${userId}`, {
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

  getAllQuestionnaires: async (): Promise<any[]> => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) throw new Error("Token not found"); // Handle missing token
    try {
      const response = await axiosInstance.get('/questionnaires', {
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
};

export default QuestionnaireService;
