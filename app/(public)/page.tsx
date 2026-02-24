"use client";

import React from "react";
import Header from "@/components/themeforest/Header";
import Footer from "@/components/themeforest/Footer";
import HeroSection from "@/components/themeforest/sections/HeroSection";
import SearchHeroSection from "@/components/themeforest/sections/SearchHeroSection";
import AboutSection from "@/components/themeforest/sections/AboutSection";
import BenefitSection from "@/components/themeforest/sections/BenefitSection";
import SolutionSection from "@/components/themeforest/sections/SolutionSection";
import ServiceSection from "@/components/themeforest/sections/ServiceSection";
import CaseStudySection from "@/components/themeforest/sections/CaseStudySection";
import BannerSection from "@/components/themeforest/sections/BannerSection";
import BrandSection from "@/components/themeforest/sections/BrandSection";
import TestimonialSection from "@/components/themeforest/sections/TestimonialSection";
import ContactSection from "@/components/themeforest/sections/ContactSection";

const Home = () => {
  return (
    <>
      <main className="bg-white">
        <HeroSection />
        <SearchHeroSection />
        {/* <AboutSection /> */}
        <BenefitSection classname="lg:mt-20 sm:mt-14 mt-10" />
        <SolutionSection classname="lg:mt-20 sm:mt-14 mt-10 lg:py-20 sm:py-14 py-10" />
        <ServiceSection classname="lg:mt-20 sm:mt-14 mt-10" />
        <CaseStudySection classname="bg-[#F7F4F1] lg:mt-20 sm:mt-14 mt-10 lg:py-20 sm:py-14 py-10" />
        <BannerSection />
        <BrandSection classname="bg-white lg:py-20 md:py-14 py-10" />
        <TestimonialSection classname="lg:mt-20 sm:mt-14 mt-10" />
        <ContactSection classname="bg-linear-to-r from-[#706FE4] to-[#D89AFE]" />
      </main>
    </>
  );
};

export default Home;
