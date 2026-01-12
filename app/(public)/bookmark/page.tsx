"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    X,
    ArrowRight,
    Beaker,
    Clipboard,
    Globe,
    Tag,
    Layers
} from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import { productAPI } from '@/lib/productAPI';
import { WishlistItem, Wishlist } from '@/types/product';
import useToast from '@/lib/useToast';

export default function BookmarksPage() {
    const [activeTab, setActiveTab] = useState<'generics' | 'variants'>('variants');
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultPerPage] = useState<number>(5);
    const [bookmarks, setBookmarks] = useState<Wishlist | null>(null);
    const [loading, setLoading] = useState(true);
    const { error: showError, success: showSuccess } = useToast();

    // Load bookmarks on component mount
    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const bookmarkData = await productAPI.getUserBookmarks();
                setBookmarks(bookmarkData);
            } catch (error: any) {
                showError(error.message || 'Failed to load bookmarks');
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, []);

    const handleRemoveBookmark = async (productId: number) => {
        try {
            await productAPI.removeBookmark(productId);
            // Reload bookmarks after removal
            const updatedBookmarks = await productAPI.getUserBookmarks();
            setBookmarks(updatedBookmarks);
            showSuccess('Item removed from bookmarks');
        } catch (error: any) {
            showError(error.message || 'Failed to remove bookmark');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                <span className="ml-3">Loading bookmarks...</span>
            </div>
        );
    }

    if (!bookmarks) {
        return (
            <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-12 text-[#1A1A1A]">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-black text-[#1D0E62] mb-8">Bookmarks</h1>
                    <div className="p-12 text-center text-gray-500 border rounded-xl bg-white">
                        No bookmarks found. Add products to your bookmarks!
                    </div>
                </div>
            </div>
        );
    }

    // Calculate total pages based on bookmarks count
    const totalPages = Math.ceil(bookmarks.count / resultsPerPage);

    // Calculate start and end indices for pagination
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const paginatedBookmarks = bookmarks.items.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-12 text-[#1A1A1A]">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-black text-[#1D0E62] mb-8">Bookmarks</h1>

                <div className="flex w-full mb-10 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('generics')}
                        className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-all ${activeTab === 'generics'
                                ? 'bg-[#F7F4F2] text-[#1D0E62] border-b-4 border-[#706FE4]'
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        Generics
                    </button>
                    <button
                        onClick={() => setActiveTab('variants')}
                        className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-all ${activeTab === 'variants'
                                ? 'bg-white text-[#1D0E62] border-b-4 border-[#706FE4] shadow-[0_-4px_10px_-5px_rgba(0,0,0,0.05)]'
                                : 'bg-[#F7F4F2] text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        Product Variants
                    </button>
                </div>

                {activeTab === 'variants' && (
                    <div className="space-y-6">
                        {paginatedBookmarks.length === 0 ? (
                            <div className="p-12 text-center text-gray-500 border rounded-xl bg-white">
                                No bookmarks found. Add products to your bookmarks!
                            </div>
                        ) : (
                            paginatedBookmarks.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col md:flex-row overflow-hidden mb-12"
                                >
                                    <div className="flex-2 p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                        <div className="col-span-full">
                                            <h2 className="text-2xl font-black text-[#1D0E62] lowercase">{item.name}</h2>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="text-gray-300"><Beaker size={24} /></div>
                                            <div>
                                                <p className="text-xs font-bold text-[#A5A2BA] uppercase mb-1">Strength</p>
                                                <p className="text-sm text-[#A5A2BA] leading-relaxed">{item.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="text-gray-300"><Tag size={24} /></div>
                                            <div>
                                                <p className="text-xs font-bold text-[#A5A2BA] uppercase mb-1">Brand</p>
                                                <p className="text-sm text-[#A5A2BA]">{item.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="text-gray-300"><Layers size={24} /></div>
                                            <div>
                                                <p className="text-xs font-bold text-[#A5A2BA] uppercase mb-1">Dosage form and pack size</p>
                                                <p className="text-sm text-[#A5A2BA] leading-relaxed">{item.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="text-gray-300"><Globe size={24} /></div>
                                            <div>
                                                <p className="text-xs font-bold text-[#A5A2BA] uppercase mb-1">Country of license</p>
                                                <p className="text-sm text-[#A5A2BA]">{item.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="text-gray-300"><Clipboard size={24} /></div>
                                            <div>
                                                <p className="text-xs font-bold text-[#A5A2BA] uppercase mb-1">Over-labelled</p>
                                                <p className="text-sm text-[#A5A2BA]">{item.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 bg-[#F5F5F5] p-8 flex flex-col justify-between border-l border-gray-100 relative">
                                        <button
                                            onClick={() => handleRemoveBookmark(item.id)}
                                            className="absolute top-4 right-4 text-gray-800 hover:bg-gray-200 p-1 rounded"
                                        >
                                            <X size={20} />
                                        </button>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs font-bold text-[#1D0E62] mb-1">Product code:</p>
                                                <p className="text-sm text-[#1D0E62]">{item.id}</p>
                                            </div>

                                            {!item.createdAt && (
                                                <p className="text-sm font-bold text-red-600">
                                                    Currently unavailable online
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex justify-end mt-8">
                                            <button className="flex items-center gap-3 text-[#706FE4] font-bold text-xs uppercase tracking-widest group">
                                                View
                                                <span className="bg-[#706FE4] text-white p-2 rounded-full group-hover:translate-x-1 transition-transform">
                                                    <ArrowRight size={16} />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                )}

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