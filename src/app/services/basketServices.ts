import axiosInstance from "./api";
import { Flower, Basket } from "@/app/types/Flower.type";

const BasketService = {
  fetchBasket: async (userId: string): Promise<Basket[]> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");
    try {
      const response = await axiosInstance.get(`/basket/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch basket:", error);
      throw error;
    }
  },

  addItemToBasket: async (userId: string, item: Flower): Promise<Basket[]> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");
    try {
      const response = await axiosInstance.post(`/basket/${userId}`, item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to add item to basket:", error);
      throw error;
    }
  },

  removeItemFromBasket: async (userId: string, itemId: string): Promise<Basket[]> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");
    try {
      const response = await axiosInstance.delete(`/basket/${userId}/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to remove item from basket:", error);
      throw error;
    }
  },

  updateItemQuantity: async (userId: string, itemId: string, quantity: number): Promise<Basket[]> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");
    try {
      const response = await axiosInstance.patch(`/basket/${userId}/update`, { itemId, quantity }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update item quantity:", error);
      throw error;
    }
  },
};

export default BasketService;