"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown, ChevronUp, Download, Package, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- Types ---
interface Product {
  id: string;
  name: string;
  strength: string;
  dosage: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  price: number;
  quantity: number;
  brand: string;
  manufacturer: string;
  country: string;
  storage: string;
}

// --- Mock Data ---
const productData: Product = {
  id: "1001300",
  name: "Zinc aspartate",
  strength: "30 mg/10 ml",
  dosage: "Solution for Injection 5 x 10 ml",
  status: "Processing",
  price: 19.70,
  quantity: 2,
  brand: "Unizink",
  manufacturer: "Kohler",
  country: "Germany",
  storage: "15-25 °C"
};

export default function OrderDetailsPage() {
    const router = useRouter();
  const [isProductExpanded, setIsProductExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1A1A1A] font-sans">
        <header className="bg-white flex flex-col md:flex-row justify-evenly items-start md:items-center mb-8 gap-4 p-6">
            <div>
                <button onClick={() => router.push('/order')} className="flex items-center text-sm font-medium text-blue-600 hover:underline mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" /> View orders
            </button>
            <h1 className="text-3xl font-extrabold tracking-tight">Order 10535700</h1>
            </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#D1D5DB] text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" /> Download invoice
            </button>
            
            <div className="bg-[#F3E8FF] border border-[#E9D5FF] p-4 rounded-xl flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Package className="w-6 h-6 text-[#7C3AED]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Estimated delivery</p>
                <p className="text-[#7C3AED] font-bold">Friday, Jan 16</p>
                <p className="text-xs text-purple-400">Tracking link pending</p>
              </div>
            </div>
          </div>
        </header>
      <div className="max-w-6xl mx-auto">
        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Delivery Info Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold border-b pb-4 mb-4">Delivery information</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1 uppercase">Delivery method:</p>
                <span className="px-3 py-1 bg-[#F3F4F6] text-gray-600 rounded-full text-xs font-bold italic">
                  Mail available
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1 uppercase">Date submitted:</p>
                <p className="text-sm font-bold">Monday, December 8</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-400 font-semibold mb-1 uppercase">Delivery address:</p>
                <p className="text-sm font-bold">Halo Health</p>
                <p className="text-sm text-gray-600">Part Ground Floor, Drayton Court, Drayton Road, Solihull, B90 4NG, United Kingdom</p>
              </div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-black p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-extrabold">Order summary</h2>
              <ChevronDown className="w-5 h-5" />
            </div>
            <div className="space-y-3 text-sm border-b pb-6">
              <div className="flex justify-between text-gray-600">
                <span>Products (see breakdown below)</span>
                <span className="font-bold">£39.40</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>VAT:</span>
                <span className="font-bold">£7.88</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-6">
              <span className="text-xl font-extrabold">Total:</span>
              <span className="text-2xl font-black">£39.28</span>
            </div>
          </div>
        </div>

        {/* Product Details Table */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0">
            <h2 className="text-lg font-bold">Product details</h2>
            <button className="bg-[#7C3AED] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#6D28D9] transition-all">
              Order available items again
            </button>
          </div>

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
                <tr className="border-b last:border-0">
                  <td className="px-6 py-6">
                    <p className="font-bold text-sm">{productData.name}</p>
                    <p className="text-xs text-gray-500">{productData.strength}</p>
                  </td>
                  <td className="px-6 py-6 text-sm text-gray-600">{productData.dosage}</td>
                  <td className="px-6 py-6">
                    <span className="px-4 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold border border-green-100">
                      {productData.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-sm font-medium">£{productData.price.toFixed(2)}</td>
                  <td className="px-6 py-6 text-sm font-medium">{productData.quantity}</td>
                  <td className="px-6 py-6 text-sm font-bold">£{(productData.price * productData.quantity).toFixed(2)}</td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <button className="text-[#7C3AED] font-bold text-sm hover:underline">Order again</button>
                      <button 
                        onClick={() => setIsProductExpanded(!isProductExpanded)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {isProductExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Expandable Section */}
          <AnimatePresence>
            {isProductExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#FDFDFF] border-t overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase">Product Information</h4>
                    <div className="space-y-2">
                      <div><p className="text-xs text-gray-400">Brand</p><p className="text-sm font-bold">{productData.brand}</p></div>
                      <div><p className="text-xs text-gray-400">Manufacturer</p><p className="text-sm font-bold">{productData.manufacturer}</p></div>
                      <div><p className="text-xs text-gray-400">Product code</p><p className="text-sm font-bold">{productData.id}</p></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase">Licensing</h4>
                    <div className="space-y-2">
                      <div><p className="text-xs text-gray-400">Country of license</p><p className="text-sm font-bold">{productData.country}</p></div>
                      <div><p className="text-xs text-gray-400">License holder</p><p className="text-sm font-bold">Kohler</p></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase">Handling and storage</h4>
                    <div className="space-y-2">
                      <div><p className="text-xs text-gray-400">Controlled drug status</p><p className="text-sm font-bold">Not Controlled</p></div>
                      <div>
                        <p className="text-xs text-gray-400">Storage</p>
                        <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded">
                          {productData.storage}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}