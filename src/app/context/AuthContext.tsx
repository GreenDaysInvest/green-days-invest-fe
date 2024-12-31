"use client";
import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import AuthService from '../services/authServices';
import { AuthContextType, User } from '../types/Auth.type';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSessionUser = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("No token found, clearing user state");
                setUser(null);
                return null;
            }

            console.log("Fetching user profile...");
            const sessionUser = await AuthService.getUserFromSession();
            console.log("Fetched user profile:", sessionUser);

            if (!sessionUser) {
                console.log("No user profile found, clearing token");
                localStorage.removeItem('token');
                setUser(null);
                return null;
            }

            setUser(sessionUser);
            return sessionUser;
        } catch (error) {
            console.error("Error fetching session user:", error);
            setError("Failed to fetch user session");
            localStorage.removeItem('token');
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch on mount
    useEffect(() => {
        console.log("AuthProvider mounted, fetching user...");
        fetchSessionUser();
    }, []);

    const value = useMemo(() => ({
        user,
        loading,
        error,
        setUser,
        updateUser: fetchSessionUser
    }), [user, loading, error]);

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    return (
        <AuthContext.Provider value={value}>
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
