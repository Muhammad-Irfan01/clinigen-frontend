"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { ArrowRight } from "lucide-react";
import { caseStudyData, type CaseStudyItem } from "@/data/homeData";

interface CaseStudySectionProps {
  classname?: string;
}

export default function CaseStudySection({ classname }: CaseStudySectionProps) {
  return (
    <section className={`case-studies-block ${classname}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between w-full max-lg:flex-wrap gap-y-2">
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
        </div>
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
            {caseStudyData.slice(0, 5).map((item: CaseStudyItem, index: number) => (
              <SwiperSlide key={index}>
                <div className="case-studies-item md:px-6 md:border-r md:border-gray-200">
                  <Link className="main-item block" href="/case-studies">
                    <div className="bg-img block w-full aspect-[397/258] overflow-hidden rounded-xl">
                      <Image 
                        width={4000} 
                        height={4000} 
                        className="w-full h-full object-cover block" 
                        src={item.thumbImage} 
                        alt={item.title} 
                      />
                    </div>
                    <div className="info mt-7 inline-block">
                      <span className="tag text-sm font-bold text-[#706FE4] bg-[#F7F4F1] px-3 py-1 rounded-lg inline-block">
                        {item.category}
                      </span>
                      <strong className="text-xl font-bold block mt-3 text-[#1D0E62]">{item.title}</strong>
                      <p className="text-gray-600 block mt-3">{item.description}</p>
                      <span className="inline-flex items-center gap-2 text-[#706FE4] font-bold mt-3">
                        Learn more
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
