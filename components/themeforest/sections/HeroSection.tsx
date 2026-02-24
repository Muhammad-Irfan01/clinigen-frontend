"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="slider-block lg:py-[60px] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex max-xl:flex-col-reverse gap-8">
          <div className="xl:w-1/3 w-full xl:pr-[15px]">
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
          <div className="xl:w-2/3 w-full xl:pl-[15px]">
            <div className="bg-img w-full rounded-xl overflow-hidden max-sm:h-[300px]">
              <Image 
                width={5000} 
                height={5000} 
                className="w-full max-sm:h-full object-cover" 
                src="/images/slider/slider1.png" 
                alt="Healthcare solutions" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
