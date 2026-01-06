"use client";

import React from 'react';
import { Phone, Printer, Mail } from 'lucide-react';

const REGIONS = [
  {
    name: "Australia and New Zealand",
    phone: "+61 1800 181 060",
    fax: "+61 2 8401 9788",
  },
  {
    name: "Benelux",
    phone: "+32 (0) 2 200 86 79",
    fax: "+32 (0) 2 200 86 80",
  },
  {
    name: "Eastern Europe",
    phone: "+44 1932 824 123",
    fax: "+44 1932 824 323",
  },
  {
    name: "France",
    phone: "+33 (0) 1 5732 3223",
    fax: "+33 (0) 1 5732 3935",
  }
];

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white text-[#2d1a47] font-sans selection:bg-purple-100">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-8">Contact us</h1>
          <p className="max-w-3xl text-[15px] leading-relaxed text-gray-700 font-medium opacity-90">
            We exist to make sure a healthcare professional with a patient in need, anywhere in the world, 
            can always get the right medicine for their individual patient – quickly, easily and safely 
            whether licensed or unlicensed. To support this mission, we employ over 1,200 people and 
            have offices in 14 locations around the world.
          </p>
        </div>

        <div className="space-y-12">
          {REGIONS.map((region, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 items-start">
              
              <div className="w-full md:w-1/3 pt-4 border-t-2 border-[#706FE4]">
                <h2 className="text-2xl font-bold leading-tight">
                  {region.name}
                </h2>
              </div>

              {/* Contact Card */}
              <div className="w-full md:w-112.5 border border-gray-300 rounded-sm p-6">
                <div className="space-y-4">
                  
                  {/* Phone */}
                  <div className="flex items-center gap-4 group">
                    <Phone size={18} className="text-[#2d1a47]" />
                    <a href={`tel:${region.phone}`} className="text-[#706FE4] font-bold text-sm underline-offset-4 hover:underline">
                      {region.phone}
                    </a>
                  </div>

                  {/* Fax */}
                  <div className="flex items-center gap-4">
                    <Printer size={18} className="text-[#2d1a47]" />
                    <span className="text-[#706FE4] font-bold text-sm underline-offset-4 hover:underline">
                      {region.fax}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <Mail size={18} className="text-[#2d1a47]" />
                    <button className="text-[#706FE4] font-bold text-sm underline-offset-4 hover:underline">
                      Send Email
                    </button>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

        {/* --- Help Widget --- */}
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