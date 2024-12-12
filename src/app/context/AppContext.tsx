// src/app/context/AppContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface AppContextType {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('questionaries');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  useEffect(() => {
    if (user !== undefined && isInitialLoad) {
      setActiveTab(user?.isAdmin ? 'questionariesList' : 'questionaries');
      setIsInitialLoad(false);
    }
  }, [user, isInitialLoad]);

  return (
    <AppContext.Provider value={{ 
      isLoginModalOpen, 
      setIsLoginModalOpen,
      isRegisterModalOpen, 
      setIsRegisterModalOpen,
      activeTab,
      setActiveTab
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
