"use client";

import React, { useState, useEffect } from 'react';
import { Search, Info, ChevronRight, ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Pagination from '@/components/ui/Pagination';
import { SearchInput } from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useAccessProgramStore } from '@/store/accessProgram.store';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AccessPrograms() {
  const router = useRouter();
  const { accessPrograms, loading, error, fetchAccessPrograms } = useAccessProgramStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filters = ["All", "Enrolled", "Accepting new patients", "Resupply only", "Therapeutic Area"];

  // Filter programs based on search and status
  const filteredPrograms = accessPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          program.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || program.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPrograms.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedPrograms = filteredPrograms.slice(startIndex, startIndex + resultsPerPage);

  useEffect(() => {
    fetchAccessPrograms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Loading access programs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-[#2d1a47] mb-16">
        <header className="w-full bg-white flex flex-col md:flex-row justify-evenly items-center p-6 mb-6 gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Access Programs</h1>
            <Info size={18} className="text-[#2d1a47] opacity-70 cursor-help" />
          </div>

          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="w-full h-11 appearance-none bg-white border border-gray-300 rounded-sm px-4 pl-10 font-bold text-sm text-[#2d1a47] outline-none focus:ring-1 focus:ring-purple-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </header>
      <div className="max-w-5xl mx-auto">

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3 mb-8 text-sm">
          <span className="font-bold text-[#2d1a47]">Filter by</span>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setStatusFilter(filter.toLowerCase() === 'all' ? 'all' : filter);
                setCurrentPage(1); // Reset to first page when filtering
              }}
              className={`px-4 py-1 border rounded-md font-medium transition-colors ${
                statusFilter === filter.toLowerCase() || (filter.toLowerCase() === 'all' && statusFilter === 'all')
                  ? 'bg-[#706FE4] text-white'
                  : 'bg-white border-gray-200 text-[#706FE4] hover:bg-[#706FE4] hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* --- Programs List --- */}
        <div className="space-y-3">
          {paginatedPrograms.map((program, idx) => (
            <div
              key={program.id}
              className="group flex items-center justify-between bg-white p-5 border border-transparent hover:border-purple-200 hover:shadow-md transition-all cursor-pointer rounded-sm"
              onClick={() => router.push(`/access-program/${program.id}`) }
            >
              <div>
                <h3 className="font-bold text-lg leading-tight">{program.name}</h3>
                <p className="text-gray-400 text-sm mt-0.5">{program.company}</p>
              </div>

              <div className="flex items-center gap-8">
                <StatusTag status={program.status} />
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