"use client";
import { motion } from "framer-motion";
import clsx from "clsx";

interface TabFilterProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabFilter = ({ tabs, activeTab, onTabChange }: TabFilterProps) => {
  return (
    <div className="flex space-x-2 p-1 bg-white rounded-lg shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={clsx(
            "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300",
            activeTab === tab 
              ? "text-[#706FE4]" 
              : "text-gray-600 hover:text-primary-dark"
          )}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activePill"
              className="absolute inset-0 bg-primary-dark rounded-lg z-0 shadow-md"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
};