"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowRight, Check } from "lucide-react";
import { caseStudyData, type CaseStudyItem } from "@/data/homeData";

interface CaseStudySectionProps {
  classname?: string;
}

export default function CaseStudySection({ classname }: CaseStudySectionProps) {
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
    <section className={`case-studies-block ${classname}`}>
      <div className="max-w-7xl mx-auto px-2 md:px-6">
        {/* <div className="flex items-center justify-between w-full max-lg:flex-wrap gap-y-2">
          <div className="max-lg:w-full">
            <div className="tag text-sm font-bold text-[#706FE4] bg-[#F7F4F1] px-4 py-2 rounded-full inline-block">
              Why we do
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#1D0E62] mt-3">
              Case studies
            </h3>
          </div>
          <div className="xl:w-5/12 lg:w-1/2 w-full">
            <span className="text-gray-600">
              Case studies that showcase our approach, process, and results for specific clients.
            </span>
          </div>
        </div> */}
         <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#E8E6F5] rounded-3xl p-4 lg:py-10 lg:px-10"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Side */}
            <div className="flex flex-col items-center">
              <h2 className="text-3xl lg:text-3xl font-bold text-[#1D0E62] leading-tight mb-6">
                Connecting Healthcare <br/> Professionals to Critical Medicines
              </h2>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=400&fit=crop"
                  alt="Medicine shelves"
                  className="lg:w-125 h-100 rounded-r-2xl object-cover"
                />
              </div>
            </div>

            {/* Right Side - White Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-4 lg:p-8 shadow-sm"
            >
              <h3 className="text-2xl lg:text-5xl font-bold text-[#1D0E62] leading-tight mb-8">
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
                    <Check size={34} className=" text-[#7A6FE4] shrink-0" />
                    <span className="text-gray-700 text-md leading-relaxed">
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
                  className="inline-block bg-[#d597fa] hover:bg-[#B595E8] text-white font-medium px-6 py-1.5 rounded-full transition-colors"
                >
                  Explore Halo Direct
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        <div className="md:mt-10 mt-6 overflow-hidden">
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="h-full relative style-border style-section"
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
          >
          </Swiper>
        </div>
      </div>
    </section>
  );
}
