// src/app/context/AppContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <AppContext.Provider value={{ 
      isLoginModalOpen, 
      setIsLoginModalOpen,
      isRegisterModalOpen, 
      setIsRegisterModalOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
