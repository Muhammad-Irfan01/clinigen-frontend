"use client";

import React from "react";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: {errors}} = useForm<LoginFormInputs>();
  const { isLoading, login } = useAuthStore();
  const router = useRouter();


  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // console.log("Login Data:", data);
    try {
      await login(data.email, data.password);
      router.push('/')
    } catch (error) {

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

        {/* Left Side: Login Form */}
        <div className="flex-[1.2] p-8 md:p-12">
          <header className="text-center mb-8">
            <div className="flex justify-center mb-4">
              {/* Clinigen Direct Logo Placeholder */}
              <h2 className="text-2xl font-black italic tracking-tighter">
                <span className="text-[#6FCF97]">CLINIGEN</span>
                <span className="text-[#7B3FE4]">DIRECT</span>
              </h2>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Login to view Clinigen Direct<br />
              or Cliniport Managed Access Client Centre
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-sm mx-auto">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600 ml-1">Email</label>
              {/* Using your custom Input component */}
              <input
                {...register("email", { required: "Email is required" })}
                placeholder="info@haloishere.com"
                className="w-full px-4 py-3 rounded-lg bg-[#EBF1FA] border-transparent focus:bg-white focus:ring-2 focus:ring-[#7B3FE4] outline-none transition-all text-slate-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600 ml-1">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="password123"
                className="w-full px-4 py-3 rounded-lg bg-[#EBF1FA] border-transparent focus:bg-white focus:ring-2 focus:ring-[#7B3FE4] outline-none transition-all text-slate-700"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full font-bold py-3.5 rounded-full mt-4 transition-all
    ${isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#7B3FE4] hover:bg-[#6832ca] text-white shadow-lg shadow-indigo-100"}
  `}            >
              {isLoading ? "Logging in..." : "Login"}
            </motion.button>

            <div className="text-center mt-6">
              <Link href="/forget-password" className="text-[#4A90E2] hover:underline font-medium text-sm">
                Forgot your password?
              </Link>
            </div>
          </form>
        </div>

        {/* Right Side: Sign Up Promo */}
        <div className="flex-1 bg-[#F9F8F6] p-8 md:p-12 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">New here?</h2>
          <p className="text-slate-600 mb-8 font-medium">
            Get access to over <span className="font-bold">1220 medicines</span> on one platform
          </p>

          {/* Graphic Placeholder (matching the card in the image) */}
          <div className="relative bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-10 w-full max-w-60">
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 block mb-1">UNIPHIS</span>
              <span className="text-5xl font-black text-slate-800">40</span>
              <p className="text-[8px] text-slate-400 mt-2 leading-tight">
                Most frequent information<br />
                on products and medicine<br />
                request forms.
              </p>
            </div>
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#FF5E62] rounded-full flex items-center justify-center text-white shadow-md">
              💊
            </div>
            {/* Dotted path SVG would go here */}
          </div>

          <Link href="/signup" className="w-full max-w-40">
            <button className="w-full border-2 border-[#7B3FE4] text-[#7B3FE4] hover:bg-[#7B3FE4] hover:text-white font-bold py-2.5 rounded-full transition-all">
              Sign up
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}