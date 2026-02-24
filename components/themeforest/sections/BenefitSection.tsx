"use client";

import React from "react";
import * as Icon from "@phosphor-icons/react";
import { benefitData, type BenefitItem } from "@/data/homeData";

interface BenefitSectionProps {
  classname?: string;
}

export default function BenefitSection({ classname }: BenefitSectionProps) {
  return (
    <section className={`section-benefit ${classname}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-[30px]">
          {benefitData.map((item: BenefitItem, index: number) => {
            const IconComponent = (Icon as any)[item.icon];
            return (
              <div className="benefit-item" key={index}>
                <div className="block-icon w-16 h-16 bg-[#F7F4F1] rounded-full flex items-center justify-center mb-4">
                  {IconComponent && <IconComponent className="text-4xl text-[#706FE4]" />}
                </div>
                <h6 className="text-xl font-bold text-[#1D0E62] sm:mt-4 mt-2">{item.title}</h6>
                <div className="text-gray-600 mt-2">{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
