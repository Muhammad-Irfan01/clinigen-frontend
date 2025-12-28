"use client";

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
  onResultsPerPageChange: (count: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  resultsPerPage,
  onPageChange,
  onResultsPerPageChange,
  className,
}: PaginationProps) => {
  return (
    <div className={cn("mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-medium", className)}>
      {/* Previous Button */}
      <div className="flex items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center text-[#431d60] disabled:text-gray-300 hover:opacity-70 transition-opacity"
        >
          <ChevronLeft className="h-4 w-4 mr-1 stroke-[3px]" /> PREVIOUS
        </button>
      </div>

      {/* Page Input Box */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-500 uppercase text-[11px] tracking-widest font-bold">Page</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={currentPage}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val > 0 && val <= totalPages) onPageChange(val);
          }}
          className="w-14 h-9 text-center border border-gray-300 rounded focus:ring-1 focus:ring-purple-400 outline-none transition-all font-bold text-[#431d60]"
        />
        <span className="text-gray-500 uppercase text-[11px] tracking-widest font-bold">of {totalPages}</span>
      </div>

      {/* Results Per Page & Next */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 uppercase text-[11px] tracking-widest font-bold whitespace-nowrap">
            Results per page:
          </span>
          <div className="relative">
            <select
              value={resultsPerPage}
              onChange={(e) => onResultsPerPageChange(Number(e.target.value))}
              className="appearance-none h-9 pl-3 pr-8 border border-gray-300 rounded bg-white focus:ring-1 focus:ring-purple-400 outline-none cursor-pointer font-bold text-[#431d60]"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center text-[#431d60] disabled:text-gray-300 hover:opacity-70 transition-opacity"
        >
          NEXT <ChevronRight className="h-4 w-4 ml-1 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;