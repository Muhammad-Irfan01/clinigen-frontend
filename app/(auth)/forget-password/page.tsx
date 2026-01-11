"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import useToast from "@/lib/useToast";

export default function RecoverPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { forgotPassword } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await forgotPassword(data.email);
      toast.success("Password reset link sent to your email");
      // Redirect to sign in after successful request
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-4 font-sans">

      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row overflow-hidden"
      >

        {/* Left Side: Recovery Form */}
        <div className="flex-[1.2] p-8 md:p-12">
          <header className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <h2 className="text-2xl font-black italic tracking-tighter">
                <span className="text-[#6FCF97]">CLINIGEN</span>
                <span className="text-[#7B3FE4]">DIRECT</span>
              </h2>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Recover password</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Enter the email associated with your account.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-sm mx-auto">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600 ml-1">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                placeholder="info@haloishere.com"
                className="w-full px-4 py-3 rounded-lg bg-[#EBF1FA] border-transparent focus:bg-white focus:ring-2 focus:ring-[#7B3FE4] outline-none transition-all text-slate-700"
              />
              {errors.email && <span className="text-xs text-red-500 ml-1">{errors.email.message as string}</span>}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full font-bold py-3.5 rounded-full shadow-lg shadow-indigo-100 transition-all text-sm
                ${isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#7B3FE4] hover:bg-[#6832ca] text-white"}`}
            >
              {isLoading ? "Sending..." : "Email me a recovery link"}
            </motion.button>

            <div className="text-center mt-6">
              <Link href="/signin" className="w-full inline-block border-2 border-[#7B3FE4] text-[#7B3FE4] hover:bg-[#F3F2FF] font-bold py-2.5 rounded-full transition-all text-sm">
                Back to login
              </Link>
            </div>
          </form>
        </div>

        {/* Right Side: Promo Branding */}
        <div className="flex-1 bg-[#F9F8F6] p-8 md:p-12 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">New here?</h2>
          <p className="text-slate-600 mb-8 font-medium">
            Get access to over <span className="font-bold text-slate-900">1220 medicines</span> on one platform
          </p>

          {/* Pharmacist Illustration Placeholder */}
          <div className="relative mb-10">
            <div className="bg-[#BCE6EB] rounded-[40px] w-48 h-48 relative overflow-hidden">
               {/* Pharmacist Image Placeholder */}
               <div className="absolute bottom-0 w-full h-4/5 bg-slate-300 rounded-t-lg mx-auto flex items-end justify-center">
                  <span className="text-4xl">👩‍🔬</span>
               </div>
               <div className="absolute top-4 left-4 w-8 h-8 bg-[#7B3FE4] rounded-lg flex items-center justify-center text-white">
                  ⚡
               </div>
            </div>
            {/* Pill graphic overlay */}
            <div className="absolute top-1/2 -right-4 w-10 h-10 bg-[#FF5E62] rounded-full flex items-center justify-center text-white shadow-md border-4 border-white">
               💊
            </div>
            {/* Dotted path */}
            <svg className="absolute -bottom-4 -left-4 w-20 h-20 text-[#1A1A3F]/20" viewBox="0 0 100 100">
              <path d="M10 90 Q 50 10 90 90" fill="transparent" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>

          <Link href="/signup" className="w-full max-w-50">
            <button className="w-full border-2 border-[#7B3FE4] text-[#7B3FE4] hover:bg-[#7B3FE4] hover:text-white font-bold py-2.5 rounded-full transition-all text-sm">
              Sign up
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Footer Links */}
      <footer className="mt-8 text-center text-xs text-slate-500 max-w-lg leading-relaxed">
        By continuing to use Clinigen Direct, you accept our{" "}
        <Link href="#" className="text-[#4A90E2] hover:underline">Terms of Use</Link>,{" "}
        <Link href="#" className="text-[#4A90E2] hover:underline">Terms of Sale</Link> and our{" "}
        <Link href="#" className="text-[#4A90E2] hover:underline">Privacy Policy</Link>.
      </footer>
    </div>
  );
}