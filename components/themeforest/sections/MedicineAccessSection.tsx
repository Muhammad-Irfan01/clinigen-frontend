"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MedicineAccessSection() {
  const features = [
    {
      label: "Medicine Search",
      title: "Find Hard-To-Source Medicines",
      description: "Quickly locate shortage medicines, unlicensed treatments, and trusted alternatives through Halo Direct's intelligent medicine search platform.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    },
    {
      label: "Global Supply",
      title: "Access Medicines Worldwide",
      description: "Halo Direct connects healthcare professionals with a reliable global supply network to help overcome medicine shortages.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    },
    {
      label: "Pharmacy Support",
      title: "Streamlined Medicine Requests",
      description: "Submit requests, review product details, and track orders easily through our secure digital platform built for healthcare providers.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section className="w-full bg-[#FAF9FB] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#E8E4F5] text-[#7A6FE4] text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              MEDICINE ACCESS
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1D0E62] leading-tight">
              Smarter Way
              <br />
              To Access Medicines
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:pt-4"
          >
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Halo Direct enables healthcare professionals to quickly find and
              request shortage, specialty, and unlicensed medicines through
              a secure digital platform.
            </p>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl mb-5">
                <div className="aspect-[3/2] bg-gray-200 relative overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="inline-block bg-[#E8E4F5] text-[#7A6FE4] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {feature.label}
              </span>
              <h3 className="text-xl font-bold text-[#1D0E62] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
