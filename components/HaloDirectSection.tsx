'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HaloDirectSection() {
  return (
    <section className="bg-[#E8EAF8] py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl overflow-hidden shadow-sm"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Content */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              <span className="inline-block bg-[#E8EAF8] text-[#7A6FE4] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 w-fit">
                ABOUT HALO DIRECT
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D0E62] mb-5 leading-tight">
                Ensuring Patients Get the Medicines They Need
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md">
                Halo Direct helps healthcare professionals quickly find and request
                licensed, shortage, and specialty medicines through a secure
                digital platform and trusted global supply network.
              </p>
            </div>

            {/* Right Side - Image */}
            <div className="relative h-64 sm:h-80 lg:h-auto min-h-75 lg:min-h-full">
              <img
                src="/images/home.jpeg"
                alt="Doctor using mobile phone - Halo Direct"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
