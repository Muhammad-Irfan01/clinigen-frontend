// 'use client';

// import React, { createContext, useContext, useEffect } from 'react';
// import { useAuthStore } from '@/lib/authStore';

// interface AuthContextType {
//   user: any;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   fetchProfile: () => Promise<void>;
//   changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
//   forgotPassword: (email: string) => Promise<void>;
//   resetPassword: (token: string, newPassword: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const {
//     user,
//     isAuthenticated,
//     isLoading,
//     login,
//     register,
//     logout,
//     fetchProfile,
//     changePassword,
//     forgotPassword,
//     resetPassword,
//   } = useAuthStore();

//   // Check if user is logged in on initial load
//   useEffect(() => {
//     const token = localStorage.getItem('accessToken');
//     if (token && !user) {
//       fetchProfile();
//     }
//   }, [fetchProfile, user]);

//   const contextValue = {
//     user,
//     isAuthenticated,
//     isLoading,
//     login,
//     register,
//     logout,
//     fetchProfile,
//     changePassword,
//     forgotPassword,
//     resetPassword,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  useEffect(() => {
    (async () => {
      try {
        // await fetchProfile();
      } catch (err) {
        console.log("Not logged in yet"); // ⚠ do NOT logout automatically
      }
    })();
  }, [fetchProfile]);

  return <>{children}</>;
}
