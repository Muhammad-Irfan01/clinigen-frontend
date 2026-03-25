"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MedicineCard } from './MedicineCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { productAPI } from '@/lib/productAPI';
import { Product } from '@/types/product';

export const RecentlyViewed = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch all products and take first few for recently viewed
        const allProducts = await productAPI.getAllProducts();
        // Take first 6 products for demo (in real app, these would be from localStorage/user history)
        setProducts(allProducts.slice(0, 6));
      } catch (error: any) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get current products to display
  const getCurrentProducts = () => {
    const start = currentIndex * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  };

  // Handle next slide
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  // Handle previous slide
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (products.length > itemsPerPage) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [products, itemsPerPage, totalPages]);

  const getProductName = (product: Product) => {
    return product.product_translations?.[0]?.name || 'Unknown Product';
  };

  const getProductDescription = (product: Product) => {
    return product.product_translations?.[0]?.description || product.product_translations?.[0]?.short_description || '';
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#002B49] mb-10">Recently viewed:</h2>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#706FE4]"></div>
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // Don't render section if no products
  }

  return (
    <section className="py-16 bg-[#f7f4f1]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#002B49] mb-10">Recently viewed:</h2>

        {/* Slider Container with Navigation */}
        <div className="relative flex items-center">
          {/* Navigation Arrows - Desktop Left */}
          <button
            onClick={handlePrev}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-[#706FE4] hover:text-white hover:border-[#706FE4] transition-all shrink-0 mr-4"
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Products Grid */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {getCurrentProducts().map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MedicineCard
                      genericName={getProductDescription(product)}
                      brand={getProductName(product).split(' ')[0] || 'Product'}
                      productCode={product.sku || 'N/A'}
                      dosage={product.dosage_form_pack_size || 'N/A'}
                      availability={product.in_stock ? 'In Stock' : 'Out of Stock'}
                      productId={product.id}
                      productSlug={product.slug}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows - Desktop Right */}
          <button
            onClick={handleNext}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-[#706FE4] hover:text-white hover:border-[#706FE4] transition-all shrink-0 ml-4"
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>

          {/* Mobile Navigation Arrows */}
          <div className="flex md:hidden justify-between items-center mt-6">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#706FE4] text-white shadow-md hover:bg-[#5a5bd4] transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === i
                      ? 'bg-[#706FE4] w-8'
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#706FE4] text-white shadow-md hover:bg-[#5a5bd4] transition-colors"
              aria-label="Next products"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Pagination Dots - Desktop */}
        <div className="hidden md:flex justify-center gap-3 mt-12">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full border-2 border-[#706FE4] transition-all ${
                currentIndex === i
                  ? 'bg-[#706FE4]'
                  : 'bg-transparent'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};