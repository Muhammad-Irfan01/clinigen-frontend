"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BrandSection() {
  const brands = [
    {
      name: "Halo IV",
      svg: (
        <svg viewBox="0 0 120 40" className="h-8 md:h-10">
          <text x="5" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="500" fill="#1D0E62">halo</text>
          <ellipse cx="82" cy="12" rx="8" ry="4" fill="none" stroke="#1D0E62" strokeWidth="2"/>
          <text x="92" y="28" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="300" fill="#1D0E62">IV</text>
          <circle cx="108" cy="32" r="2" fill="#1D0E62"/>
        </svg>
      ),
    },
    {
      name: "Halo Health",
      svg: (
        <svg viewBox="0 0 140 40" className="h-8 md:h-10">
          <text x="5" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="500" fill="#1D0E62">halo</text>
          <ellipse cx="82" cy="12" rx="8" ry="4" fill="none" stroke="#1D0E62" strokeWidth="2"/>
          <text x="95" y="28" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="400" fill="#1D0E62">HEALTH</text>
          <text x="135" y="18" fontFamily="Arial, sans-serif" fontSize="10" fill="#1D0E62">®</text>
        </svg>
      ),
    },
    {
      name: "Halo Academy",
      svg: (
        <svg viewBox="0 0 160 40" className="h-8 md:h-10">
          <text x="5" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="500" fill="#1D0E62">halo</text>
          <ellipse cx="82" cy="12" rx="8" ry="4" fill="none" stroke="#1D0E62" strokeWidth="2"/>
          <path d="M 95 8 L 105 8 L 105 10 L 110 10 L 110 8 L 120 8 L 120 18 L 110 18 L 110 16 L 105 16 L 105 18 L 95 18 Z" fill="#1D0E62"/>
          <text x="125" y="28" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="400" fill="#1D0E62">ACADEMY</text>
        </svg>
      ),
    },
    {
      name: "Cura",
      svg: (
        <svg viewBox="0 0 100 40" className="h-8 md:h-10">
          <text x="5" y="28" fontFamily="Georgia, serif" fontSize="26" fontWeight="400" fill="#1D0E62">Cura</text>
          <circle cx="92" cy="12" r="6" fill="none" stroke="#1D0E62" strokeWidth="1.5"/>
          <circle cx="92" cy="12" r="3" fill="#1D0E62"/>
          <circle cx="92" cy="12" r="1" fill="white"/>
          <text x="5" y="36" fontFamily="Arial, sans-serif" fontSize="6" fill="#1D0E62">by halo group</text>
        </svg>
      ),
    },
    {
      name: "Skin On You",
      svg: (
        <svg viewBox="0 0 140 40" className="h-8 md:h-10">
          <text x="5" y="28" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="600" fill="#1D0E62">SKIN</text>
          <path d="M 52 18 Q 55 12 58 18 Q 61 24 58 28 Q 55 32 52 28" fill="#1D0E62"/>
          <text x="65" y="28" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="300" fill="#1D0E62">ON YOU</text>
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#1D0E62]">
            Trusted by Healthcare Professionals and Partners Worldwide
          </h2>
        </motion.div>

        {/* Brand Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              {brand.svg}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
