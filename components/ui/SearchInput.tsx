"use client";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchProps {
  placeholder?: string;
  button?: boolean
  onSearch?: (val: string) => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ placeholder = "Search for a product...", button, onSearch, value, onChange }: SearchProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl mx-auto group"
    >
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange?.(e);
          onSearch?.(e.target.value);
        }}
      />
     {button && (
       <button type="submit" className="absolute right-2 top-2 bottom-2 btn-gradient text-white px-6 rounded-full font-medium transition-colors">
        Search
      </button>
     )}
    </motion.div>
  );
};