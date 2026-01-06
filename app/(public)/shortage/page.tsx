"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronsUpDown } from "lucide-react";
import Pagination from "@/components/ui/Pagination";

const SHORTAGE_DATA = [
    {
        inShortage: "rifabutin",
        alternative: "rifabutin (150 mg)",
        form: "Capsule 1 x 100",
        startDate: "August 2025",
        status: "In Shortage"
    },
    {
        inShortage: "Acetylcholine Chloride",
        alternative: "Acetylcholine Chloride (20 mg/2 ml)",
        form: "Eye Drops, Powder and Solvent for Solution 12 x 20 mg/2ml",
        startDate: "October 2025",
        status: "In Shortage"
    },
    {
        inShortage: "acetylcholine chloride",
        alternative: "acetylcholine chloride (20 mg)",
        form: "Powder and Solvent for Solution for Injection for Intraocular use 1 x (6 + 6)",
        startDate: "November 2023",
        status: "In Shortage"
    },
    {
        inShortage: "amylase + lipase + protease",
        alternative: "amylase + lipase + protease (8000 I...",
        form: "Capsule, Hard 1 x 50",
        startDate: "January 2025",
        status: "In Shortage"
    },
    {
        inShortage: "benztropine mesylate",
        alternative: "benztropine mesylate (2 mg/2ml (1...",
        form: "Solution For Injection (Vial) 5 x 2 ml",
        startDate: "October 2025",
        status: "In Shortage"
    }
];

export default function DrugShortagesPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultPerPage] = useState<number>(5)
    const totalPages = 11;
    return (
        <div className="min-h-screen font-sans text-[#1A1A3F] pb-12">
            <header className="mb-12 bg-white py-10">
                <div className="md:w-[70%] m-auto px-6">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-bold mb-8"
                    >
                        UK drug shortages
                    </motion.h1>

                    <div className="space-y-6 text-slate-700 leading-relaxed font-medium">
                        <p>
                            Our UK drug shortages platform provides alternatives to known shortages
                            within the UK, and is updated regularly.
                        </p>
                        <p>
                            The table below contains alternative products which Clinigen have sourced
                            in response to the Department of Health (DoH) shortages database.
                        </p>
                        <p>
                            Clinigen has performed an alternatives assessment on the products below,
                            however it is the prescriber's responsibility to ensure that the product is
                            suitable for their patient.
                        </p>
                        <p>
                            As the below lines are not general stock we are unable to cancel any
                            purchase orders once they have been placed.
                        </p>
                    </div>
                </div>
            </header>
            <div className="max-w-6xl mx-auto px-2">

                {/* Table Section */}
                <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }} className="overflow-x-auto shadow-md rounded-xl border border-gray-200 bg-white mt-16 py-4 px-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[11px] font-black uppercase tracking-widest text-[#4A3AFF] border-b border-slate-100">
                                <th className="pb-4 flex items-center gap-1 cursor-pointer">
                                    IN SHORTAGE <ChevronUp size={14} />
                                </th>
                                <th className="pb-4 px-4 cursor-pointer">
                                    <div className="flex items-center gap-1">ALTERNATIVE <ChevronsUpDown size={14} className="text-slate-400" /></div>
                                </th>
                                <th className="pb-4 px-4">FORM AND PACK SIZE</th>
                                <th className="pb-4 px-4 cursor-pointer">
                                    <div className="flex items-center gap-1">DOH START DATE <ChevronsUpDown size={14} className="text-slate-400" /></div>
                                </th>
                                <th className="pb-4">DOH STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {SHORTAGE_DATA.map((item, idx) => (
                                <motion.tr
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group hover:bg-slate-50/50 transition-colors"
                                >
                                    <td className="py-8 font-bold text-sm pr-4">{item.inShortage}</td>
                                    <td className="py-8 px-4">
                                        <button className="text-[#4A3AFF] font-bold text-sm underline decoration-2 underline-offset-4 hover:text-[#3224c7]">
                                            {item.alternative}
                                        </button>
                                    </td>
                                    <td className="py-8 px-4">
                                        <span className="inline-block border border-slate-200 rounded px-3 py-1 text-[11px] font-bold text-[#4A3AFF] bg-white">
                                            {item.form}
                                        </span>
                                    </td>
                                    <td className="py-8 px-4 text-sm font-medium text-slate-600">{item.startDate}</td>
                                    <td className="py-8 text-sm font-bold text-[#FF8A65]">{item.status}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    resultsPerPage={resultsPerPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    onResultsPerPageChange={(count) => {
                        setResultPerPage(count);
                        setCurrentPage(1);
                    }}
                />
            </div>

        </div>
    );
}