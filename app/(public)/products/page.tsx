"use client";

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ArrowRight, Loader2, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Pagination from '@/components/ui/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { productAPI } from '@/lib/productAPI';
import { Product, SearchProductsParams } from '@/types/product';
import Image from 'next/image';

const THERAPEUTIC_AREAS = [
  "Alimentary Tract and Metabolism", "Antiinfectives for Systemic Use",
  "Antineoplastic and Immunomodulating Agents", "Antiparasitic Products, Insecticides and Repellents",
  "Blood and Blood-Forming Organs", "Cardiovascular System", "Dermatologicals"
];

const ProductCatalogue = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage, setResultPerPage] = useState<number>(5);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Initialize from URL params
  useEffect(() => {
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');

    setSearchTerm(query);
    setCurrentPage(page);
    setResultPerPage(limit);
  }, [searchParams]);

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let response;
        if (searchTerm.trim()) {
          const searchParams: SearchProductsParams = {
            q: searchTerm || undefined,
            page: currentPage,
            limit: resultsPerPage,
          };

          if (priceRange[0] > 0) searchParams.minPrice = priceRange[0];
          if (priceRange[1] < 10000) searchParams.maxPrice = priceRange[1];

          if (selectedCategories.length > 0) {
            searchParams.category = selectedCategories[0];
          }

          response = await productAPI.searchProducts(searchParams);
          setProducts(response.data);
          setTotalPages(response.meta.pages);
        } else {
          const allProducts = await productAPI.getAllProducts();
          const startIndex = (currentPage - 1) * resultsPerPage;
          const endIndex = startIndex + resultsPerPage;
          const paginatedProducts = allProducts.slice(startIndex, endIndex);

          setProducts(paginatedProducts);
          setTotalPages(Math.ceil(allProducts.length / resultsPerPage));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, currentPage, resultsPerPage, selectedAreas, priceRange, selectedAvailability, selectedCategories]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (searchTerm && currentPage > 1) params.set('page', currentPage.toString());
    if (searchTerm && resultsPerPage !== 5) params.set('limit', resultsPerPage.toString());

    router.push(`/products?${params.toString()}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, currentPage, resultsPerPage, JSON.stringify(selectedAreas), priceRange[0], priceRange[1], JSON.stringify(selectedAvailability), JSON.stringify(selectedCategories)]);

  const getProductName = (product: Product) => {
    return product.product_translations && product.product_translations.length > 0
      ? product.product_translations[0].name
      : `Product ${product.id}`;
  };

  const getProductDescription = (product: Product) => {
    return product.product_translations && product.product_translations.length > 0
      ? product.product_translations[0].short_description || product.product_translations[0].description
      : '';
  };

  const getProductCategory = (product: Product) => {
    if (product.product_categories && product.product_categories.length > 0) {
      const category = product.product_categories[0].categories;
      return category.name || category.slug || 'N/A';
    }
    return 'N/A';
  };

  const toggleTherapeuticArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const toggleAvailability = (availability: string) => {
    if (selectedAvailability.includes(availability)) {
      setSelectedAvailability(selectedAvailability.filter(a => a !== availability));
    } else {
      setSelectedAvailability([...selectedAvailability, availability]);
    }
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearAllFilters = () => {
    setSelectedAreas([]);
    setSelectedAvailability([]);
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setIsExpanded(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      <div className="max-w-7xl mx-auto py-12 px-6">

        {/* --- Filter Section --- */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Advanced Filter Dropdown Button */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-4 py-3 bg-[#706FE4] text-white font-medium text-sm hover:bg-[#5F5ED4] transition-colors"
            >
              Advanced Filter
              <ChevronDown size={16} className={clsx("transition-transform", showFilter && "rotate-180")} />
            </button>

            {/* Search Bar */}
            <div className="flex-1 p-3 flex items-center">
              <div className="relative flex-1 flex items-center">
                <div className="absolute left-3 text-[#706FE4]">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search by generic or brand name"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#706FE4] focus:ring-1 focus:ring-[#706FE4]"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button className="absolute right-1 bg-[#706FE4] hover:bg-[#5F5ED4] text-white p-1.5 rounded-md transition-colors">
                  <Search size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filter Panel */}
          <AnimatePresence>
            {showFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 space-y-6 bg-gray-50 border-t">
                  <div>
                    <div className="flex justify-between mb-4">
                      <h3 className="text-xs font-bold tracking-widest uppercase text-gray-700">Availability</h3>
                      <button
                        onClick={clearAllFilters}
                        className="text-[#706FE4] text-sm font-medium hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Access Program", "Available", "Available On Request"].map(f => (
                        <button
                          key={f}
                          onClick={() => toggleAvailability(f)}
                          className={clsx(
                            "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                            selectedAvailability.includes(f)
                              ? "bg-[#706FE4] text-white border-[#706FE4]"
                              : "bg-white text-gray-600 border-gray-300 hover:border-[#706FE4]"
                          )}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-gray-700 mb-4">Therapeutic Area</h3>
                    <div className="flex flex-wrap gap-2">
                      {THERAPEUTIC_AREAS.map(area => (
                        <button
                          key={area}
                          onClick={() => toggleTherapeuticArea(area)}
                          className={clsx(
                            "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                            selectedAreas.includes(area)
                              ? "bg-[#706FE4] text-white border-[#706FE4]"
                              : "bg-white text-gray-600 border-gray-300 hover:border-[#706FE4]"
                          )}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-gray-700 mb-4">Price Range</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Min: £{priceRange[0]}</span>
                        <span>Max: £{priceRange[1]}</span>
                      </div>
                      <div className="flex gap-4">
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                          className="w-full accent-[#706FE4]"
                        />
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full accent-[#706FE4]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- Product List Section --- */}
        <div className="mt-8">
          {/* Table Headers */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-500">
            <div className="col-span-5">Product Name</div>
            <div className="col-span-2">Program</div>
            <div className="col-span-3">Therapeutic Area</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Product Rows */}
          <div className="space-y-3">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#706FE4]" />
                <span className="ml-3 text-gray-600">Loading products...</span>
              </div>
            ) : products.length > 0 ? (
              <AnimatePresence>
                {products.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="grid grid-cols-12 gap-4 px-4 py-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => router.push(`/products/${product.slug}`)}
                  >
                    {/* Product Name Column */}
                    <div className="col-span-5">
                      <div className="font-bold text-gray-800 text-base">{getProductName(product)}</div>
                      {getProductDescription(product) && (
                        <div className="text-sm text-gray-500 mt-1">{getProductDescription(product)}</div>
                      )}
                    </div>

                    {/* Program Column */}
                    <div className="col-span-2 flex items-center">
                      <span className="inline-flex px-3 py-1 bg-[#E8E0FF] text-[#706FE4] rounded-full text-xs font-medium">
                        Access Program
                      </span>
                    </div>

                    {/* Therapeutic Area Column */}
                    <div className="col-span-3 flex items-center">
                      <span className="text-sm text-gray-600">{getProductCategory(product)}</span>
                    </div>

                    {/* Action Column */}
                    <div className="col-span-2 flex items-center justify-end">
                      <button
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#706FE4] to-[#8575E9] text-white px-5 py-2 rounded-full text-xs font-bold hover:from-[#5F5ED4] hover:to-[#706FE4] transition-all shadow-sm hover:shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/products/${product.slug}`);
                        }}
                      >
                        REQUEST
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No products found
              </div>
            )}
          </div>
        </div>

        {/* --- Pagination --- */}
        {!loading && products.length > 0 && (
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
      </div>
       <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0F2544] leading-tight">
                            Stay Updated with<br />
                            <span className="text-[#706FE4]">Real-Time Shortage Information</span>
                        </h2>
                        
                        <p className="text-[#5B6B7A] leading-relaxed text-lg">
                            Our platform provides healthcare professionals across the UK with 
                            up-to-date information on medicine shortages, ensuring you can make 
                            informed decisions for your patients.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#706FE4] flex items-center justify-center flex-shrink-0 mt-1">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1A1A3F]">Daily Updates</h3>
                                    <p className="text-sm text-gray-600">Shortage data updated daily from official sources</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#706FE4] flex items-center justify-center flex-shrink-0 mt-1">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1A1A3F]">Verified Alternatives</h3>
                                    <p className="text-sm text-gray-600">Clinically assessed alternative medicines</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#706FE4] flex items-center justify-center flex-shrink-0 mt-1">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1A1A3F]">Nationwide Coverage</h3>
                                    <p className="text-sm text-gray-600">Complete coverage across all UK regions</p>
                                </div>
                            </div>
                        </div>

                        <button className="mt-4 bg-[#706FE4] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#5a5bd4] transition-colors inline-flex items-center gap-2">
                            Learn More
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/shortage.jpg"
                                alt="Healthcare professional checking medicine shortage information"
                                width={600}
                                height={500}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#706FE4]/10 rounded-full blur-2xl"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#F5F2EE] rounded-full blur-2xl"></div>
                    </motion.div>
                </div>
            </section>
    </div>
  );
};

export default ProductCatalogue;