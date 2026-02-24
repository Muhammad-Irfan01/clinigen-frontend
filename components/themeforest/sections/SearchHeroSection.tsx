"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/ui/SearchInput";

export default function SearchHeroSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };

  return (
    <section className="max-w-4xl mx-auto text-center space-y-8 px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-extrabold text-blue-950 leading-tight"
      >
        Accessing medicines <br />
        <span className="text-gradient-primary">globally, simplified.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-gray-600 max-w-2xl mx-auto"
      >
        A dedicated platform for healthcare professionals to source unlicensed,
        shortage, or specialty medicines securely and efficiently.
      </motion.p>

      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
      />
    </section>
  );
}
