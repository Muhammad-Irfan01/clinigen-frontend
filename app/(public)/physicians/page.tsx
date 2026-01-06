"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserCircle2, HelpCircle } from "lucide-react";

export default function MyPhysiciansPage() {
  return (
    <div className="min-h-screen font-sans text-[#1A1A3F]">
      {/* Main Content Container */}
        <div className="w-full mb-20 py-10 bg-white">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-[70%] m-auto text-4xl font-bold tracking-tight"
          >
            My physicians
          </motion.h1>
        </div>
      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        
        {/* Header - Left Aligned in container */}

        {/* Empty State Illustration and Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center text-center max-w-md"
        >
          {/* User Icon Placeholder */}
          <div className="mb-8 text-slate-200">
            <UserCircle2 size={160} strokeWidth={1} />
          </div>

          <h2 className="text-2xl font-bold mb-4">
            You haven't associated with a physician yet
          </h2>
          
          <p className="text-slate-500 leading-relaxed font-medium">
            You can associate with a physician when you enrol in a program.
          </p>
        </motion.div>
      </main>
    </div>
  );
}