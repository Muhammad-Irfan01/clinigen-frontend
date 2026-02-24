"use client";

import React from "react";
import Marquee from "react-fast-marquee";

export default function BannerSection() {
  return (
    <section className={`banner-block bg-[#706FE4] py-7`}>
      <Marquee>
        <h4 className={`text-2xl md:text-3xl font-bold text-white uppercase px-[60px]`}>
          Experience Seamless Healthcare Solutions
        </h4>
        <span className="text-white text-2xl">◆</span>
        <h4 className={`text-2xl md:text-3xl font-bold text-white uppercase px-[60px]`}>
          Request Free Consultation
        </h4>
        <span className="text-white text-2xl">◆</span>
        <h4 className={`text-2xl md:text-3xl font-bold text-white uppercase px-[60px]`}>
          Global Medicine Access
        </h4>
        <span className="text-white text-2xl">◆</span>
        <h4 className={`text-2xl md:text-3xl font-bold text-white uppercase px-[60px]`}>
          Quality Assured Products
        </h4>
        <span className="text-white text-2xl">◆</span>
        <h4 className={`text-2xl md:text-3xl font-bold text-white uppercase px-[60px]`}>
          Experience Seamless Healthcare Solutions
        </h4>
        <span className="text-white text-2xl">◆</span>
        <h4 className={`text-2xl md:text-3xl font-bold text-white uppercase px-[60px]`}>
          Request Free Consultation
        </h4>
        <span className="text-white text-2xl">◆</span>
      </Marquee>
    </section>
  );
}
