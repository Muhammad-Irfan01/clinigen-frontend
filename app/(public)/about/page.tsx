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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#1D0E62] mb-4">
              About Us
            </h1>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
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
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <span className="inline-block bg-[#E8E4F5] text-[#7A6FE4] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 w-fit">
                  ABOUT HALO DIRECT
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1D0E62] leading-tight mb-6">
                  Ensuring Patients Get the Medicines They Need
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                  Halo Direct helps healthcare professionals quickly find and request licensed, shortage, and specialty medicines through a secure digital platform and trusted global supply network.
                </p>
              </div>
              {/* Right Image */}
              <div className="relative min-h-[400px] lg:min-h-full lg:h-full">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
                  alt="Healthcare professional in pharmacy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <HealthcareAccessSection />

      {/* Mission Section */}
      {/* <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-[#270072]">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We exist to make sure a healthcare professional with a patient in need, anywhere in the world,
                can always get the right medicine for their individual patient – quickly, easily and safely,
                whether licensed or unlicensed.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                To support this mission, we employ over 1,200 people and have offices in 14 locations around
                the world. Our dedicated team works tirelessly to bridge the gap between patients and the
                medicines they need.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#F7F4F1] rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {STATS.map((stat, idx) => (
                  <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-[#706FE4] mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Values Section */}
      {/* <section className="py-20 px-6 bg-[#F7F4F1]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#270072] mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#706FE4] rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#270072] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* What We Do Section */}
      {/* <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#270072] mb-4">What We Do</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connecting patients with specialty medicines through innovative solutions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#706FE4] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#706FE4] rounded-lg flex items-center justify-center mb-6">
                <Pill className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#270072] mb-4">Specialty Medicines</h3>
              <p className="text-gray-600 mb-4">
                We supply unlicensed and shortage medicines to healthcare professionals, ensuring patients
                get the treatment they need when standard options aren't available.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#706FE4] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#706FE4] rounded-lg flex items-center justify-center mb-6">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#270072] mb-4">Managed Access Programs</h3>
              <p className="text-gray-600 mb-4">
                We manage early access programs that provide patients with promising investigational
                medicines before they're approved in their country.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#706FE4] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#706FE4] rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#270072] mb-4">Commercialization</h3>
              <p className="text-gray-600 mb-4">
                We help pharmaceutical companies bring their products to new markets, handling regulatory,
                distribution, and commercial challenges.
              </p>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Journey Section */}
      <JourneySection />

      <PartnerAccessSection />

      {/* Global Presence Section */}
      {/* <section className="py-20 px-6 bg-[#270072] text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Global Presence</h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              With offices across multiple continents, we're never far from the patients we serve
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { region: "Europe", countries: "UK, France, Germany, Benelux, Eastern Europe" },
              { region: "Americas", countries: "USA, Canada, Latin America" },
              { region: "Asia Pacific", countries: "Australia, New Zealand, Japan, Singapore" },
              { region: "Middle East", countries: "UAE, Saudi Arabia, Israel" },
              { region: "Africa", countries: "South Africa, Nigeria, Kenya" },
              { region: "Nordics", countries: "Sweden, Norway, Denmark, Finland" }
            ].map((area, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-2">{area.region}</h3>
                <p className="text-purple-200">{area.countries}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-[#270072] mb-6"
          >
            Want to Learn More?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            Discover how Clinigen can help you provide better care for your patients
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a
              href="/contact"
              className="inline-block bg-[#706FE4] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#5a5bd4] transition-all duration-300"
            >
              Contact Us Today
            </a>
          </motion.div>
        </div>
      </section> */}
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
