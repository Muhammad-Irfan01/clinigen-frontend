"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="slider-block lg:py-15 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex max-xl:flex-col-reverse gap-8">
          <div className="xl:w-1/3 w-full xl:pr-3.75">
            <div className="text">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1D0E62] leading-tight">
                Healthcare solutions for small to mid-sized medical facilities
              </h2>
              <div className="text-gray-600 mt-4 text-lg">
                We provide custom pharmaceutical solutions for any industry. Creating high-value healthcare products and technology for your business.
              </div>
            </div>
            <div className="block-button xl:mt-10 mt-6 flex gap-4 flex-wrap">
              <Link 
                href="/products" 
                className="bg-[#706FE4] hover:bg-[#5a5bd4] text-white px-8 py-3 rounded-full font-bold text-sm transition-all inline-flex items-center gap-2"
              >
                Get a Free Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/contact" 
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-bold text-sm transition-all inline-flex items-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/shortage.jpg"
                                alt="Healthcare professional checking medicine shortage information"
                                width={600}
                                height={500}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#706FE4]/10 rounded-full blur-2xl"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#F5F2EE] rounded-full blur-2xl"></div>
                    </motion.div>
        </div>
      </div>
    </section>
  );
}
