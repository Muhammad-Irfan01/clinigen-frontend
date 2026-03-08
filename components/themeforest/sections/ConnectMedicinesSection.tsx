"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ConnectMedicinesSection() {
  const features = [
    "Access hard-to-find and shortage medicines",
    "Discover trusted therapeutic alternatives",
    "Connect with a global medicine supply network",
    "Request medicines through a secure digital platform",
    "Track availability and sourcing updates easily",
  ];

  const tickerItems = [
    "MEDICINE ACCESS",
    "QUALITY ASSURED PRODUCTS",
    "EXPERIENCE SEAMLESS HEALTHCARE SOLUTIONS",
    "REQUEST MEDICINES EASILY",
    "GLOBAL SUPPLY NETWORK",
  ];

  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#E8E6F5] rounded-3xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Side */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1D0E62] leading-tight mb-6">
                Connecting Healthcare Professionals to Critical Medicines
              </h2>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=400&fit=crop"
                  alt="Medicine shelves"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>

            {/* Right Side - White Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm"
            >
              <h3 className="text-3xl lg:text-4xl font-bold text-[#1D0E62] leading-tight mb-8">
                Access Critical Medicines Faster
              </h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-[#7A6FE4] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="mt-8"
              >
                <a
                  href="/about"
                  className="inline-block bg-[#C4A7F0] hover:bg-[#B595E8] text-white font-medium px-6 py-3 rounded-full transition-colors"
                >
                  Explore Halo Direct
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Ticker Banner */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-[#7A6FE4] py-4 overflow-hidden"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-white text-sm font-semibold mx-6">{item}</span>
                <span className="text-white/60 mx-6">◆</span>
              </React.Fragment>
            ))}
          </div>
        </motion.div> */}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
