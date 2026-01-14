'use client';

import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  fallbackRedirect?: string;
}

const ProtectedRoute = ({ 
  children, 
  fallbackRedirect = '/signin' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(fallbackRedirect);
    }
  }, [isAuthenticated, isLoading, router, fallbackRedirect]);

  // Show nothing while checking authentication status
  if (!isAuthenticated && isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;
  }

  // If authenticated, render the children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated and not loading, show nothing or redirect will happen
  return null;
};

export default ProtectedRoute;