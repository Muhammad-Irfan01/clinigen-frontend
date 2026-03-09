"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      rating: 5,
      text: "Nathan is our data guru. His analytical mindset and ability to extract valuable insights from friendly data.",
      name: "Malika Kenny",
      role: "UI Dev TechOne",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      rating: 5,
      text: "Their team's expertise and commitment to excellence are unmatched. They delivered our project ahead.",
      name: "Malika Kenny",
      role: "UI Dev TechOne",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      rating: 5,
      text: "From the initial consultation to project completion, demonstrated exceptional professionalism to detail.",
      name: "Malika Kenny",
      role: "UI Dev TechOne",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
    {
      rating: 5,
      text: "Outstanding service and support. The platform has transformed how we source medicines for our clinic.",
      name: "Dr. James Wilson",
      role: "Medical Director, HealthCare Plus",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      rating: 5,
      text: "Reliable, efficient, and professional. Halo Direct has become our go-to solution for specialty medicines.",
      name: "Sarah Mitchell",
      role: "Pharmacy Manager, MedCare",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const [activeDot, setActiveDot] = useState(0);

  return (
    <section className="w-full bg-[#F5F4F6] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#1D0E62] mb-3">
            Testimonials
          </h2>
          <p className="text-gray-600 text-sm">
            Discover exceptional experiences through testimonials from our satisfied customers.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeDot * (100 / Math.min(3, testimonials.length))}%)` }}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-w-full sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/3)] px-3"
              >
                <div className="bg-white rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                    ))}
                  </div>
                  {/* Text */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    {testimonial.text}
                  </p>
                  {/* Profile */}
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#1D0E62] text-sm">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveDot(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === activeDot
                  ? "bg-[#7A6FE4] w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
