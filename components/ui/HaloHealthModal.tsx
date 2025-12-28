"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface HospitalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HaloHealthModal({ isOpen, onClose }: HospitalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              {/* Header */}
              <h2 className="text-2xl font-bold text-[#706FE4] mb-3">
                Associated hospital or institute
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                You can switch between your different associated institutes below. 
                This will change your view of the portal so you can view and place 
                orders for that institute.
              </p>

              {/* Selection Area */}
              <div className="space-y-6 border-t border-b py-6 mb-8">
                {/* Current Selection */}
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="w-5 h-5 rounded-full border-2 border-[#7C3AED] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-[#706FE4] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-400 block mb-0.5">
                      Current
                    </span>
                    <p className="font-bold text-gray-800">Halo Health Technologies</p>
                  </div>
                </div>

                {/* Request Access Link */}
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Don't see the hospital or institute you are looking for?{' '}
                      <button className="text-[#706FE4] font-bold hover:underline">
                        Request access
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  varient='secondary'
                  className="flex-1 py-3 px-6 rounded-full font-bold cursor-pointer transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  disabled
                  varient='primary'
                  className="flex-1 py-3 px-6 rounded-full bg-[#706FE4] text-gray-500 font-bold cursor-not-allowed"
                >
                  Switch to this institute
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}