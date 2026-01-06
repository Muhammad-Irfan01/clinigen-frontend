"use client";

import React, { useState } from 'react';
import { Search, Info, ChevronRight, ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Pagination from '@/components/ui/Pagination';
import { SearchInput } from '@/components/ui/SearchInput';
import { useRouter } from 'next/navigation';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data based on your image ---
const ACCESS_PROGRAMS = [
  { name: "Abraxane", company: "Celgene Logistics Sarl", status: "Closed" },
  { name: "Acalabrutinib MCL UK", company: "Astra Zeneca UK Ltd", status: "Accepting new patients" },
  { name: "Adcetris IPR", company: "Takeda", status: "Accepting new patients" },
  { name: "Adriatic", company: "AstraZeneca UK Ltd", status: "Resupply only" },
  { name: "Adriatic Durvalumab - Italy", company: "AstraZeneca SPA", status: "Closed" },
  { name: "Aimovig PTA", company: "Amgen Inc", status: "Closed" },
  { name: "Alprolix", company: "Genzyme", status: "Closed" },
  { name: "Altuviiio PTA", company: "Sanofi Aventis Recherche et Developpement", status: "Closed" },
];

export default function AccessPrograms() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const totalPages = 15;
  return (
    <div className="min-h-screen font-sans text-[#2d1a47] mb-16">
        <header className="w-full bg-white flex flex-col md:flex-row justify-evenly items-center p-6 mb-6 gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Access Programs</h1>
            <Info size={18} className="text-[#2d1a47] opacity-70 cursor-help" />
          </div>
          
          <div className="relative w-full md:w-96">
            <SearchInput button={false} />
          </div>
        </header>
      <div className="max-w-5xl mx-auto">
        
        {/* Header Bar */}

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3 mb-8 text-sm">
          <span className="font-bold text-[#2d1a47]">Filter by</span>
          {["Enrolled", "Accepting new patients", "Resupply only", "Therapeutic Area"].map((filter) => (
            <button 
              key={filter}
              className="px-4 py-1 bg-white border border-gray-200 rounded-md font-medium text-[#706FE4] hover:bg-[#706FE4] hover:text-white transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* --- Programs List --- */}
        <div className="space-y-3">
          {ACCESS_PROGRAMS.map((item, idx) => (
            <div 
              key={idx}
              className="group flex items-center justify-between bg-white p-5 border border-transparent hover:border-purple-200 hover:shadow-md transition-all cursor-pointer rounded-sm"
              onClick={() => router.push(`/access-program/${item.name}`) }
            >
              <div>
                <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                <p className="text-gray-400 text-sm mt-0.5">{item.company}</p>
              </div>

              <div className="flex items-center gap-8">
                <StatusTag status={item.status} />
                <ChevronRight className="text-[#7c3aed] group-hover:translate-x-1 transition-transform" size={24} strokeWidth={1.5} />
              </div>
            </div>
          ))}
        </div>

        {/* --- Pagination --- */}
          <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              resultsPerPage={resultsPerPage}
              onPageChange={(page) => setCurrentPage(page)} 
              onResultsPerPageChange={(count) => setResultsPerPage(count)}
          />
      </div>
    </div>
  );
}

// --- Internal Helper for Status Tags ---
function StatusTag({ status }: { status: string }) {
  const styles = {
    "Closed": "bg-[#f4f2ee] text-gray-700",
    "Accepting new patients": "bg-[#e7f6f2] text-[#2d6a4f]",
    "Resupply only": "bg-[#f3effb] text-[#7c3aed]",
  };

  return (
    <span className={cn(
      "px-6 py-1.5 rounded-full text-xs font-bold min-w-40 text-center",
      styles[status as keyof typeof styles] || "bg-gray-100"
    )}>
      {status}
    </span>
  );
}