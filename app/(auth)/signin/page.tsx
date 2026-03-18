"use client";

import React from "react";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import useToast from "@/lib/useToast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Header from "@/components/layout/Header";

type LoginFormInputs = {
  email: string;
  password: string;
};

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return true;
};

export default function SignInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { isLoading, login } = useAuthStore();
  const router = useRouter();
  const { error: showError } = useToast();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await login(data.email, data.password);
      router.push('/');
    } catch (error: any) {
      showError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F9] flex flex-col">

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl bg-white rounded-3xl shadow-sm flex flex-col lg:flex-row"
        >
          {/* Left Side - Login Form */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/images/Halo-Direct.png"
                alt="Halo Direct"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1D0E62] mb-3">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                Log in to access your Halo Direct dashboard and<br />
                manage medicine requests through our secure platform.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-sm mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="info@haloishere.com"
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#E8EEF8] border-0 focus:ring-2 focus:ring-[#706FE4] outline-none transition-all text-gray-700 placeholder-gray-400"
                  registration={register("email", {
                    required: "Email is required",
                    validate: (v) => validateEmail(v)
                  })}
                  error={errors.email}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="password123"
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#E8EEF8] border-0 focus:ring-2 focus:ring-[#706FE4] outline-none transition-all text-gray-700 placeholder-gray-400"
                  registration={register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  error={errors.password}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
                className="w-full font-medium py-3.5 rounded-full bg-[#706FE4] hover:bg-[#5a5bd4] text-white transition-all mt-4"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center mt-6">
                <Link href="/forget-password" className="text-[#4A90E2] hover:underline font-medium text-sm">
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>

          {/* Right Side - Sign Up Promo */}
          <div className="lg:w-1/2 bg-[#FAFAF8] p-8 lg:p-12 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-[#1D0E62] mb-3">
              New here?
            </h2>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
              Get access to over <span className="font-bold">1220 medicines</span> on one platform
            </p>

            {/* Image */}
            <div className="w-full max-w-sm mb-8">
              <Image
                src="/images/shortage.jpg"
                alt="Pharmacy warehouse"
                width={400}
                height={250}
                className="w-full h-[200px] object-cover rounded-2xl shadow-sm"
              />
            </div>

            <Link href="/signup">
              <button className="bg-[#C4A7F0] hover:bg-[#B595E8] text-white font-medium px-10 py-3 rounded-full transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
