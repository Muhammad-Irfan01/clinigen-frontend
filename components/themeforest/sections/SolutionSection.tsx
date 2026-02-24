"use client";

import React from "react";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react";
import { serviceData, type ServiceItem } from "@/data/homeData";

interface SolutionSectionProps {
  classname?: string;
}

export default function SolutionSection({ classname }: SolutionSectionProps) {
  return (
    <section className={`section-solution ${classname}`}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="tag text-sm font-bold text-[#706FE4] bg-[#F7F4F1] px-4 py-2 rounded-full inline-block">
          How we do
        </span>
        <h3 className="text-3xl md:text-4xl font-bold text-[#1D0E62] text-center mt-3">
          Our solutions
        </h3>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-[30px] gap-5 md:mt-10 mt-6">
          {serviceData.slice(0, 6).map((item: ServiceItem, index: number) => {
            const IconComponent = (Icon as any)[item.icon];
            return (
              <div key={index} className="service-item -solution rounded-2xl bg-white h-full shadow-sm border border-gray-100">
                <Link 
                  href="/products" 
                  className="main md:p-10 p-8 flex flex-col items-center h-full"
                >
                  <div className="w-20 h-20 bg-[#F7F4F1] rounded-full flex items-center justify-center">
                    {IconComponent && <IconComponent className="text-6xl text-[#706FE4]" />}
                  </div>
                  <strong className="text-xl font-bold text-[#1D0E62] mt-6">{item.title}</strong>
                  <p className="text-gray-600 text-center mt-3">{item.desc}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
