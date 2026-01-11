'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import useToast from '@/lib/useToast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Get the code from URL parameters
    const code = searchParams.get('code') || '';

    if (!code) {
      toast.error('Reset code is required');
      setIsLoading(false);
      return;
    }

    try {
      await resetPassword(code, password);
      toast.success('Password reset successful. You can now login with your new password.');

      // Redirect to sign in after successful reset
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <h2 className="text-2xl font-black italic tracking-tighter">
              <span className="text-[#6FCF97]">CLINIGEN</span>
              <span className="text-[#7B3FE4]">DIRECT</span>
            </h2>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Set New Password</h1>
          <p className="text-slate-500 text-sm">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-600 ml-1">
              New Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-[#EBF1FA] border-transparent focus:bg-white focus:ring-2 focus:ring-[#7B3FE4] outline-none transition-all text-slate-700"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-semibold text-slate-600 ml-1">
              Confirm New Password
            </label>
            <div className="mt-1">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-[#EBF1FA] border-transparent focus:bg-white focus:ring-2 focus:ring-[#7B3FE4] outline-none transition-all text-slate-700"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className={`w-full py-3.5 rounded-full transition-all text-sm font-bold
              ${isLoading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#7B3FE4] hover:bg-[#6832ca] text-white"}`}
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Remember your password?{' '}
            <a href="/signin" className="text-[#7B3FE4] font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}