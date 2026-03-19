"use client";

import React from "react";
import { motion } from "framer-motion";

const JOURNEY_ITEMS = [
  {
    title: "Our Commitment Begins",
    description: "Halo Direct helps healthcare professionals access licensed, shortage, and specialty medicines through a reliable and simplified sourcing platform.",
    image: "/images/journey1.png",
    align: "left",
  },
  {
    title: "Building Global Supply Networks",
    description: "Halo Direct connects healthcare professionals with a trusted global network to source hard-to-find medicines quickly, safely, and efficiently.",
    image: "/images/Untitled.png",
    align: "right",
  },
  {
    title: "Faster Access to Medicines",
    description: "When patients depend on treatment, speed matters. Halo Direct helps healthcare teams quickly find and request the medicines they need.",
    image: "/images/smarter1.jpg",
    align: "left",
  },
  {
    title: "Focused on Patient Safety",
    description: "Patient safety is our priority. Halo Direct works with trusted partners and strict quality standards to ensure medicines are sourced safely and reliably.",
    image: "/images/journey4.png",
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
          <h2 className="text-3xl lg:text-[40px] font-bold text-[#1D0E62] mb-4">
            Our Path to Better Medicine Access
          </h2>
          <p className="text-lg text-[#939290] font-semibold max-w-3xl mx-auto">
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
                <div className={`w-full md:w-1/2 ${
                  item.align === "left" ? "md:text-right md:pr-8" : "md:text-left md:pl-8 "
                }`}>
                  <h3 className="text-xl lg:text-[28px] font-bold text-[#1D0E62] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-semibold text-sm">
                    {item.description}
                  </p>
                </div>

                <div className="w-full md:w-1/2">
                  <div className={`overflow-hidden rounded-2xl ${item.align === "left" && "flex md:justify-end"}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full md:w-4/5 rounded-2xl h-65 md:h-65 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
