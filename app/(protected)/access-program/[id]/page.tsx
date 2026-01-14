"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAccessProgramStore } from '@/store/accessProgram.store';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

export default function SingleAcessProgram({params}: {params: {id: string}}) {
  const router = useRouter();
  const { selectedProgram, loading, error, fetchAccessProgramById, fetchPatientsForProgram, patients } = useAccessProgramStore();
  const { isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState('patients');

  useEffect(() => {
    if (params.id) {
      fetchAccessProgramById(Number(params.id));
      fetchPatientsForProgram(Number(params.id));
    }
  }, [params.id]);

  const tabs = [
    { id: 'patients', label: 'Patients', count: patients.length },
    { id: 'physicians', label: 'Physicians', count: 0 },
    { id: 'documents', label: 'Documents', count: 0 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Loading access program...</div>
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

  if (!selectedProgram) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Access program not found</div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!isAuthenticated) {
      router.push('/signin');
      return;
    }
    // Redirect to create patient page with program ID
    router.push(`/create-patient?programId=${selectedProgram.id}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#333]">
        <header className="mb-8 bg-white py-6 flex items-center justify-evenly">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 pb-2">{selectedProgram.name}</h1>
                <p className="text-md text-slate-500">by {selectedProgram.company}</p>
            </div>
            <button
              onClick={handleEnroll}
              className="border border-[#706FE4] hover:bg-[#706FE4] hover:text-white text-[#706FE4] px-8 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2">
              Enrol
            </button>
        </header>
      <div className="max-w-4xl mx-auto">

        {/* Status Card */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-6 flex flex-wrap gap-8 md:gap-16">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Product</span>
            <span className="font-bold text-slate-700">{selectedProgram.name}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</span>
            <div>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full border border-slate-200">
                {selectedProgram.status}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated Delivery</span>
            <span className="font-semibold text-slate-700">{selectedProgram.estimatedDelivery}</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden min-h-100">

          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 py-4 text-sm font-medium transition-colors focus:outline-none
                  ${activeTab === tab.id ? 'text-[#706FE4]' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {tab.label} <span className="ml-1 opacity-50 text-xs font-bold bg-slate-100 px-1.5 py-0.5 rounded-full">{tab.count}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#706FE4]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8 md:p-16 flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-md"
              >
                {activeTab === 'patients' && (
                  <>
                    {patients.length > 0 ? (
                      <div className="text-left">
                        <h2 className="text-lg font-medium text-slate-700 mb-4">Patients enrolled in this program:</h2>
                        <ul className="space-y-2">
                          {patients.map(patient => (
                            <li key={patient.id} className="border-b border-gray-200 pb-2">
                              <span className="font-medium">{patient.firstName} {patient.lastName}</span> - {patient.status}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <h2 className="text-lg font-medium text-slate-700 mb-4">
                        No patients enrolled in this program yet. Be the first to enroll!
                      </h2>
                    )}
                  </>
                )}

                {activeTab === 'physicians' && (
                  <h2 className="text-lg font-medium text-slate-700 mb-4">
                    Physician information for this program will be displayed here.
                  </h2>
                )}

                {activeTab === 'documents' && (
                  <h2 className="text-lg font-medium text-slate-700 mb-4">
                    Documents related to this program will be available here.
                  </h2>
                )}

                <div className="space-y-4 mt-8">
                  <a
                    href="tel:+441932824100"
                    className="flex items-center justify-center gap-2 text-[#706FE4] transition-colors"
                  >
                    <Phone size={18} />
                    <span className="font-medium">+44 (0) 1932 824 100</span>
                  </a>

                  <a
                    href="mailto:ukcustomerservice@clinigengroup.com"
                    className="flex items-center justify-center gap-2 text-[#706FE4] transition-colors"
                  >
                    <Mail size={18} />
                    <span className="font-medium border-b border-indigo-200">ukcustomerservice@clinigengroup.com</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}