"use client";

import React, { useState } from 'react';
import { Search, X, ChevronDown, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Pagination from '@/components/ui/Pagination';
import { useRouter } from 'next/navigation';

const PRODUCTS = [
  { id: 1, name: "Abacavir / Lamivudine", generic: "Abacavir sulfate / Lamivudine", program: "Access Program", area: "Antiinfectives for Systemic Use" },
  { id: 2, name: "Anastrozole", generic: "Anastrozole", program: "Available", area: "Antineoplastic and Immunomodulating Agents" },
  { id: 3, name: "Bicalutamide", generic: "Bicalutamide", program: "Available On Request", area: "Antineoplastic and Immunomodulating Agents" },
  { id: 4, name: "Capecitabine", generic: "Capecitabine", program: "Access Program", area: "Antineoplastic and Immunomodulating Agents" },
  { id: 5, name: "Dolutegravir", generic: "Dolutegravir sodium", program: "Available", area: "Antiinfectives for Systemic Use" },
];

const THERAPEUTIC_AREAS = [
  "Alimentary Tract and Metabolism", "Antiinfectives for Systemic Use",
  "Antineoplastic and Immunomodulating Agents", "Antiparasitic Products, Insecticides and Repellents",
  "Blood and Blood-Forming Organs", "Cardiovascular System", "Dermatologicals"
];

const ProductCatalogue = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage, setResultPerPage] = useState<number>(5);
  const totalPages = 15
  return (
    <div className="min-h-screen bg-white font-sans text-[#431d60]">
      <div className="max-w-7xl mx-auto py-12 px-4">
        
        <motion.h1 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-bold mb-10"
        >
          Product catalogue
        </motion.h1>

        {/* --- Filter Section --- */}
        <div className="border border-gray-200 bg-[#f9f8f3] rounded-sm shadow-sm mb-8">
          <div className="flex flex-col md:flex-row border-b border-gray-200">
            <div onClick={() => setShowFilter(!showFilter)} className="px-6 py-5 flex items-center text-[#706FE4] hover:bg-[#706FE4] hover:text-white cursor-pointer border-r border-gray-200 md:w-64">
              <span className=" font-bold text-xs tracking-widest flex items-center">
                 ADVANCED FILTERING
              </span>
            </div>
            <div className="flex-1 p-4 flex items-center gap-4">
              <span className="font-bold text-xs tracking-widest uppercase">Search</span>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="By program, generic name or brand name"
                  className="w-full bg-white border border-gray-300 rounded px-4 py-2 italic text-sm focus:outline-none"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>
          </div>
            {showFilter && (
              <div className="p-8 space-y-8">
                <div>
                  <div className="flex justify-between mb-4">
                    <h3 className="text-[11px] font-bold tracking-widest uppercase">Advanced Filtering</h3>
                    <button className="text-[#706FE4] text-sm font-bold">Clear all</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Access Program", "Available", "Available On Request"].map(f => (
                      <FilterChip key={f} label={f} active={f === "Available"} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4">Therapeutic Area</h3>
                  <motion.div 
                    animate={{ height: isExpanded ? 'auto' : '85px' }} 
                    className="flex flex-wrap gap-2 overflow-hidden"
                  >
                    {THERAPEUTIC_AREAS.map(area => (
                      <FilterChip key={area} label={area} active={selectedAreas.includes(area)} />
                    ))}
                  </motion.div>
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 flex items-center text-[#7c3aed] font-bold text-sm"
                  >
                    {isExpanded ? 'See less' : 'See more'} <ChevronDown size={16} className={clsx("ml-1 transition-transform", isExpanded && "rotate-180")} />
                  </button>
                </div>
              </div>
            )}
        </div>


        {/* --- Product Table/List Section --- */}
        <div className="mt-12 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[#431d60] text-left text-[11px] font-bold tracking-widest uppercase">
                <th className="pb-4 px-4 w-1/3">Product Name</th>
                <th className="pb-4 px-4 w-1/4">Program</th>
                <th className="pb-4 px-4">Therapeutic Area</th>
                <th className="pb-4 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {PRODUCTS.map((product, idx) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <td className="py-6 px-4">
                      <div className="font-bold text-lg">{product.name}</div>
                      <div className="text-sm text-gray-500 italic">{product.generic}</div>
                    </td>
                    <td className="py-6 px-4">
                      <span className={clsx(
                        "text-xs font-bold px-2 py-1 rounded border",
                        product.program === "Access Program" ? "border-purple-200 text-[#D89AFE] bg-purple-50" : "border-gray-200 text-gray-600 bg-gray-50"
                      )}>
                        {product.program}
                      </span>
                    </td>
                    <td className="py-6 px-4 text-sm text-gray-600">
                      {product.area}
                    </td>
                    <td className="py-6 px-4 text-right">
                      <button className="inline-flex items-center text-[#706FE4] font-bold text-sm hover:underline">
                        REQUEST <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* --- Pagination Placeholder --- */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    resultsPerPage={resultsPerPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    onResultsPerPageChange={(count) => {
                      setResultPerPage(count);
                      setCurrentPage(1);
                    }}
                />
      </div>
    </div>
  );
};

const FilterChip = ({ label, active }: { label: string, active?: boolean }) => (
  <button className={clsx(
    "px-4 py-2 border rounded text-sm font-medium transition-all",
    active 
      ? "bg-[#706FE4] text-white border-[#706FE4]" 
      : "bg-white text-[#706FE4] border-gray-300 hover:border-[#706FE4] hover:bg-[#706FE4] hover:text-white"
  )}>
    {label}
  </button>
);

export default ProductCatalogue;