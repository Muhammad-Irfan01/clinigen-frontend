"use client";

import React from 'react';
import { Download } from 'lucide-react';

export default function AdverseEvent() {
  return (
    <div className="min-h-screen bg-[#f9f8f4] text-[#2d1a47] font-sans selection:bg-purple-100">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        
        {/* --- Header Section --- */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-8">Report an adverse event</h1>
          
          <div className="space-y-6 text-[15px] leading-relaxed text-gray-700 font-medium max-w-4xl">
            <p>
              If your report is related to an <span className="text-[#7c3aed] font-bold">Access Program</span>:
            </p>
            
            <p>
              Please first check if a program-specific adverse event form is available. You can 
              download it from the <span className="font-bold text-[#2d1a47]">Documents</span> tab on the relevant program page.
            </p>
            
            <p>
              If no specific form is available, or if your report is unrelated to an Access Program, 
              please complete the form below and submit it via email.
            </p>
          </div>
        </div>

        {/* --- Available Forms Section --- */}
        <div className="mt-16">
          {/* Section Header */}
          <div className="bg-[#1e0066] text-white px-8 py-4 rounded-t-sm">
            <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase">
              Available Forms
            </h2>
          </div>

          {/* Form Download Row */}
          <div className="bg-white border border-gray-200 border-t-0 p-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm">
            <span className="text-sm font-medium text-gray-600">
              All products
            </span>

            <button className="w-full sm:w-auto px-10 py-2.5 border-2 border-[#706FE4] text-[#706FE4] rounded-full font-bold text-sm hover:bg-[#706FE4] hover:text-white transition-all">
              Download form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}