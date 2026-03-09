"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";
import useToast from "@/lib/useToast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import Header from "@/components/layout/Header";
import Image from "next/image";

interface VerifyEmailFormData {
  verificationCode: string;
}

export default function VerifyEmailPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<VerifyEmailFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const { verifyEmail, resendActivationCode, userEmail, setUserEmail } = useAuthStore();
  const toast = useToast();

  // Get email from URL query params if available
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl && !userEmail) {
      setUserEmail(emailFromUrl);
    }
  }, []);

  const onSubmit = async (data: VerifyEmailFormData) => {
    setIsLoading(true);

    try {
      await verifyEmail(data.verificationCode);
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

  const handleResendCode = async () => {
    if (!userEmail) {
      toast.error("Email not found. Please try signing up again.");
      return;
    }

    setIsResending(true);
    try {
      await resendActivationCode(userEmail);
      toast.success("Verification code resent successfully! Please check your email.");
    } catch (error: any) {
      toast.error(error.message || "Failed to resend verification code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
        >
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#F3F2FF] rounded-full flex items-center justify-center mb-4">
            <Image
              src="/images/Halo-Direct.png"
              alt="Halo Direct"
              width={64}
              height={64}
              className="object-contain p-2"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A3F] mb-2">Verify Your Email</h1>
          <p className="text-slate-500">
            We've sent a verification code to your email address. Please enter the code below.
          </p>
          {userEmail && (
            <p className="text-sm text-[#706FE4] mt-2 font-medium">
              Sent to: {userEmail}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Verification Code"
            type="text"
            placeholder="Enter 6-digit code"
            className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#706FE4]/20 focus:border-[#706FE4] text-center text-xl tracking-widest"
            registration={register("verificationCode", { required: "Verification code is required", minLength: { value: 6, message: "Code must be 6 digits" }, maxLength: { value: 6, message: "Code must be 6 digits" } })}
            error={errors.verificationCode}
          />
          <p className="text-xs text-slate-400 mt-2 text-center">
            Enter the 6-digit code sent to your email
          </p>

          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full bg-[#706FE4] text-white px-4 py-3 rounded-full font-bold"
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
              className="text-[#706FE4] font-semibold hover:underline disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend Code"}
            </Button>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Already verified?{" "}
            <Link href="/signin" className="text-[#706FE4] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
      </div>
    </div>
  );
}