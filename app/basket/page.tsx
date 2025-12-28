"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trash2, CheckCircle, MessageSquare } from 'lucide-react';

// --- Types for Data ---
interface BasketItem {
  id: number;
  name: string;
  strength: string;
  packAmount: number;
  initialQuantity: number;
  productDetails: string;
}

// --- Sample Data ---
const initialBasketItems: BasketItem[] = [
  {
    id: 1,
    name: 'protirelin',
    strength: '0.2 mg',
    packAmount: 143.06,
    initialQuantity: 1,
    productDetails: 'Product details for protirelin 0.2 mg...',
  },
  {
    id: 2,
    name: 'glycopyrronium bromide',
    strength: '2 MG',
    packAmount: 115.95,
    initialQuantity: 1,
    productDetails: 'Product details for glycopyrronium bromide 2 MG...',
  },
];

function BasketProductCard({ item, onDelete }: { item: BasketItem, onDelete: (id: number) => void }) {
  const [quantity, setQuantity] = useState(item.initialQuantity);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const calculatedAmount = (quantity * item.packAmount).toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 space-y-4">
      
      {/* Product Header Row */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-black text-[#1D0E62]">{item.name} ({item.strength})</h3>
          <p className="text-sm font-semibold text-gray-500">Number of packs</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-[#7C3AED]">£{calculatedAmount}</span>
          <button 
            onClick={() => onDelete(item.id)} 
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label={`Delete ${item.name} from basket`}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Quantity Input */}
      <div className="flex justify-between items-start">
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
        />
        <span className="text-sm font-semibold text-gray-500 mr-16">Amount:</span>
      </div>

      {/* Product Details Toggle */}
      <button
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        className="flex items-center justify-between w-full pt-4 text-sm font-bold text-[#1D0E62] hover:text-[#7C3AED] transition-colors"
      >
        Product details
        <motion.div
          animate={{ rotate: isDetailsOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      {/* Collapsible Details */}
      <AnimatePresence>
        {isDetailsOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden text-sm text-gray-600 border-t pt-4"
          >
            {item.productDetails} {/* Placeholder for full spec data */}
            <p className="mt-2 text-[#7C3AED] font-semibold hover:underline cursor-pointer">View full details page</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Main Basket Page ---

export default function BasketPage() {
  const [items, setItems] = useState(initialBasketItems);

  // Calculate Subtotal
  const subtotal = items.reduce((acc, item) => acc + (item.packAmount * item.initialQuantity), 0).toFixed(2);
  const totalItems = items.length;

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-12 font-sans text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Item List */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-black text-[#1D0E62] mb-6">Basket</h1>
          
          {items.length === 0 ? (
            <div className="p-12 text-center text-gray-500 border rounded-xl bg-white">
              Your basket is empty. Add products from the catalog!
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <BasketProductCard item={item} onDelete={handleDelete} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Right Column: Summary Sidebar */}
        <div className="lg:col-span-1 sticky top-8 h-fit space-y-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 space-y-6">
            <h2 className="text-xl font-black text-[#1D0E62]">Summary ({totalItems} items)</h2>
            
            <div className="flex justify-between items-center text-lg font-semibold">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-extrabold">£{subtotal}</span>
            </div>

            {/* Free Shipping Callout */}
            <div className="p-4 rounded-xl bg-[#E6F4FF] border border-[#B3D9FF] flex items-center justify-center text-center">
              <img 
                src="shipping-icon-placeholder.svg" // Replace with actual SVG or use a placeholder icon
                alt="Shipping Truck" 
                className="w-12 h-12 mr-3"
              />
              <p className="text-xs font-bold text-[#1D0E62] leading-tight">
                FREE Shipping on all *small-sized orders!
              </p>
            </div>

            <button
              className="w-full py-4 border border-[#706FE4] hover:text-white font-bold text-sm rounded-full shadow-lg hover:bg-[#706FE4] transition-colors"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}