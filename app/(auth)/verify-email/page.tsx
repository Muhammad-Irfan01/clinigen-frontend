"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";
import useToast from "@/lib/useToast";

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { verifyEmail } = useAuthStore();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await verifyEmail(verificationCode);
      toast.success("Email verified successfully!");
      // After verification, redirect to sign in page
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || "Failed to verify email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
      >
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#F3F2FF] rounded-full flex items-center justify-center mb-4">
            <span className="text-[#7B3FE4] text-2xl">✉️</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A3F] mb-2">Verify Your Email</h1>
          <p className="text-slate-500">
            We've sent a verification code to your email address. Please enter the code below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#7B3FE4]/20 focus:border-[#7B3FE4] text-center text-xl tracking-widest"
              maxLength={6}
              required
            />
            <p className="text-xs text-slate-400 mt-2 text-center">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#7B3FE4] text-white px-4 py-3 rounded-full font-bold ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Didn't receive the code?{" "}
            <button 
              className="text-[#7B3FE4] font-semibold hover:underline"
              onClick={() => {
                // Resend verification code logic would go here
                toast.info("Resend verification functionality would go here");
              }}
            >
              Resend Code
            </button>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Already verified?{" "}
            <Link href="/signin" className="text-[#7B3FE4] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}