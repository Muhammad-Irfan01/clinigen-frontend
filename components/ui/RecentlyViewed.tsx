"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MedicineCard } from './MedicineCard';

const RECENT_PRODUCTS = [
  {
    genericName: "(I-asparaginase from erwinia chrysanthemi) 10,000 iu/vial",
    brand: "ERWINASE",
    productCode: "2004069",
    dosage: "Powder for Solution for Injection/Infusion 1 x 5 vials",
    availability: "Available"
  },
  {
    genericName: "glycopyrronium bromide 2 MG",
    brand: "[ENDO]",
    productCode: "2011493",
    dosage: "Tablet (Bottle) 1 x 100",
    availability: "Available"
  },
  {
    genericName: "pyridoxine hydrochloride 100 mg/2 ml",
    brand: "VITAMIN B6 STREULI",
    productCode: "1001802",
    dosage: "Solution for Injection 10 x 2 ml",
    availability: "38 packs available"
  }
];

export const RecentlyViewed = () => {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#002B49] mb-10">Recently viewed:</h2>
        
        {/* Responsive Grid - matches image layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECENT_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.productCode}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MedicineCard {...product} />
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActiveDot(i)}
              className="relative w-3 h-3 rounded-full border-2 border-[#706FE4] transition-all"
            >
              {activeDot === i && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 bg-[#706FE4] rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};