"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Heart, Users, Award, TrendingUp } from 'lucide-react';
import JourneySection from '@/components/JourneySection';
import HealthcareAccessSection from '@/components/themeforest/sections/HealthcareAccessSection';
import PartnerAccessSection from '@/components/themeforest/sections/PartnerAccessSection';

const VALUES = [
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    title: "Patient Focus",
    description: "Every decision we make starts with the patient in need. Their health and wellbeing drive our mission."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: "Quality & Safety",
    description: "We maintain the highest standards of quality and safety in every medicine we supply."
  },
  {
    icon: <Globe className="w-8 h-8 text-white" />,
    title: "Global Reach",
    description: "Operating in over 100 countries, we ensure medicines reach patients wherever they are."
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: "Partnership",
    description: "We work collaboratively with healthcare professionals, regulators, and manufacturers."
  }
];

const STATS = [
  { value: "1,200+", label: "Employees Worldwide" },
  { value: "14", label: "Country Offices" },
  { value: "100+", label: "Countries Served" },
  { value: "24/7", label: "Patient Support" }
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-[#2d1a47] font-sans">
      {/* Hero Section */}
      <section className="bg-[#E8E6F5] py-16 px-6">
        <div className="max-w-6xl mx-auto pb-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-2xl lg:text-5xl font-bold text-[#1D0E62] mb-4">
              About Us
            </h1>
            <p className="text-[#939290] font-semibold text-sm md:text:lg max-w-3xl mx-auto">
              Discover our mission to help healthcare professionals access critical medicines quickly.
            </p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm"
          >
            <div className="grid lg:grid-cols-2">
              {/* Left Content */}
              <div className="p-8 lg:p-16 flex flex-col justify-center">
                <span className="inline-block bg-[#E8E4F5] text-[#7A6FE4] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 w-fit">
                  ABOUT HALO DIRECT
                </span>
                <h2 className="text-2xl lg:text-5xl font-bold text-[#1D0E62] leading-tight mb-6">
                  Ensuring Patients Get the Medicines They Need
                </h2>
                <p className="text-[#939290] text-sm leading-relaxed max-w-md font-semibold">
                  Halo Direct helps healthcare professionals quickly find and request licensed, shortage, and specialty medicines through a secure digital platform and trusted global supply network.
                </p>
              </div>
              {/* Right Image */}
              <div className="relative min-h-100 lg:min-h-full lg:h-full">
                <img
                  src="/images/home.jpeg"
                  alt="Healthcare professional in pharmacy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <HealthcareAccessSection />
      <JourneySection />
      <PartnerAccessSection />
    </div>
  );
}

function Pill({ className, size }: { className?: string; size?: number }) {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}
