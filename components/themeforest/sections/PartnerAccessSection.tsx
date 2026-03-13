"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PartnerAccessSection() {
  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1D0E62]">
              Your Partner in Global Medicine Access
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:items-start sm:justify-center gap-4"
          >
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-lg">
              Halo Direct connects healthcare professionals with trusted global supply networks to access licensed, shortage, and specialty medicines.
            </p>
            <button
              onClick={() => window.location.href = ""}
              className="bg-[#d597fa] hover:bg-[#B595E8] text-white font-medium px-6 py-1 rounded-full transition-colors"
            >
              See How It Works
            </button>
          </motion.div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-linear-to-r from-[#A98DF2] to-[#C4A7F0] rounded-2xl px-6 py-5 md:px-8 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white text-center sm:text-left">
            Need Help Finding Hard-to-Source Medicines?
          </h3>
          <button
            onClick={() => window.location.href = "/contact"}
            className="bg-white hover:bg-gray-50 text-[#7A6FE4] font-semibold px-6 py-1.5 rounded-2xl transition-colors w-full sm:w-auto"
          >
            Request Access
          </button>
        </motion.div>
      </div>
    </section>
  );
}
