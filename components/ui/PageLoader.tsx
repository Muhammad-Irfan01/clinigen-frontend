'use client'
import { motion } from 'framer-motion';

export const PageLoader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Modern Spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#7C3AED] rounded-full animate-spin" />
        <p className="text-[#1D0E62] font-bold text-sm tracking-widest uppercase">Loading...</p>
      </div>
    </motion.div>
  );
};