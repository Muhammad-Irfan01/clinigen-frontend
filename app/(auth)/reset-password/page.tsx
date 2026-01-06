'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/ui/AuthForm';

export default function ResetPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update password in DB
    router.push('/login?reset=success');
  };

  return (
    <AuthForm 
      title="Set New Password"
      description="Your new password must be different from previously used passwords."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <div className="mt-1">
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
        >
          Update Password
        </motion.button>
      </form>
    </AuthForm>
  );
}