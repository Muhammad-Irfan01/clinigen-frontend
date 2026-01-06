// 'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AuthFormProps {
  title: string;
  description: string;
  children: React.ReactNode;
  isLogin?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 10, delay: 0.2 }
  },
};

export const AuthForm: React.FC<AuthFormProps> = ({ 
  title, 
  description, 
  children,
  isLogin = true, 
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-8 border border-gray-100"
      >
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-800">{title}</h1>
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </header>
        
        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <img src="/google.svg" alt="Google" className="h-5 w-5 mr-2" />
            Google
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Form Content (passed as children) */}
        {children}
      </motion.div>
    </div>
  );
};
