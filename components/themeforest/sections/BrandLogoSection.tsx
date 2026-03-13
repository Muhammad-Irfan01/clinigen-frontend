"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandSection() {
  const brands = [
    {
      name: "Halo IV",
      src: "/images/halo-iv-logo.png",
      width: 140,
      height: 50,
    },
    {
      name: "Halo Health",
      src: "/images/halohealth-logo.png",
      width: 160,
      height: 50,
    },
    {
      name: "Halo Academy",
      src: "/images/haloacademy-logo.png",
      width: 180,
      height: 50,
    },
    {
      name: "Cura",
      src: "/images/curaai-logo.png",
      width: 120,
      height: 50,
    },
    {
      name: "Skin On You",
      src: "/images/skinonyoulogo-logo.png",
      width: 160,
      height: 50,
    },
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1D0E62]">
            Trusted by Healthcare Professionals and Partners Worldwide
          </h2>
        </motion.div>

        {/* Brand Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
