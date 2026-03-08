'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import useToast from '@/lib/useToast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import Header from '@/components/layout/Header';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

// Validation helper
const validatePassword = (password: string) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  return true;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword, resetEmail, setResetEmail } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordFormData>();

  const password = watch('password');

  // Get email from URL or store
  useEffect(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl && !resetEmail) {
      setResetEmail(emailFromUrl);
    }
  }, []);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);

    // Validate password strength
    const passwordValidation = validatePassword(data.password);
    if (passwordValidation !== true) {
      toast.error(passwordValidation);
      setIsLoading(false);
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Get the code from URL parameters
    const code = searchParams.get('code');

    if (!code) {
      toast.error('Reset code is required. Please request a new reset code.');
      setIsLoading(false);
      router.push('/forget-password');
      return;
    }

    try {
      await resetPassword(code, data.password);
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
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      {/* Navbar */}
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center p-4 font-sans">
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

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-lg bg-[#EBF1FA] border-transparent focus:bg-white focus:ring-2 focus:ring-[#7B3FE4] outline-none transition-all text-slate-700"
              registration={register("password", { 
                required: "Password is required",
                validate: (v) => validatePassword(v)
              })}
              error={errors.password}
            />
            {errors.password && (
              <div className="mt-2 text-xs text-slate-500 space-y-1">
                <ul className="list-disc list-inside space-y-0.5">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                </ul>
              </div>
            )}
          </div>

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
            className="w-full px-4 py-3 rounded-lg bg-[#EBF1FA] border-transparent focus:bg-white focus:ring-2 focus:ring-[#7B3FE4] outline-none transition-all text-slate-700"
            registration={register("confirmPassword", { 
              required: "Please confirm your password",
              validate: (v) => v === password ? true : "Passwords do not match"
            })}
            error={errors.confirmPassword}
          />

          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full py-3.5 rounded-full transition-all text-sm font-bold"
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </Button>
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
    </div>
  );
}