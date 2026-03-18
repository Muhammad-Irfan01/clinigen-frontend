"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, Bookmark, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Pagination from '@/components/ui/Pagination';
import { useRouter } from 'next/navigation';
import { productAPI } from '@/lib/productAPI';
import { Product, WishlistItem } from '@/types/product';
import { useProductStore } from '@/store/product.store';
import Image from 'next/image';

function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export default function BookmarksPage() {
  const router = useRouter();
  const { wishlist, fetchWishlist, removeBookmark } = useProductStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage, setResultPerPage] = useState<number>(5);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      await fetchWishlist();
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await removeBookmark(productId);
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const getProductName = (bookmark: WishlistItem) => {
    return bookmark.name || `Product ${bookmark.id}`;
  };

  const bookmarks = wishlist?.items || [];
  const paginatedBookmarks = bookmarks.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const totalPages = Math.ceil(bookmarks.length / resultsPerPage);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">My Bookmarks</h1>
          <p className="text-gray-600">
            {wishlist?.count || 0} {wishlist?.count === 1 ? 'product' : 'products'} bookmarked
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#706FE4]" />
            <span className="ml-3 text-gray-600">Loading bookmarks...</span>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-[#E8E0FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-[#706FE4]" />
            </div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">No bookmarks yet</h2>
            <p className="text-gray-600 mb-6">
              Start bookmarking products to quickly access them later
            </p>
            <button
              onClick={() => router.push('/products')}
              className="inline-flex items-center gap-2 bg-[#706FE4] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#5a5bd4] transition-colors"
            >
              Browse Products
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            {/* Table Headers - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-500">
              <div className="col-span-5">Product Name</div>
              <div className="col-span-2">Program</div>
              <div className="col-span-3">Category</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            {/* Bookmark Rows */}
            <div className="space-y-3">
              <AnimatePresence>
                {paginatedBookmarks.map((bookmark, idx) => (
                  <motion.div
                    key={bookmark.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer p-4 md:px-4 md:py-5"
                    onClick={() => router.push(`/products/${bookmark.slug}`)}
                  >
                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-gray-800 text-base pr-2">{getProductName(bookmark)}</div>
                        <button
                          onClick={(e) => handleRemoveBookmark(bookmark.id, e)}
                          className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                          aria-label="Remove bookmark"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="inline-flex px-3 py-1 bg-[#E8E0FF] text-[#706FE4] rounded-full text-xs font-medium">
                          Access Program
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                        <button
                          className="inline-flex items-center gap-2 bg-linear-to-r from-[#706FE4] to-[#8575E9] text-white px-5 py-2 rounded-lg text-xs font-bold hover:from-[#5F5ED4] hover:to-[#706FE4] transition-all shadow-sm hover:shadow-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/products/${bookmark.slug}`);
                          }}
                        >
                          REQUEST
                        </button>
                        <div className='bg-[#7a6fe4] text-white px-4 py-2 rounded-lg'>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                      {/* Product Name Column */}
                      <div className="col-span-5">
                        <div className="font-bold text-gray-800 text-base">{getProductName(bookmark)}</div>
                      </div>

                      {/* Program Column */}
                      <div className="col-span-2 flex items-center">
                        <span className="inline-flex px-3 py-1 bg-[#E8E0FF] text-[#706FE4] rounded-full text-xs font-medium">
                          Access Program
                        </span>
                      </div>

                      {/* Category Column */}
                      <div className="col-span-3 flex items-center">
                        <span className="text-sm text-gray-600">Medicine</span>
                      </div>

                      {/* Action Column */}
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <button
                          className="inline-flex items-center gap-2 bg-linear-to-r from-[#706FE4] to-[#8575E9] text-white px-5 py-2 rounded-lg text-xs font-bold hover:from-[#5F5ED4] hover:to-[#706FE4] transition-all shadow-sm hover:shadow-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/products/${bookmark.slug}`);
                          }}
                        >
                          REQUEST
                        </button>
                        <button
                          onClick={(e) => handleRemoveBookmark(bookmark.id, e)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          aria-label="Remove bookmark"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
