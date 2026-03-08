"use client";

import React from "react";
import { motion } from "framer-motion";

const JOURNEY_ITEMS = [
  {
    title: "Our Commitment Begins",
    description: "Halo Direct helps healthcare professionals access licensed, shortage, and specialty medicines through a reliable and simplified sourcing platform.",
    image: "https://images.unsplash.com/photo-1576091160550-217358c7e618?w=600&h=400&fit=crop",
    align: "left",
  },
  {
    title: "Building Global Supply Networks",
    description: "Halo Direct connects healthcare professionals with a trusted global network to source hard-to-find medicines quickly, safely, and efficiently.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
    align: "right",
  },
  {
    title: "Faster Access to Medicines",
    description: "When patients depend on treatment, speed matters. Halo Direct helps healthcare teams quickly find and request the medicines they need.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    align: "left",
  },
  {
    title: "Focused on Patient Safety",
    description: "Patient safety is our priority. Halo Direct works with trusted partners and strict quality standards to ensure medicines are sourced safely and reliably.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
    align: "right",
  },
];

export default function JourneySection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1D0E62] mb-4">
            Our Path to Better Medicine Access
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From building global supply networks to supporting healthcare professionals worldwide.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2 max-md:hidden"></div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-20">
            {JOURNEY_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`flex flex-col ${
                  item.align === "left" ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-12 items-center`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[280px] md:h-[320px] object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div className={`w-full md:w-1/2 ${
                  item.align === "left" ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                }`}>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#1D0E62] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
