import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { cookie } from '@/lib/cookies';

/**
 * Hook to check if user is authenticated
 * Returns authentication status and loading state
 * Uses Zustand auth store with cookie fallback for persistence
 */
export const useAuth = () => {
  const { isAuthenticated: storeAuth, user } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check authentication: first from store, then from cookie as fallback
    const checkAuth = () => {
      // If store says authenticated, trust it
      if (storeAuth) {
        setIsAuthenticated(true);
        console.log('[useAuth] User authenticated from store');
      } else {
        // Otherwise, check cookie directly (in case of page refresh)
        const token = cookie.get('accessToken');
        const hasToken = !!token;
        console.log('[useAuth] Token from cookie:', hasToken ? 'Present' : 'Missing');
        setIsAuthenticated(hasToken);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [storeAuth]);

  return { isAuthenticated, isLoading, user };
};
