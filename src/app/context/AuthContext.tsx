"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../../../firebase';
import AuthService from '../services/authServices';
import { AuthContextType, User } from '../types/Auth.type';


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Handle Firebase user
                const firebaseUser: User = {
                    id: currentUser.uid,
                    uid: currentUser.uid,
                    email: currentUser.email || '',
                    name: currentUser.displayName || '',
                    surname: '', // Optionally retrieve surname if available
                };
                setUser(firebaseUser);
            } else {
                // If no Firebase user, check if user exists in your backend
                const sessionUser = await AuthService.getUserFromSession(); // Check if user data exists in local storage
                if (sessionUser) {
                    setUser(sessionUser);
                } else {
                    setUser(null); // No user found in backend
                }
            }
            setLoading(false);
        }, (error) => {
            console.error('Error in onAuthStateChanged:', error);
            setLoading(false); // Ensure loading is set to false on error
        });

        return () => unsubscribe();
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
