"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileCheck, Headset, Globe, Calendar } from "lucide-react";

export default function HealthcareAccessSection() {
  const features = [
    {
      icon: FileCheck,
      title: "Deep Experience",
      description: "Trusted by healthcare professionals worldwide to help source licensed, specialty, and hard-to-find medicines quickly and reliably.",
    },
    {
      icon: Headset,
      title: "Expert Assistance",
      description: "Access support from experienced teams with expertise in medicine sourcing, regulatory processes, and global supply networks.",
    },
    {
      icon: Globe,
      title: "Proven Supply Network",
      description: "With extensive experience sourcing medicines globally, we know how to deliver the right treatments efficiently and safely.",
    },
    {
      icon: Calendar,
      title: "Always Available",
      description: "Our dedicated support team is available to assist healthcare professionals whenever they need help accessing critical medicines.",
    },
  ];

  return (
    <section className="w-full bg-[#F5F6F9] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-[40px] font-bold text-[#1D0E62]"
          >
            Healthcare Medicine Access
          </motion.h2>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            href="/support"
            className="bg-[#d597fa] hover:bg-[#B595E8] text-white font-medium px-6 py-1 rounded-full transition-colors inline-block w-fit"
          >
            See How It Works
          </motion.a>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <feature.icon size={36} className=" text-[#7A6FE4]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1D0E62] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 font-semibold text-md leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
