"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchHeroSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <section className="w-full bg-[#f7f4f1] p-10 lg:p-40">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-6xl text-[#162556] leading-tight"
        >
          Accessing Medicines
          <br />
          <span className="text-[#162556] font-bold">Globally, Simplified</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto"
        >
          A dedicated platform for healthcare professionals to source unlicensed,
          shortage, or specialty medicines securely and efficiently.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto"
        >
          <div className="relative flex items-center">
            <div className="absolute left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-gray-900 md:stroke-[1.5]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by generic or brand name"
              className="w-full pl-10 md:pl-12 pr-4 md:pr-12 py-3 bg-white border border-gray-200  rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 sm:placeholder-gray-800 text-xs md:text-lg"
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#7A6FE4] hover:bg-[#6B5FD4] text-white px-4 md:px-6 py-4 md:py-4 rounded-r-full transition-colors flex items-center justify-center"
            >
              <Search className="w-2.5 h-2.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-5.5" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
