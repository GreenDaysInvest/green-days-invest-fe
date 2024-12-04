"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { BasketContextType } from "../types/Basket.type";
import { Basket, Flower } from "../types/Flower.type";
import { useAuth } from "@/app/context/AuthContext";
import { useTranslations } from "next-intl";
import { showErrorToast, showInfoToast } from "../utils/toast";
import BasketService from "../services/basketServices";

const BasketContext = createContext<BasketContextType | null>(null);

export const BasketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const pricePerService = '20.02';
  const [basket, setBasket] = useState<Basket[]>([]);
  const t = useTranslations("Dashboard");
  const { user } = useAuth();

  useEffect(() => {
    const initializeBasket = async () => {
      if (!user || !user.id) return;

      try {
        const basketData = await BasketService.fetchBasket(user.id);
        setBasket(basketData);
      } catch (error: any) {
        if (error?.response?.data?.message) {
          showErrorToast(error.response.data.message);
        } else {
          showErrorToast(error.message || "An unexpected error occurred.");
        }
        console.error("Failed to fetch basket:", error);
      }
    };

    initializeBasket();
  }, [user]);

  const addToBasket = async (item: Flower) => {
    if (!user || !user.id) {
      console.error("User not logged in");
      return;
    }

    try {
        const updatedBasket = await BasketService.addItemToBasket(user.id, item);
        setBasket(updatedBasket);
        showInfoToast(t("addedToBasket")); // Show success message
      } catch (error: any) {
        console.error("Failed to add item to basket:", error);
        showErrorToast(error?.response?.data?.message || error.message); // Show error message
      }
  };

  const removeFromBasket = async (itemId: string) => {
    if (!user || !user.id) {
      console.error("User not logged in");
      return;
    }

    try {
      const updatedBasket = await BasketService.removeItemFromBasket(user.id, itemId);
      setBasket(updatedBasket);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        showErrorToast(error.response.data.message);
      } else {
        showErrorToast(error.message || "An unexpected error occurred.");
      }
      console.error("Failed to remove item from basket:", error);
    }
  };

  const updateItemQuantity = async (itemId: string, quantity: number) => {
    if (!user || !user.id) {
      console.error("User not logged in");
      return;
    }
  
    try {
      const updatedBasket = await BasketService.updateItemQuantity(user.id, itemId, quantity);
      setBasket(updatedBasket);
      const message = quantity > 0 ? t("quantityIncreased") : t("quantityDecreased");
      showInfoToast(message);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        showErrorToast(error.response.data.message);
      } else {
        showErrorToast(error.message || "An unexpected error occurred.");
      }
      console.error("Failed to update item quantity:", error);
    }
  };

  const clearBasket = async () => {
    if (!user || !user.id) {
      console.error("User not logged in");
      return;
    }
  
    try {
      await BasketService.clearBasket(user.id);
      setBasket([]);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        showErrorToast(error.response.data.message);
      } else {
        showErrorToast(error.message || "An unexpected error occurred.");
      }
      console.error("Failed to clear basket:", error);
    }
  };

  return (
    <BasketContext.Provider value={{ pricePerService, basket, setBasket, addToBasket, removeFromBasket, updateItemQuantity, clearBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = (): BasketContextType => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
