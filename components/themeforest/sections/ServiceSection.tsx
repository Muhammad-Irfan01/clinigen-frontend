"use client";

import React from "react";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react";
import { serviceData, type ServiceItem } from "@/data/homeData";
import { ArrowRight } from "lucide-react";

interface ServiceSectionProps {
  classname?: string;
}

export default function ServiceSection({ classname }: ServiceSectionProps) {
  return (
    <section className={`service-block lg:py-20 sm:py-14 py-10 ${classname}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between w-full max-lg:flex-wrap gap-y-4">
          <div className="xl:w-2/3 lg:w-3/4 w-full">
            <div className="tag text-sm font-bold text-[#706FE4] bg-[#F7F4F1] px-4 py-2 rounded-full inline-block">
              What we do
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#1D0E62] mt-3">
              Solve healthcare challenges in every industry that customers need.
            </h3>
          </div>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-[#706FE4] font-bold border-b-2 border-[#706FE4] pb-1 hover:text-[#1D0E62] hover:border-[#1D0E62] duration-300 transition-colors whitespace-nowrap"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:gap-7 gap-5 md:gap-y-4 gap-y-5 mt-10">
          {serviceData.slice(6, 16).map((item: ServiceItem, index: number) => {
            const IconComponent = (Icon as any)[item.icon];
            return (
              <Link
                key={index}
                href="/products"
                className="service-item -list bg-[#F7F4F1] py-4 px-5 flex items-center rounded-lg h-full hover:bg-[#706FE4] hover:text-white transition-colors"
              >
                {IconComponent && <IconComponent className="service-icon text-2xl flex-shrink-0 text-[#706FE4]" />}
                <div className="service-name font-bold pl-3">{item.title}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
