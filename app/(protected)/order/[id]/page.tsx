"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown, ChevronUp, Download, Package, Loader2, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { orderAPI } from '@/lib/orderAPI';
import { productAPI } from '@/lib/productAPI';
import { Order } from '@/types/order';
import { useProductStore } from '@/store/product.store';
import useToast from '@/lib/useToast';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { fetchCart } = useProductStore();
    const { success: showSuccess, error: showError } = useToast();
    const [expandedProducts, setExpandedProducts] = useState<Set<number>>(new Set());
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [orderingProduct, setOrderingProduct] = useState<number | null>(null);
    const [orderingAll, setOrderingAll] = useState(false);

    // Fetch order from backend
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const resolvedParams = await params;
                const orderId = resolvedParams.id;
                
                const orderData = await orderAPI.getOrderById(parseInt(orderId));
                setOrder(orderData);
            } catch (error: any) {
                console.error('Error fetching order:', error);
                if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
                    console.log('Authentication required to view order details:', error?.response?.data?.message || 'Unauthorized');
                    setOrder(null);
                } else {
                    console.log('Other error occurred:', error?.response?.data?.message || error.message);
                    setOrder(null);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [params]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading order details...</span>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500">Order not found or access denied</h2>
                    <p className="mt-2 text-gray-600">You may need to log in to view this order.</p>
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => router.push('/signin')}
                            className="bg-[#706FE4] hover:bg-[#D89AFE] text-white px-6 py-2 rounded-full font-bold"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => router.push('/order')}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-full font-bold"
                        >
                            Back to Orders
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    // Calculate VAT (assuming 20% VAT rate)
    const calculateVAT = (amount: number) => {
        return (amount * 0.2).toFixed(2);
    };

    // Toggle product expansion
    const toggleProductExpand = (productId: number) => {
        setExpandedProducts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    };

    // Check if product is expanded
    const isProductExpanded = (productId: number) => {
        return expandedProducts.has(productId);
    };

    // Calculate estimated delivery date (7 business days from order date)
    const getEstimatedDelivery = () => {
        const orderDate = new Date(order.createdAt);
        const deliveryDate = new Date(orderDate);
        let businessDaysAdded = 0;
        
        while (businessDaysAdded < 7) {
            deliveryDate.setDate(deliveryDate.getDate() + 1);
            // Skip weekends (0 = Sunday, 6 = Saturday)
            if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
                businessDaysAdded++;
            }
        }
        
        return deliveryDate.toLocaleDateString('en-GB', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Download invoice handler
    const handleDownloadInvoice = async () => {
        try {
            const response = await orderAPI.downloadInvoice(order.id);
            
            // Create download link
            const blob = response.data;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `invoice-order-${order.id}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            showSuccess('Invoice downloaded successfully!');
        } catch (error: any) {
            console.error('Error downloading invoice:', error);
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to download invoice';
            showError(errorMessage);
        }
    };

    // Handle order again for a single product
    const handleOrderAgain = async (productId: number, quantity: number) => {
        try {
            setOrderingProduct(productId);
            await productAPI.addToCart({ productId, quantity });
            await fetchCart();
            showSuccess('Product added to cart successfully!');
        } catch (error: any) {
            console.error('Error adding product to cart:', error);
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to add product to cart';
            showError(errorMessage);
        } finally {
            setOrderingProduct(null);
        }
    };

    // Handle order all available items
    const handleOrderAllAvailable = async () => {
        try {
            setOrderingAll(true);
            let successCount = 0;
            let errorCount = 0;

            for (const product of order.products) {
                try {
                    await productAPI.addToCart({ productId: product.productId, quantity: product.quantity });
                    successCount++;
                } catch (err) {
                    errorCount++;
                    console.error(`Failed to add product ${product.productId} to cart`);
                }
            }

            await fetchCart();

            if (successCount > 0) {
                showSuccess(`Added ${successCount} product(s) to cart successfully!`);
            }
            if (errorCount > 0) {
                showError(`${errorCount} product(s) could not be added`);
            }
        } catch (error: any) {
            console.error('Error ordering all products:', error);
            showError('Failed to order products');
        } finally {
            setOrderingAll(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F9F9] p-6 md:p-10 font-sans text-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb */}
                <button onClick={() => router.push('/order')} className="flex items-center text-sm font-semibold text-blue-600 hover:underline mb-4">
                    <ChevronLeft className="w-4 h-4 mr-1" /> View orders
                </button>

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-extrabold">Order #{order.id}</h1>

                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <button 
                            onClick={handleDownloadInvoice}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#D1D5DB] text-gray-700 rounded-full font-bold text-sm hover:bg-gray-300 transition-colors flex-1 lg:flex-none"
                        >
                            <Download className="w-4 h-4" /> Download invoice
                        </button>

                        <div className="bg-[#F3E8FF] border border-[#E9D5FF] p-3 rounded-xl flex items-center gap-4 flex-1 lg:flex-none">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <Package className="w-6 h-6 text-[#7C3AED]" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Estimated delivery</p>
                                <p className="text-[#7C3AED] font-bold text-sm">{getEstimatedDelivery()}</p>
                                <p className="text-[10px] text-purple-400 font-medium">
                                    {order.trackingReference ? `Tracking: ${order.trackingReference}` : 'Tracking link pending'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Grid: Delivery Info & Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Delivery Information */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold border-b pb-4 mb-6">Delivery information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-[11px] text-gray-400 font-bold uppercase mb-2">Delivery method:</p>
                                <span className="px-3 py-1 bg-[#F3F4F6] text-gray-600 rounded-full text-xs font-bold italic">
                                    {order.shippingMethod || 'Standard Delivery'}
                                </span>
                            </div>
                            <div>
                                <p className="text-[11px] text-gray-400 font-bold uppercase mb-2">Date submitted:</p>
                                <p className="text-sm font-bold">{formatDate(order.createdAt)}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-[11px] text-gray-400 font-bold uppercase mb-2">Delivery address:</p>
                                <p className="text-sm font-bold">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                <p className="text-sm text-gray-600 font-medium">
                                    {order.shippingAddress.address1}, {order.shippingAddress.city}, {order.shippingAddress.zip}, {order.shippingAddress.country}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-sm border-2 border-black p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-black">Order summary</h2>
                                <ChevronDown className="w-5 h-5 text-purple-700" />
                            </div>
                            <div className="space-y-3 text-sm border-b pb-6">
                                <div className="flex justify-between text-gray-700 font-medium">
                                    <span className="max-w-37.5">Products (see breakdown below)</span>
                                    <span className="font-bold">£{Number(order.subTotal || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700 font-medium">
                                    <span>VAT:</span>
                                    <span className="font-bold">£{calculateVAT(order.subTotal)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-6">
                            <span className="text-xl font-black">Total:</span>
                            <span className="text-2xl font-black">£{Number(order.total || 0).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Product Details Table */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b flex justify-between items-center bg-white">
                        <h2 className="text-lg font-bold">Product details</h2>
                        <button 
                            onClick={handleOrderAllAvailable}
                            disabled={orderingAll}
                            className="bg-[#706FE4] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#5A5BD4] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {orderingAll ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-4 h-4" />
                                    Order available items again
                                </>
                            )}
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        {/* Desktop Table */}
                        <table className="w-full text-left hidden md:table">
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
                                {order.products.map((product) => (
                                    <React.Fragment key={product.id}>
                                        <tr className="border-b last:border-0">
                                            <td className="px-6 py-6">
                                                <p className="font-bold text-sm text-[#1A1A1A]">{product.productName}</p>
                                                <p className="text-xs text-gray-500 font-semibold italic">Strength details</p>
                                            </td>
                                            <td className="px-6 py-6 text-sm text-gray-600 font-medium">
                                                Dosage form and pack size
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="px-4 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-[11px] font-bold border border-green-100">
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-sm font-bold text-gray-600">
                                                £{Number(product.unitPrice || 0).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-6 text-sm font-bold text-gray-600">
                                                {product.quantity}
                                            </td>
                                            <td className="px-6 py-6 text-sm font-black">
                                                £{Number(product.lineTotal || 0).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-4">
                                                    <button 
                                                        onClick={() => handleOrderAgain(product.productId, product.quantity)}
                                                        disabled={orderingProduct === product.productId}
                                                        className="px-5 py-1.5 border-2 border-[#5A5BD4] text-[#5A5BD4] font-bold text-sm rounded-full hover:bg-purple-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                                    >
                                                        {orderingProduct === product.productId ? (
                                                            <>
                                                                <Loader2 className="w-3 h-3 animate-spin" />
                                                                Adding...
                                                            </>
                                                        ) : (
                                                            'Order again'
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => toggleProductExpand(product.productId)}
                                                        className="text-[#5A5BD4]"
                                                    >
                                                        {isProductExpanded(product.productId) ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* Expanded Row Content */}
                                        {isProductExpanded(product.productId) && (
                                            <tr>
                                                <td colSpan={7} className="px-6 py-4 bg-[#FDFDFF]">
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4"
                                                    >
                                                        {/* Col 1 - Product Information */}
                                                        <div className="space-y-4">
                                                            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase border-b pb-2">Product Information</h4>
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Product Name</p>
                                                                    <p className="text-sm font-bold text-gray-800">{product.productName}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Product ID</p>
                                                                    <p className="text-sm font-bold text-gray-800">{product.productId}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Unit Price</p>
                                                                    <p className="text-sm font-bold text-gray-800">£{Number(product.unitPrice || 0).toFixed(2)}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Quantity</p>
                                                                    <p className="text-sm font-bold text-gray-800">{product.quantity}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Col 2 - Order Information */}
                                                        <div className="space-y-4">
                                                            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase border-b pb-2">Order Information</h4>
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Customer Email</p>
                                                                    <p className="text-sm font-bold text-gray-800">{order.customerEmail}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Customer Name</p>
                                                                    <p className="text-sm font-bold text-gray-800">{order.customerName}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Payment Method</p>
                                                                    <p className="text-sm font-bold text-gray-800">{order.paymentMethod}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Currency</p>
                                                                    <p className="text-sm font-bold text-gray-800">{order.currency}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Col 3 - Shipping Information */}
                                                        <div className="space-y-4">
                                                            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase border-b pb-2">Shipping Information</h4>
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Shipping Method</p>
                                                                    <p className="text-sm font-bold text-gray-800">{order.shippingMethod || 'Standard Delivery'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Shipping Address</p>
                                                                    <p className="text-sm font-bold text-gray-800">
                                                                        {order.shippingAddress?.address1}, {order.shippingAddress?.city}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Order Status</p>
                                                                    <p className="text-sm font-bold text-gray-800">{order.status}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Order Date</p>
                                                                    <p className="text-sm font-bold text-gray-800">{formatDate(order.createdAt)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobile Card Layout */}
                        <div className="md:hidden p-4 space-y-4">
                            {order.products.map((product) => (
                                <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                                    {/* Product Name */}
                                    <div>
                                        <p className="font-bold text-lg text-[#1A1A1A]">{product.productName}</p>
                                        <p className="text-xs text-gray-500 font-semibold italic mt-1">Strength details</p>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-semibold text-gray-500">Status</span>
                                            <span className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-bold">
                                                {order.status}
                                            </span>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span className="text-sm font-semibold text-gray-500">Pack Price</span>
                                            <span className="text-sm font-bold text-[#1A1A1A]">£{Number(product.unitPrice || 0).toFixed(2)}</span>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span className="text-sm font-semibold text-gray-500">Quantity</span>
                                            <span className="text-sm text-gray-700">{product.quantity}</span>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span className="text-sm font-semibold text-gray-500">Total</span>
                                            <span className="text-sm font-black text-[#1A1A1A]">£{Number(product.lineTotal || 0).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <button 
                                            onClick={() => handleOrderAgain(product.productId, product.quantity)}
                                            disabled={orderingProduct === product.productId}
                                            className="bg-[#706FE4] hover:bg-[#5A5BD4] text-white px-5 py-2 rounded-full font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {orderingProduct === product.productId ? (
                                                <>
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                    Adding...
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-3 h-3" />
                                                    Order again
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => toggleProductExpand(product.productId)}
                                            className="text-[#5A5BD4] p-2"
                                        >
                                            {isProductExpanded(product.productId) ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                        </button>
                                    </div>

                                    {/* Expanded Content - Mobile */}
                                    <AnimatePresence>
                                        {isProductExpanded(product.productId) && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="border-t pt-4 space-y-4"
                                            >
                                                {/* Product Information */}
                                                <div>
                                                    <h4 className="text-xs font-bold text-[#1A1A1A] uppercase border-b pb-2 mb-3">Product Information</h4>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Product Name</span>
                                                            <span className="text-sm font-bold text-gray-800">{product.productName}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Product ID</span>
                                                            <span className="text-sm font-bold text-gray-800">{product.productId}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Unit Price</span>
                                                            <span className="text-sm font-bold text-gray-800">£{Number(product.unitPrice || 0).toFixed(2)}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Quantity</span>
                                                            <span className="text-sm font-bold text-gray-800">{product.quantity}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Order Information */}
                                                <div>
                                                    <h4 className="text-xs font-bold text-[#1A1A1A] uppercase border-b pb-2 mb-3">Order Information</h4>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Customer Email</span>
                                                            <span className="text-sm font-bold text-gray-800">{order.customerEmail}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Customer Name</span>
                                                            <span className="text-sm font-bold text-gray-800">{order.customerName}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Payment Method</span>
                                                            <span className="text-sm font-bold text-gray-800">{order.paymentMethod}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Currency</span>
                                                            <span className="text-sm font-bold text-gray-800">{order.currency}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Shipping Information */}
                                                <div>
                                                    <h4 className="text-xs font-bold text-[#1A1A1A] uppercase border-b pb-2 mb-3">Shipping Information</h4>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Shipping Method</span>
                                                            <span className="text-sm font-bold text-gray-800">{order.shippingMethod || 'Standard Delivery'}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Shipping Address</span>
                                                            <span className="text-sm font-bold text-gray-800">
                                                                {order.shippingAddress?.address1}, {order.shippingAddress?.city}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Order Status</span>
                                                            <span className="text-sm font-bold text-gray-800">{order.status}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Order Date</span>
                                                            <span className="text-sm font-bold text-gray-800">{formatDate(order.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}