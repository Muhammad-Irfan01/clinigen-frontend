"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Info, MessageCircle } from 'lucide-react';
import { PageLoader } from '@/components/ui/PageLoader';
import { Button } from '@/components/ui/Button';

export default function PreferencesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-12 text-[#1A1A1A]">
      <AnimatePresence>
        {isLoading && <PageLoader />}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black text-[#1A1A1A] mb-8">Preferences</h1>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-12"
        >
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800">Language</label>
              <div className="relative max-w-sm">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                >
                  <option>English</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Spanish</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="px-10 py-2.5 border border-[#706FE4] text-[#706FE4] rounded-full font-bold text-sm hover:bg-[#706FE4] hover:text-white transition-colors">
                Save
              </Button>
              <Button varient="secondary" className="px-10 py-2.5 border border-[#7C3AED] text-[#706FE4] rounded-full font-bold text-sm hover:bg-purple-50 transition-colors">
                Cancel
              </Button>
            </div>
          </div>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden md:block w-px bg-gray-100" />

          <div className="flex-[1.5]">
            <div className="bg-[#F3E8FF] rounded-xl p-6 flex gap-4">
              <div className="mt-1">
                <div className="bg-[#7C3AED] rounded-full p-1">
                   <Info size={16} className="text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#1D0E62]">Manage marketing subscriptions</h3>
                <p className="text-xs text-[#1D0E62] leading-relaxed">
                  To manage your marketing subscriptions click{' '}
                  <Button varient="secondary" className="text-[#7C3AED] font-bold underline hover:text-[#5B21B6]">here</Button>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}