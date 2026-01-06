"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  Info, 
  MessageCircle, 
  ChevronRight, 
  MapPin 
} from 'lucide-react';

// --- Components ---

const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex-1 min-w-62.5 space-y-4">
    <h3 className="text-sm font-bold text-[#1A1A1A] border-b pb-2 mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const Field = ({ label, value, isEditable = false }: { label: string; value: string; isEditable?: boolean }) => (
  <div className="flex justify-between items-start group">
    <div>
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{label}</p>
      <p className="text-sm font-bold text-gray-800">{value}</p>
    </div>
    {isEditable && (
      <button className="text-[#706FE4] text-xs font-bold hover:underline">Edit</button>
    )}
  </div>
);

export default function AccountDetailPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6 md:p-12 text-[#1A1A1A] font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <h1 className="text-2xl font-black mb-8">Account detail</h1>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col lg:flex-row gap-12">
          <div className="shrink-0">
            <div className="w-20 h-20 bg-[#FFD1C1] rounded-full flex items-center justify-center text-2xl font-bold text-[#1A1A1A]">
              HH
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-12">
            <InfoSection title="Personal information">
              <Field label="Full name" value="Halo Health" />
              <Field label="Email" value="info@haloishere.com" />
              <Field label="Preferred name" value="Halo" isEditable />
              <Field label="Password" value="*******" isEditable />
            </InfoSection>

            <InfoSection title="Job title">
              <Field label="Specialism" value="General Pharmacy" isEditable />
              <Field label="Your job" value="Pharmacist" isEditable />
              <Field label="License or registration number" value="2215703" isEditable />
            </InfoSection>

            <InfoSection title="Institutes">
              <Field label="Current" value="Halo Health Technologies" />
              <Field label="Permissions" value="Basic user" />
              <Field label="Phone number" value="+44 121 8275531" isEditable />
            </InfoSection>
          </div>
        </section>

        {/* 2. Change Institute Bar */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase">Account number: 222029</p>
            <p className="text-md font-bold text-[#1A1A1A]">Halo Health Technologies</p>
          </div>
          <button className="flex items-center gap-2 text-[#706FE4] font-bold text-sm hover:underline">
            <RefreshCw size={16} /> Change institute
          </button>
        </section>

        {/* 3. Shipping Addresses */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="font-bold">Shipping addresses</h2>
            <button className="px-8 py-2 border-2 border-[#706FE4] text-[#706FE4] rounded-full font-bold text-sm hover:bg-[#706FE4] hover:text-white transition-colors">
              Request new address
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-sm">Primary</span>
              <span className="bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold px-2 py-0.5 rounded">Selected</span>
            </div>
            
            <div className="space-y-1 mb-8">
              <p className="text-[11px] font-bold text-gray-400 uppercase">Address</p>
              <p className="text-sm font-bold leading-relaxed text-gray-700">
                Part Ground Floor, Drayton Court, Drayton Road, GB, B90 4NG
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-[#F3E8FF] rounded-lg p-4 flex gap-4">
              <div className="text-[#7C3AED] mt-1"><Info size={20} fill="currentColor" className="text-white" /></div>
              <div className="text-xs leading-relaxed text-[#1D0E62]">
                <p className="font-bold mb-1">Shipping addresses</p>
                <p>
                  You can request to add or remove a shipping address by clicking the relevant button below. 
                  If you require a change to an existing address please contact our Customer Services team 
                  directly on <span className="font-bold">+44 (0) 1932 824 100</span> or email 
                  <span className="text-[#7C3AED] font-bold cursor-pointer ml-1 underline">ukcustomerservice@clinigengroup.com</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 px-8 max-w-lg">
             <span className="font-bold text-sm text-gray-800">Additional</span>
             <span className="ml-3 bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">0</span>
          </div>
        </section>

        {/* 4. Billing Info */}
        <section className="space-y-4">
          <div className="px-2 font-bold uppercase text-[11px] tracking-widest text-gray-500">Billing information</div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-lg">
            <div className="space-y-1 mb-6">
              <p className="text-[11px] font-bold text-gray-400 uppercase">Address</p>
              <p className="text-sm font-bold leading-relaxed text-gray-700">
                Part Ground Floor, Drayton Court, Drayton Road, GB, B90 4NG
              </p>
            </div>
            <div className="bg-[#F3E8FF] rounded-lg p-4 flex gap-4">
              <div className="text-[#7C3AED] mt-1"><Info size={20} fill="currentColor" className="text-white" /></div>
              <div className="text-xs leading-relaxed text-[#1D0E62]">
                <p className="font-bold mb-1">Need to update your billing information?</p>
                <p>To change your billing information please contact Credit Control by emailing 
                <span className="text-[#7C3AED] font-bold cursor-pointer ml-1 underline">creditcontrol@clinigengroup.com</span>.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}