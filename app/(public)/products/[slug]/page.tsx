"use client";

import React, { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Bookmark,
  Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { productAPI } from '@/lib/productAPI';
import { Product } from '@/types/product';
import useToast from '@/lib/useToast';
import { useAuth } from '@/lib/useAuth';

export default function SingleProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState<boolean>(false);
  const { success: showSuccess, error: showError } = useToast();

  // Fetch product details from backend using slug
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let cancelled = false;

    const fetchProduct = async () => {
      try {
        console.log('Fetching product with slug:', slug);

        if (!slug || slug.trim() === '') {
          console.error('Invalid product slug:', slug);
          if (!cancelled) setLoading(false);
          return;
        }

        setLoading(true);

        timeoutId = setTimeout(() => {
          console.log('Product fetch timed out');
          if (!cancelled) setLoading(false);
        }, 10000);

        // Fetch product data by slug
        const productData = await productAPI.getProductBySlug(slug);
        console.log('Product data received:', productData);

        clearTimeout(timeoutId);

        if (!cancelled) {
          setProduct(productData);

          // Check if product is bookmarked
          try {
            const bookmarked = await productAPI.isBookmarked(productData.id);
            if (!cancelled) setIsBookmarked(bookmarked);
          } catch (error: any) {
            if (error?.response?.status === 401) {
              if (!cancelled) setIsBookmarked(false);
            }
          }
        }
      } catch (error: any) {
        console.error('Error fetching product:', error);
        if (timeoutId) clearTimeout(timeoutId);
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
        if (!cancelled) setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await productAPI.addToCart({
        productId: product.id,
        quantity: 1
      });
      showSuccess('Product added to cart successfully!');
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      if (error?.response?.status === 401) {
        showError('Please sign in to add products to your cart');
        router.push('/signin');
      } else {
        const errorMessage = error?.response?.data?.message || error?.message || 'Failed to add product to cart';
        showError(errorMessage);
      }
    }
  };

  const handleBookmarkToggle = async () => {
    if (!product) return;

    setIsBookmarkLoading(true);
    try {
      if (isBookmarked) {
        await productAPI.removeBookmark(product.id);
        setIsBookmarked(false);
      } else {
        await productAPI.addBookmark(product.id);
        setIsBookmarked(true);
      }
      showSuccess(isBookmarked ? 'Bookmark removed successfully!' : 'Added to bookmarks successfully!');
    } catch (error: any) {
      console.error('Error toggling bookmark:', error);
      if (error?.response?.status === 401) {
        showError('Please sign in to bookmark products');
      } else {
        const errorMessage = error?.response?.data?.message || error?.message || (isBookmarked ? 'Failed to remove bookmark' : 'Failed to add bookmark');
        showError(errorMessage);
      }
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  const getProductName = () => {
    if (!product || !product.product_translations || product.product_translations.length === 0) {
      return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return product.product_translations[0].name;
  };

  const getProductDescription = () => {
    if (!product || !product.product_translations || product.product_translations.length === 0) {
      return '';
    }
    return product.product_translations[0].description;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading product...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Product not found</h2>
          <p className="text-gray-500 mt-2">The product &quot;{slug}&quot; does not exist.</p>
          <button
            onClick={() => router.push('/products')}
            className="mt-4 bg-[#706FE4] hover:bg-[#D89AFE] text-white px-6 py-2 rounded-full font-bold"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <button onClick={() => router.push('/products')} className="flex items-center text-sm font-medium text-blue-600 hover:underline mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> View all products
        </button>

        {/* Product Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#1D0E62]">{getProductName()}</h1>
              <p className="text-sm text-gray-500">Product Slug: {product.slug}</p>
            </div>
            {isAuthenticated ? (
              <div className="flex gap-3">
                <button
                  onClick={handleBookmarkToggle}
                  disabled={isBookmarkLoading}
                  className={`p-3 rounded-full border ${
                    isBookmarked
                      ? 'bg-red-50 border-red-200 text-red-500'
                      : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {isBookmarkLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  )}
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-[#706FE4] hover:bg-[#D89AFE] text-white px-8 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Sign in to add to cart or bookmark
              </p>
            )}
          </div>

          {/* Main Product Row */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F9FAFB] text-[10px] uppercase font-bold text-gray-400 border-b">
                <tr>
                  <th className="px-6 py-4">Strength</th>
                  <th className="px-6 py-4">Dosage form and pack size</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Pack price</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b last:border-0">
                  <td className="px-6 py-8">
                    <p className="font-bold text-base text-[#1D0E62]">zinc aspartate</p>
                    <p className="text-sm text-gray-500">30 mg/10 ml</p>
                    <div className="mt-2 text-xs text-gray-500 italic">DB: {product.product_translations && product.product_translations.length > 0 ? product.product_translations[0].name : 'N/A'}</div>
                  </td>
                  <td className="px-6 py-8 text-sm text-gray-600">
                    Solution for Injection<br />5 x 10 ml
                    <div className="mt-1 text-xs text-gray-500 italic">DB: {product.sku || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-8">
                    <span className="px-4 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-bold border border-green-100">
                      Processing
                    </span>
                    <div className="mt-1 text-xs text-gray-500 italic">DB: {product.in_stock ? 'In Stock' : 'Out of Stock'}</div>
                  </td>
                  <td className="px-6 py-8 text-sm font-medium">£19.70</td>
                  <td className="px-6 py-8 text-sm font-medium">2</td>
                  <td className="px-6 py-8 text-sm font-bold">£39.40</td>
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-4">
                      {isAuthenticated ? (
                        <button
                          onClick={handleAddToCart}
                          className="border text-[#706FE4] px-4 py-1.5 rounded-full font-bold text-sm hover:bg-[#706FE4] hover:text-white hover:border-none transition-colors"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic flex items-center gap-1">
                          <Bookmark className="h-3 w-3" />
                          Sign in to purchase
                        </span>
                      )}
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-gray-400 hover:text-[#7C3AED] transition-colors"
                      >
                        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Expandable Technical Specs Section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#FDFDFF] border-t overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
                  {/* Column 1: Static Product Info */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold text-[#1D0E62] uppercase tracking-wider border-b pb-2">Static Product Information</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Brand</p>
                        <p className="text-sm font-bold text-gray-800">Unizink</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Over-labelled</p>
                        <p className="text-sm font-bold text-gray-800">No</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Manufacturer</p>
                        <p className="text-sm font-bold text-gray-800">Kohler</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Product code</p>
                        <p className="text-sm font-bold text-gray-800">1001300</p>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Dynamic Backend Data */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold text-[#1D0E62] uppercase tracking-wider border-b pb-2">Backend Product Information</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Brand ID</p>
                        <p className="text-sm font-bold text-gray-800">
                          {product.brand_id ? `Brand ${product.brand_id}` : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Tax Class ID</p>
                        <p className="text-sm font-bold text-gray-800">
                          {product.tax_class_id ? `Tax Class ${product.tax_class_id}` : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Product Slug</p>
                        <p className="text-sm font-bold text-gray-800">{product.slug}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Virtual Product</p>
                        <p className="text-sm font-bold text-gray-800">{product.is_virtual ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Handling */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold text-[#1D0E62] uppercase tracking-wider border-b pb-2">Licensing & Handling</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Country of license</p>
                        <p className="text-sm font-bold text-gray-800">Germany</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">License holder</p>
                        <p className="text-sm font-bold text-gray-800">Kohler</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">License number</p>
                        <p className="text-sm font-bold text-gray-800">6073335.00.00</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Controlled drug status</p>
                        <p className="text-sm font-bold text-gray-800">
                          {product.is_virtual ? 'Virtual Product' : 'Not Controlled'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Expiry date</p>
                        <p className="text-sm font-bold text-gray-800 leading-tight">Greater than 6 months (excluding UK & Ireland specials)</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Cytotoxic</p>
                        <p className="text-sm font-bold text-gray-800">No</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">Storage</p>
                        <span className="inline-flex items-center px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-black rounded border border-green-200">
                          15-25 °C
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 4: Shortage Information */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold text-[#1D0E62] uppercase tracking-wider border-b pb-2">Shortage Information</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase">Shortage Status</p>
                        <p className="text-sm font-bold text-gray-800">
                          {product.shortage ? (
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-black">Currently in Shortage</span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-black">No Shortage</span>
                          )}
                        </p>
                      </div>
                      {product.shortage_reason && (
                        <div>
                          <p className="text-[11px] font-bold text-gray-400 uppercase">Shortage Reason</p>
                          <p className="text-sm text-gray-700">{product.shortage_reason}</p>
                        </div>
                      )}
                      {product.shortage_start && (
                        <div>
                          <p className="text-[11px] font-bold text-gray-400 uppercase">Shortage Start Date</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {new Date(product.shortage_start).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      )}
                      {product.shortage_end && (
                        <div>
                          <p className="text-[11px] font-bold text-gray-400 uppercase">Expected End Date</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {new Date(product.shortage_end).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      )}
                      {product.alternate && (
                        <div>
                          <p className="text-[11px] font-bold text-gray-400 uppercase">Alternate Product</p>
                          <p className="text-sm font-semibold text-[#7C3AED]">{product.alternate}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}