"use client";
import React, { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from '@/i18n/routing';
import { useApp } from '@/app/context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const { setIsLoginModalOpen } = useApp()
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
      setIsLoginModalOpen(true)
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen py-8 bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-secondary mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
