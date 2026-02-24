"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="about-block">
      <div className="max-w-7xl mx-auto px-6">
        <div className="content rounded-2xl bg-gradient-to-r from-[#706FE4] to-[#D89AFE] md:p-10 p-7">
          <div className="heading flex max-lg:flex-col gap-y-4 md:pb-10 pb-8 border-b border-white/30">
            <div className="w-full xl:w-5/12 lg:w-1/2">
              <div className="tag text-sm font-bold text-white bg-[#1D0E62] px-4 py-2 rounded-full inline-block">
                About Us
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-4">
                We solve healthcare access challenges.
              </h3>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="text-white text-lg">
                Your trusted healthcare partner! We offer customized pharmaceutical solutions, from regulatory compliance to global distribution and quality assurance. Empower your healthcare facility with our expertise for growth and efficiency.
              </div>
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 text-white font-bold mt-4 border-b-2 border-white pb-1 hover:text-[#1D0E62] hover:border-[#1D0E62] duration-300 transition-colors"
              >
                Join us today!
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="counter grid md:grid-cols-4 grid-cols-2 gap-y-6 md:pt-10 pt-8">
            <div className="counter-item px-5 border-l border-white">
              <div className="text-4xl md:text-5xl font-bold text-white">20</div>
              <div className="text-white mt-1 font-medium">Years experiences</div>
            </div>
            <div className="counter-item px-5 border-l border-white">
              <div className="flex items-center">
                <div className="text-4xl md:text-5xl font-bold text-white">1.8</div>
                <span className="text-4xl md:text-5xl font-bold text-white">k</span>
              </div>
              <div className="text-white mt-1 font-medium">Happy customers</div>
            </div>
            <div className="counter-item px-5 border-l border-white">
              <div className="text-4xl md:text-5xl font-bold text-white">460</div>
              <div className="text-white mt-1 font-medium">Project completed</div>
            </div>
            <div className="counter-item px-5 border-l border-white">
              <div className="text-4xl md:text-5xl font-bold text-white">15</div>
              <div className="text-white mt-1 font-medium">Awards achievement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
