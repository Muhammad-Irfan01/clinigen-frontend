"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Repeat, FileCheck, Zap } from "lucide-react";

export default function AboutHeroSection() {
  const stats = [
    { value: "20", label: "Years experiences" },
    { value: "1.8K", label: "Healthcare professionals" },
    { value: "460", label: "Medicines sourced globally" },
    { value: "15", label: "Countries supplied" },
  ];

  const features = [
    {
      icon: Globe,
      title: "Global Medicine Access",
      description: "Secure access to unlicensed, specialty, and hard-to-find medicines worldwide.",
    },
    {
      icon: Repeat,
      title: "Reliable Alternatives",
      description: "Find trusted therapeutic alternatives for medicines experiencing shortages.",
    },
    {
      icon: FileCheck,
      title: "Regulatory Confidence",
      description: "Processes designed to support compliant and medicine sourcing.",
    },
    {
      icon: Zap,
      title: "Faster Procurement",
      description: "Streamlined digital requests help reduce delays in accessing critical treatments.",
    },
  ];

  return (
    <section className="w-full p-4 lg:p-40">
      <div className="max-w-6xl mx-auto">
        {/* Purple Gradient Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-linear-to-r from-[#7A6FE4] to-[#D48AF2] p-2 md:p-10 text-white"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                ABOUT HALO DIRECT
              </span>
              <h2 className="text-2xl md:text-5xl font-bold leading-tight">
                Simplifying Access
                <br />
                to Critical Medicines
              </h2>
            </div>
            <div className="flex-1 lg:pt-2">
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                Halo Direct helps healthcare professionals securely source unlicensed,
                shortage, and specialty medicines through a streamlined digital platform.
              </p>
              <a
                href="/about"
                className="inline-flex items-center text-white text-sm font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                Explore the platform
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mt-10 pt-10 border-t border-white/20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="border-l border-white/30 pl-4 first:border-l-0 first:pl-0"
              >
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className="text-white/80 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-4 gap-8 mt-16 py-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="group"
            >
              <div className="w-12 h-12 bg-[#F7F4F1] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#7A6FE4] transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-[#1D0E62] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-[#1D0E62] mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
