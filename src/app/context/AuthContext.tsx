"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AuthService from '../services/authServices';
import { AuthContextType, User } from '../types/Auth.type';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchSessionUser = async () => {
        try {
            const sessionUser = await AuthService.getUserFromSession();
            setUser(sessionUser || null);
            return sessionUser;
        } catch (error) {
            console.error("Error fetching session user:", error);
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessionUser();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            setUser,
            updateUser: fetchSessionUser // Expose the refresh function
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
