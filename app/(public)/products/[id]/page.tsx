"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp, 
  ShoppingCart, 
  Info,
  Beaker,
  Globe,
  ClipboardCheck,
  Thermometer
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SingleProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <button onClick={() => router.push('/products')} className="flex items-center text-sm font-medium text-blue-600 hover:underline mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> View all products
        </button>

        {/* Product Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#1D0E62]">Product details</h1>
              <p className="text-sm text-gray-500">Managing details for Product ID: {params.id || '1001300'}</p>
            </div>
            <button className="bg-[#706FE4] hover:bg-[#D89AFE] text-white px-8 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2">
              Order available items again
            </button>
          </div>

          {/* Main Product Row */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F9FAFB] text-[10px] uppercase font-bold text-gray-400 border-b">
                <tr>
                  <th className="px-6 py-4">Strength</th>
                  <th className="px-6 py-4">Dosage form and pack size</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Pack price</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={() => router.push(`/order/${params}`)} className="border-b last:border-0 cursor-pointer">
                  <td className="px-6 py-8">
                    <p className="font-bold text-base text-[#1D0E62]">zinc aspartate</p>
                    <p className="text-sm text-gray-500">30 mg/10 ml</p>
                  </td>
                  <td className="px-6 py-8 text-sm text-gray-600">
                    Solution for Injection<br />5 x 10 ml
                  </td>
                  <td className="px-6 py-8">
                    <span className="px-4 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-bold border border-green-100">
                      Processing
                    </span>
                  </td>
                  <td className="px-6 py-8 text-sm font-medium">£19.70</td>
                  <td className="px-6 py-8 text-sm font-medium">2</td>
                  <td className="px-6 py-8 text-sm font-bold">£39.40</td>
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-4">
                      <button className="border text-[#706FE4] px-4 py-1.5 rounded-full font-bold text-sm hover:bg-[#706FE4] hover:text-white hover:border-none transition-colors">
                        Order again
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsExpanded(!isExpanded)
                        }}
                        className="text-gray-400 hover:text-[#7C3AED] transition-colors"
                      >
                        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Expandable Technical Specs Section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#FDFDFF] border-t overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-10">
                  {/* Column 1: Product Info */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold text-[#1D0E62] uppercase tracking-wider border-b pb-2">Product information</h4>
                    <div className="space-y-4">
                      <div><p className="text-[11px] font-bold text-gray-400 uppercase">Brand</p><p className="text-sm font-bold text-gray-800">Unizink</p></div>
                      <div><p className="text-[11px] font-bold text-gray-400 uppercase">Over-labelled</p><p className="text-sm font-bold text-gray-800">No</p></div>
                      <div><p className="text-[11px] font-bold text-gray-400 uppercase">Manufacturer</p><p className="text-sm font-bold text-gray-800">Kohler</p></div>
                      <div><p className="text-[11px] font-bold text-gray-400 uppercase">Product code</p><p className="text-sm font-bold text-gray-800">1001300</p></div>
                    </div>
                  </div>

                  {/* Column 2: Licensing */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold text-[#1D0E62] uppercase tracking-wider border-b pb-2">Licensing</h4>
                    <div className="space-y-4">
                      <div><p className="text-[11px] font-bold text-gray-400 uppercase">Country of license</p><p className="text-sm font-bold text-gray-800">Germany</p></div>
                      <div><p className="text-[11px] font-bold text-gray-400 uppercase">License holder</p><p className="text-sm font-bold text-gray-800">Kohler</p></div>
                      <div><p className="text-[11px] font-bold text-gray-400 uppercase">License number</p><p className="text-sm font-bold text-gray-800">6073335.00.00</p></div>
                    </div>
                  </div>

                  {/* Column 3: Handling */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold text-[#1D0E62] uppercase tracking-wider border-b pb-2">Handling and storage</h4>
                    <div className="space-y-4">
                      <div><p className="text-[11px] font-bold text-gray-400 uppercase">Controlled drug status</p><p className="text-sm font-bold text-gray-800">Not Controlled</p></div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Expiry date</p>
                        <p className="text-sm font-bold text-gray-800 leading-tight">Greater than 6 months (excluding UK & Ireland specials)</p>
                      </div>
                      <div><p className="text-[11px] font-bold text-gray-400 uppercase">Cytotoxic</p><p className="text-sm font-bold text-gray-800">No</p></div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">Storage</p>
                        <span className="inline-flex items-center px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-black rounded border border-green-200">
                          15-25 °C
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}