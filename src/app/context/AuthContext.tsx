"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AuthService from '../services/authServices';
import { AuthContextType, User } from '../types/Auth.type';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessionUser = async () => {
            try {
                // Check if user data exists in backend or local session
                const sessionUser = await AuthService.getUserFromSession();
                setUser(sessionUser || null);
            } catch (error) {
                console.error("Error fetching session user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSessionUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
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
