"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import useToast from "@/lib/useToast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import Header from "@/components/layout/Header";

interface VerifyResetFormData {
  verificationCode: string;
}

export default function VerifyEmailForResetPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<VerifyResetFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const { verifyResetEmail, resetEmail, setResetEmail, forgotPassword } = useAuthStore();
  const toast = useToast();

  // Get email from URL query params if available
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl && !resetEmail) {
      setResetEmail(emailFromUrl);
    }
  }, []);

  const onSubmit = async (data: VerifyResetFormData) => {
    if (!resetEmail) {
      toast.error("Email not found. Please request a new reset code.");
      return;
    }

    setIsLoading(true);

    try {
      await verifyResetEmail(resetEmail, data.verificationCode);
      toast.success("Email verified successfully!");
      // Redirect to reset password page with email and code
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(resetEmail)}&code=${encodeURIComponent(data.verificationCode)}`);
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || "Failed to verify email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!resetEmail) {
      toast.error("Email not found. Please try again.");
      return;
    }

    setIsResending(true);
    try {
      await forgotPassword(resetEmail);
      toast.success("Reset code resent successfully! Please check your email.");
    } catch (error: any) {
      toast.error(error.message || "Failed to resend reset code");
    } finally {
      setIsResending(false);
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
          <div className="mx-auto w-16 h-16 bg-[#F3F2FF] rounded-full flex items-center justify-center mb-4">
            <span className="text-[#7B3FE4] text-2xl">✉️</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Verify Your Email</h1>
          <p className="text-slate-500 text-sm">
            We've sent a verification code to your email address. Please enter the code below.
          </p>
          {resetEmail && (
            <p className="text-sm text-[#7B3FE4] mt-2 font-medium">
              Sent to: {resetEmail}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Verification Code"
            type="text"
            placeholder="Enter 6-digit code"
            className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#7B3FE4]/20 focus:border-[#7B3FE4] text-center text-xl tracking-widest"
            registration={register("verificationCode", { 
              required: "Verification code is required", 
              minLength: { value: 6, message: "Code must be 6 digits" }, 
              maxLength: { value: 6, message: "Code must be 6 digits" } 
            })}
            error={errors.verificationCode}
          />
          <p className="text-xs text-slate-400 mt-2 text-center">
            Enter the 6-digit code sent to your email
          </p>

          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full font-bold py-3.5 rounded-full shadow-lg shadow-indigo-100 transition-all text-sm"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Didn't receive the code?{" "}
            <Button
              varient="secondary"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-[#7B3FE4] font-semibold hover:underline disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend Code"}
            </Button>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Remember your password?{" "}
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
