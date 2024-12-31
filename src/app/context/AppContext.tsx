// src/app/context/AppContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
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

  const { user, loading } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('questionaries');
  
  useEffect(() => {
    if (!loading) {
      console.log("Auth state updated:", { user, loading });
      const newTab = user?.isAdmin ? 'questionariesList' : 'questionaries';
      console.log("Setting active tab to:", newTab);
      setActiveTab(newTab);
    }
  }, [user, loading]);

  const contextValue = useMemo(() => ({
    isLoginModalOpen,
    setIsLoginModalOpen,
    isRegisterModalOpen,
    setIsRegisterModalOpen,
    activeTab,
    setActiveTab
  }), [isLoginModalOpen, isRegisterModalOpen, activeTab]);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AppContext.Provider value={contextValue}>
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
