"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react";
import { testimonialData, type TestimonialItem } from "@/data/homeData";

interface TestimonialSectionProps {
  classname?: string;
}

export default function TestimonialSection({ classname }: TestimonialSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (item: any) => {
    setActiveIndex(item.activeIndex);
  };

  return (
    <section className="testimonial-block style-one lg:pb-20 sm:pb-14 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`w-full flex items-center justify-center ${classname}`}>
          <div className="lg:w-11/12 w-full relative rounded-[40px] overflow-hidden bg-gradient-to-r from-[#F7F4F1] to-white max-md:flex max-sm:flex-col-reverse">
            <div className="list-testimonials sm:w-7/12 lg:pb-12 pb-9">
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                className="h-full relative style-testimonial"
                pagination={{ clickable: true }}
                modules={[Pagination]}
                onSlideChange={handleSlideChange}
              >
                {testimonialData.slice(0, 4).map((item: TestimonialItem, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="testimonial-item lg:px-[60px] px-9 lg:py-12 py-9">
                      <div className="star flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon.Star 
                            key={i} 
                            className={`text-2xl ${i < item.rate ? "text-[#706FE4] fill-[#706FE4]" : "text-gray-300"}`} 
                            weight={i < item.rate ? "fill" : "regular"}
                          />
                        ))}
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold text-[#1D0E62] lg:mt-6 mt-4">
                        "{item.review}"
                      </h4>
                      <div className="infor mt-4">
                        <span className="text-lg font-bold text-[#1D0E62] block pb-1">{item.name}</span>
                        <span className="text-gray-600">{item.company}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="list-avatar md:absolute top-0 right-0 sm:w-5/12 md:h-full max-md:w-full">
              {testimonialData.map((item: TestimonialItem, index: number) => (
                <div 
                  className={`bg-img w-full h-full transition-opacity duration-500 ${index === activeIndex ? "opacity-100" : "opacity-0 absolute top-0 left-0"}`} 
                  key={index}
                >
                  <Image 
                    width={5000} 
                    height={4000} 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
