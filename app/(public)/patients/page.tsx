"use client";

import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SearchInput } from '@/components/ui/SearchInput';
import { useRouter } from 'next/navigation';
import { useAccessProgramStore } from '@/store/accessProgram.store';

// --- Utility for Tailwind ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Patients() {
  const router = useRouter();
  const { patients, loading, error, fetchAllPatients } = useAccessProgramStore();
  const [activeFilter, setActiveFilter] = useState("My patients");
  const [searchTerm, setSearchTerm] = useState("");

  const filters = ["My programs", "My patients", "Active patients"];

  useEffect(() => {
    fetchAllPatients();
  }, []);

  // Filter patients based on active filter and search term
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.patientId.toLowerCase().includes(searchTerm.toLowerCase());

    // For now, just filter by search term since we don't have complex patient data
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Loading patients...</div>
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
    <div className="min-h-screen bg-[#f9f8f4] font-sans selection:bg-purple-100">
        <header className="w-full bg-white p-6 flex flex-col md:flex-row items-center justify-evenly gap-6 mb-12">
          <div className="flex items-center gap-8 w-full md:w-auto">
            <h1 className="text-2xl font-bold text-[#2d1a47]">Patients</h1>

            {/* Centered Search Bar */}
            <div className="relative flex-1 md:w-112.5">
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 appearance-none bg-white border border-gray-300 rounded-sm px-4 pl-10 font-bold text-sm text-[#2d1a47] outline-none focus:ring-1 focus:ring-purple-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <button onClick={() => router.push('/create-patient')} className="border border-[#706FE4] text-[#706FE4] hover:text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-[#706FE4] transition-all whitespace-nowrap">
            Create new patient
          </button>
        </header>
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* --- Filter Row --- */}
        <div className="flex items-center gap-4 border-b border-gray-200/60 pb-8 mb-20">
          <span className="text-sm font-bold text-[#2d1a47]">Filter by</span>
          <div className="flex gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-6 py-1.5 rounded-md text-sm font-bold border transition-all",
                  activeFilter === filter
                    ? "bg-[#f3effb] border-[#706FE4] text-[#706FE4]"
                    : "bg-white border-gray-200 text-[#706FE4] hover:border-[#706FE4]"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* --- Patients List or Empty State --- */}
        <main>
          {filteredPatients.length > 0 ? (
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="bg-white p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(`/patients/${patient.id}`)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{patient.firstName} {patient.lastName}</h3>
                      <p className="text-gray-600 text-sm">ID: {patient.patientId}</p>
                      <p className="text-gray-500 text-sm">{patient.email}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        patient.status === 'active' ? 'bg-green-100 text-green-800' :
                        patient.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              {/* Custom SVG Illustration matching the image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
              >
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="9.5" y="17.5" width="5" height="5" rx="1" fill="white" stroke="#7c3aed" strokeWidth="1.5"/>
                  <text x="11" y="21.5" fill="#7c3aed" fontSize="4" fontWeight="bold">?</text>
                </svg>
              </motion.div>

              <h2 className="text-2xl font-bold text-[#2d1a47] mb-3">No patients found</h2>
              <p className="text-gray-500 text-center max-w-md font-medium">
                {searchTerm ? "Try adjusting your search." : "It looks like you haven't created any patients yet. "}
                {!searchTerm && (
                  <>
                    {" "}
                    <button
                      onClick={() => router.push('/create-patient')}
                      className="text-[#7c3aed] underline hover:text-[#6d28d9] transition-colors"
                    >
                      Create your first patient
                    </button>{" "}
                    and begin placing orders.
                  </>
                )}
              </p>
            </div>
          )}
        </main>

        {/* --- Bottom Help Bubble --- */}
        <div className="fixed bottom-8 right-8 flex items-center gap-3">
          <div className="bg-[#e9e4f5] px-6 py-2.5 rounded-full shadow-lg border border-purple-100 flex items-center gap-2 cursor-pointer hover:bg-white transition-all">
            <span className="text-sm font-bold text-[#2d1a47]">👏 Need help?</span>
          </div>
          <div className="w-12 h-12 bg-[#7c3aed] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
        </div>

      </div>
    </div>
  );
}