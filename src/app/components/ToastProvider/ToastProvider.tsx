// components/ToastProvider.tsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProviderProps {
    children: React.ReactNode; 
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    return (
        <>
            {children} 
            <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar 
                closeOnClick 
                pauseOnHover 
                draggable 
                pauseOnFocusLoss 
            />
        </>
    );
};

export default ToastProvider;
