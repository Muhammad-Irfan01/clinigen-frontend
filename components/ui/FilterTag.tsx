"use client";

import clsx from "clsx";

interface FilterTagProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const FilterTag = ({ label, isActive, onClick }: FilterTagProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 py-1.5 rounded-md border text-sm font-medium transition-all",
        isActive
          ? "border-[#706FE4] bg-[#706FE4] text-white"
          : "border-gray-300 bg-white text-gray-600 hover:border-[#D89AFE]"
      )}
    >
      {label}
    </button>
  );
};