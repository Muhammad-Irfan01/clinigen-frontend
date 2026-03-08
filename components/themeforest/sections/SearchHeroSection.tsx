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
    <section className="w-full bg-[#F9F4F4] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
        >
          Accessing Medicines
          <br />
          <span className="text-gray-900">Globally, Simplified</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-600 max-w-xl mx-auto"
        >
          A dedicated platform for healthcare professionals to source unlicensed,
          shortage, or specialty medicines securely and efficiently.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto"
        >
          <div className="relative flex items-center">
            <div className="absolute left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500 stroke-[1.5]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by generic or brand name"
              className="w-full pl-11 pr-12 py-3.5 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#7A6FE4] hover:bg-[#6B5FD4] text-white px-6 py-4 rounded-r-full transition-colors flex items-center justify-center"
            >
              <Search className="h-4 w-4 stroke-2" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
