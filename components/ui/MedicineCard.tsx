"use client";
import { motion } from "framer-motion";
import { Pill, Clipboard, Box, CheckCircle2 } from "lucide-react";

interface MedicineCardProps {
  genericName: string;
  brand: string;
  productCode: string;
  dosage: string;
  availability: string;
}

export const MedicineCard = ({ genericName, brand, productCode, dosage, availability }: MedicineCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col h-full"
    >
      <div className="grow space-y-4 text-sm">
        <section>
          <p className="text-[#706FE4] font-bold text-xs uppercase mb-1">Generic name and strength:</p>
          <p className="text-slate-800 font-medium leading-tight">{genericName}</p>
        </section>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Clipboard className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-[#706FE4] font-bold text-xs uppercase">Brand</p>
              <p className="text-slate-700">{brand}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Box className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-[#706FE4] font-bold text-xs uppercase">Product code</p>
              <p className="text-slate-700">{productCode}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Pill className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-[#706FE4] font-bold text-xs uppercase">Dosage form and pack size</p>
              <p className="text-slate-700">{dosage}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="text-[#706FE4] font-bold text-xs uppercase">Availability</p>
              <p className="text-green-600 font-bold">{availability}</p>
            </div>
          </div>
        </div>
      </div>

      <button className="mt-6 w-full py-2.5 border-2 border-[#706FE4] text-[#706FE4] font-bold rounded-full hover:bg-[#706FE4] hover:text-white transition-all duration-300">
        View medicine
      </button>
    </motion.div>
  );
};