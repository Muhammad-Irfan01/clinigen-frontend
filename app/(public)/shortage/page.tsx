"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Check, ChevronRight, ExternalLink, Loader2, ShoppingCart, Bookmark } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { productAPI } from "@/lib/productAPI";
import { Product } from "@/types/product";
import { useAuth } from "@/lib/useAuth";
import useToast from "@/lib/useToast";

interface ProductInfoCardProps {
    product: Product;
    onAddToCart: () => void;
    isAddingToCart: boolean;
}

const ProductInfoCard: React.FC<ProductInfoCardProps> = ({ product, onAddToCart, isAddingToCart }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const productName = product.product_translations?.[0]?.name || product.slug;
    const packPrice = product.selling_price || product.price || '0';

    return (
        <div className="bg-white p-6 lg:p-8 hover:border border-[#501ece80]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side - Product Information */}
                <div className="lg:col-span-2">
                    <h3 className="text-sm font-bold text-[#1A1A3F] mb-6 pb-2 border-b border-gray-200">
                        Product reference Information
                    </h3>

                    {/* Product Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                        <div>
                            <p className="text-xs font-semibold text-[#1A1A3F] mb-1">Expiry date</p>
                            <p className="text-sm text-gray-600">{product.expiry_date || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#1A1A3F] mb-1">Controlled drug status</p>
                            <p className="text-sm text-gray-600">{product.controlled_drug_status || 'Not Controlled'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#1A1A3F] mb-1">License number</p>
                            <p className="text-sm text-gray-600">{product.license_number || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#1A1A3F] mb-1">Storage</p>
                            <p className="text-sm text-gray-600">{product.storage || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#1A1A3F] mb-1">Cytotoxic</p>
                            <p className="text-sm text-gray-600">{product.cytotoxic ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#1A1A3F] mb-1">License holder</p>
                            <p className="text-sm text-gray-600">{product.license_holder || 'N/A'}</p>
                        </div>
                    </div>

                    {/* Available Documents */}
                    <div className="mb-4">
                        <p className="text-xs font-semibold text-[#1A1A3F] mb-2">Available documents</p>
                        <p className="text-sm text-gray-600 mb-1">SmPC, PIL, CoA (Log in to view full list)</p>
                        <a href="#" className="text-sm text-[#706FE4] underline hover:text-[#5a5bd4]">
                            Log in to view documents
                        </a>
                    </div>
                </div>

                {/* Right Side - Pack Price Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-300 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                            <span className="text-xs font-semibold text-[#1A1A3F]">Pack price</span>
                            <span className="text-sm font-bold text-[#1A1A3F]">£{packPrice}</span>
                        </div>

                        {isAuthenticated ? (
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Enter quantity</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#706FE4]"
                                        placeholder="0"
                                        min="1"
                                        defaultValue={1}
                                    />
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-400">Subtotal</span>
                                    <span className="text-sm font-medium text-[#1A1A3F]">£{packPrice}</span>
                                </div>

                                <button 
                                    onClick={onAddToCart}
                                    disabled={isAddingToCart}
                                    className="w-full bg-[#706FE4] text-white py-2.5 rounded-full text-sm font-bold hover:bg-[#5a5bd4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isAddingToCart ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="h-4 w-4" />
                                            Add to Cart
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="text-center py-4">
                                    <p className="text-sm text-gray-500 mb-3">Sign in to view price and order</p>
                                    <button 
                                        onClick={() => router.push('/signin')}
                                        className="w-full bg-[#706FE4] text-white py-2.5 rounded-full text-sm font-bold hover:bg-[#5a5bd4] transition-colors"
                                    >
                                        Log in to order
                                    </button>
                                    <a 
                                        href="/signup" 
                                        className="block text-center text-xs text-[#706FE4] underline hover:text-[#5a5bd4] mt-2"
                                    >
                                        Sign up for an account
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ShortageProduct {
    id: number;
    inShortage: string;
    alternative: string;
    form: string;
    startDate: string;
    status: string;
    product: Product;
}

export default function DrugShortagesPage() {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [shortageProducts, setShortageProducts] = useState<ShortageProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [addingToCart, setAddingToCart] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
    const { isAuthenticated } = useAuth();
    const { success: showSuccess, error: showError } = useToast();
    const router = useRouter();

    // Fetch shortage products from API
    useEffect(() => {
        const fetchShortageProducts = async () => {
            try {
                setLoading(true);
                // Fetch products from shortage endpoint
                const response = await productAPI.getShortageProducts({ limit: 10, page: currentPage });

                const mappedProducts: ShortageProduct[] = response.data.map((product) => {
                    // Get the first alternative product from shortage_alternatives
                    const shortageAlt = product.shortage_alternatives_shortage_alternatives_product_idToproducts?.[0];
                    const alternativeProduct = shortageAlt?.products_shortage_alternatives_alternative_product_idToproducts;

                    return {
                        id: product.id,
                        inShortage: product.product_translations?.[0]?.name || product.slug,
                        alternative: alternativeProduct
                            ? alternativeProduct.product_translations?.[0]?.name || alternativeProduct.slug
                            : 'No alternative available',
                        form: product.dosage_form_pack_size || product.sku || 'N/A',
                        startDate: product.shortage_start_date
                            ? new Date(product.shortage_start_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
                            : 'N/A',
                        status: product.is_shortage ? 'Current' : 'Resolved',
                        product: product,
                    };
                });

                setShortageProducts(mappedProducts);
                setPagination(response.meta);
            } catch (error: any) {
                console.error('Error fetching shortage products:', error);
                showError('Failed to fetch shortage products');
            } finally {
                setLoading(false);
            }
        };

        fetchShortageProducts();
    }, [currentPage]);

    const toggleRow = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const handleAddToCart = async (productId: number) => {
        if (!isAuthenticated) {
            router.push('/signin');
            return;
        }

        setAddingToCart(productId);
        try {
            await productAPI.addToCart({
                productId,
                quantity: 1,
            });
            showSuccess('Product added to cart successfully!');
        } catch (error: any) {
            console.error('Error adding to cart:', error);
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to add product to cart';
            showError(errorMessage);
        } finally {
            setAddingToCart(null);
        }
    };

    return (
        <div className="min-h-screen font-sans bg-[#FAF8F5] pb-12">
            {/* Hero Section */}
            <section className="bg-linear-to-r from-[#F5F3FF] via-white to-[#FFF9F5] py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Headings */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-[#706FE4] text-white px-4 py-2 rounded-full text-sm font-bold">
                                <span>UK Drug Shortages</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl lg:text-5xl font-bold text-[#0F2544] leading-tight">
                                Helping You Navigate<br />
                                UK Drug Shortages
                            </h1>

                            {/* Subheading */}
                            <p className="text-3xl lg:text-4xl font-light text-[#5B6B7A]">
                                Find Reliable<br />
                                Drug Alternatives
                            </p>
                        </motion.div>

                        {/* Right Column - Description & Key Areas */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Description */}
                            <p className="text-[#5B6B7A] leading-relaxed">
                                The Halo Direct UK Drug Shortages platform provides regularly updated
                                information on medicines experiencing supply issues across the UK, along
                                with available alternative options to support continued patient care.
                            </p>

                            {/* Key Areas Section */}
                            <div>
                                <h2 className="text-base font-bold text-[#0F2544] mb-4">
                                    Key Areas We Focus On
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {["Alternative Medicines Available", "Regularly Updated Database", "Clinically Assessed Alternatives", "Prescriber Responsibility", "Special Supply Notice"].map((area, index) => (
                                        <motion.div
                                            key={area}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Check className="w-4 h-4 text-[#706FE4] shrink-0" />
                                            <span className="text-sm font-medium text-[#5B6B7A]">
                                                {area}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Table Section */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="overflow-x-auto"
                >
                    {/* Table Header - Desktop */}
                    <div className="bg-[#F5F2EE] rounded-t-lg hidden lg:block">
                        <div className="grid grid-cols-[1.5fr_2fr_2fr_1fr_1fr_0.5fr] gap-0">
                            <div className="py-4 px-4 text-left">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-semibold text-[#1A1A3F]">In Shortage</span>
                                    <ChevronUp size={12} className="text-[#1A1A3F]" />
                                </div>
                            </div>
                            <div className="py-4 px-4 text-left">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-semibold text-[#1A1A3F]">Alternative</span>
                                    <ChevronDown size={12} className="text-[#1A1A3F]" />
                                </div>
                            </div>
                            <div className="py-4 px-4 text-left">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-semibold text-[#1A1A3F]">Dosage form and pack size</span>
                                    <ChevronDown size={12} className="text-[#1A1A3F]" />
                                </div>
                            </div>
                            <div className="py-4 px-4 text-left">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-semibold text-[#1A1A3F]">Start date</span>
                                    <ChevronDown size={12} className="text-[#1A1A3F]" />
                                </div>
                            </div>
                            <div className="py-4 px-4 text-left">
                                <span className="text-xs font-semibold text-[#1A1A3F]">Status</span>
                            </div>
                            <div className="py-4 px-4 text-center">
                                <span className="text-xs font-semibold text-[#1A1A3F]"></span>
                            </div>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="space-y-2">
                        {loading ? (
                            <div className="text-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#706FE4]" />
                                <p className="text-sm text-gray-500 mt-2">Loading shortage products...</p>
                            </div>
                        ) : shortageProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-sm text-gray-500">No shortage products available</p>
                            </div>
                        ) : (
                            shortageProducts.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    {/* Main Row - Desktop */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`hidden lg:grid lg:grid-cols-[1.5fr_2fr_2fr_1fr_1fr_0.5fr] gap-0 rounded-lg overflow-hidden bg-white hover:border border-[#501ece80] transition-colors cursor-pointer`}
                                        onClick={() => toggleRow(item.id)}
                                    >
                                        <div className="py-4 px-4">
                                            <span className={`text-sm font-bold text-[#1A1A3F]`}>
                                                {item.inShortage}
                                            </span>
                                        </div>
                                        <div className="py-4 px-4">
                                            <span className="text-sm text-gray-600">{item.alternative}</span>
                                        </div>
                                        <div className="py-4 px-4">
                                            <span className="text-sm text-gray-600">{item.form}</span>
                                        </div>
                                        <div className="py-4 px-4">
                                            <span className="text-sm text-gray-600">{item.startDate}</span>
                                        </div>
                                        <div className="py-4 px-4">
                                            <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-full">
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="py-4 px-4 text-center">
                                            <motion.div
                                                animate={{ rotate: expandedRow === item.id ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#706FE4] text-white"
                                            >
                                                <ChevronDown size={14} />
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Main Row - Mobile */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`lg:hidden bg-white rounded-lg overflow-hidden p-4 hover:bg-[#F5F2EE] transition-colors cursor-pointer`}
                                        onClick={() => toggleRow(item.id)}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <span className={`text-sm ${item.inShortage.toLowerCase() === item.inShortage ? "font-medium" : "font-bold"} text-[#1A1A3F]`}>
                                                    {item.inShortage}
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">{item.alternative}</p>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: expandedRow === item.id ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#706FE4] text-white flex-shrink-0"
                                            >
                                                <ChevronDown size={14} />
                                            </motion.div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="inline-block px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-full">
                                                {item.status}
                                            </span>
                                            <span className="text-xs text-gray-500">{item.startDate}</span>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">{item.form}</p>
                                    </motion.div>

                                    {/* Expanded Row - Product Information */}
                                    <AnimatePresence>
                                        {expandedRow === item.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-white rounded-b-lg overflow-hidden"
                                            >
                                                <ProductInfoCard 
                                                    product={item.product} 
                                                    onAddToCart={() => handleAddToCart(item.id)}
                                                    isAddingToCart={addingToCart === item.id}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </React.Fragment>
                            ))
                        )}
                    </div>
                    <div className="bg-white rounded-b-lg border-t border-gray-100"></div>
                </motion.div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <span className="text-sm font-medium text-[#1A1A3F]">Page</span>
                    <div className="flex items-center gap-2">
                        <select
                            value={currentPage}
                            onChange={(e) => setCurrentPage(Number(e.target.value))}
                            className="border border-gray-300 rounded px-3 py-1.5 text-sm font-medium text-[#1A1A3F] focus:outline-none focus:border-[#706FE4]"
                        >
                            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                                <option key={page} value={page}>
                                    {page}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm text-gray-500">of {pagination.pages || 1}</span>
                    </div>
                    <button 
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, pagination.pages))}
                        disabled={currentPage >= pagination.pages}
                        className="text-sm font-medium text-[#706FE4] hover:text-[#5a5bd4] underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </section>

            {/* Bottom Information Section */}
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#706FE4]/10 rounded-full blur-2xl"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#F5F2EE] rounded-full blur-2xl"></div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
