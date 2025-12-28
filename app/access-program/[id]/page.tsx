"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const tabs = [
  { id: 'patients', label: 'Patients', count: 0 },
  { id: 'physicians', label: 'Physicians', count: 0 },
  { id: 'documents', label: 'Documents', count: 0 },
];

export default function SingleAcessProgram({params}: {params: {id: string}}) {
  const [activeTab, setActiveTab] = useState('patients');

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#333]">
        <header className="mb-8 bg-white py-6 flex items-center justify-evenly">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 pb-2">Abraxane</h1>
                <p className="text-md text-slate-500">by Celgene Logistics Sarl</p>
            </div>
            <button className="border border-[#706FE4] hover:bg-[#706FE4] hover:text-white text-[#706FE4] px-8 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2">
              Enrol
            </button>
        </header>
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}

        {/* Status Card */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-6 flex flex-wrap gap-8 md:gap-16">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Product</span>
            <span className="font-bold text-slate-700">Abraxane</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</span>
            <div>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full border border-slate-200">
                Closed
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated Delivery</span>
            <span className="font-semibold text-slate-700">Available at checkout</span>
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
                <h2 className="text-lg font-medium text-slate-700 mb-4">
                  We are no longer accepting orders for this program. If you have any questions about this program, please get in touch.
                </h2>

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