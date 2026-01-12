"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown, ChevronUp, Download, Package, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { orderAPI } from '@/lib/orderAPI';
import { Order } from '@/types/order';

// Static mock data structure based on the original frontend
const STATIC_ORDERS = [
    { id: '10535700', po: '10535700', patient: '--', product: 'Uniznik - zinc aspartat...', cost: '£47.28', date: '08/Dec/2025', status: 'Processing' },
    { id: '10531425', po: '10531425', patient: '--', product: 'Uniznik - zinc aspartat...', cost: '£118.20', date: '26/Nov/2025', status: 'Shipped' },
    { id: '10526297', po: '10526297', patient: '--', product: 'Uniznik - zinc aspartat...', cost: '£118.20', date: '12/Nov/2025', status: 'Shipped' },
    { id: '10472068', po: 'Kenacort', patient: '--', product: 'Kenacort Retard - tria...', cost: '£902.81', date: '16/Jun/2025', status: 'Shipped' },
    { id: '10470697', po: 'Kenalog', patient: '--', product: 'Kenalog...', cost: '£36.00', date: '11/Jun/2025', status: 'Shipped' },
];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [isProductExpanded, setIsProductExpanded] = useState(true);
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isStaticOrder, setIsStaticOrder] = useState<boolean>(false);

    // Determine if the order ID is from static data or dynamic data
    useEffect(() => {
        const fetchParams = async () => {
            const resolvedParams = await params;
            const orderId = resolvedParams.id;

            // Check if this is a static order ID
            const staticOrder = STATIC_ORDERS.find(staticOrder => staticOrder.id === orderId);

            if (staticOrder) {
                // Handle static order
                setIsStaticOrder(true);
                setLoading(false);

                // Create a mock order object based on static data
                const mockOrder: Order = {
                    id: parseInt(orderId) || 0,
                    customerEmail: 'mock@example.com',
                    customerPhone: '000-000-0000',
                    customerName: 'Mock Customer',
                    billingAddress: {
                        firstName: 'Mock',
                        lastName: 'Customer',
                        address1: '123 Mock Street',
                        city: 'Mock City',
                        state: 'Mock State',
                        zip: 'MOCK 123',
                        country: 'UK'
                    },
                    shippingAddress: {
                        firstName: 'Mock',
                        lastName: 'Customer',
                        address1: '123 Mock Street',
                        city: 'Mock City',
                        state: 'Mock State',
                        zip: 'MOCK 123',
                        country: 'UK'
                    },
                    subTotal: parseFloat(staticOrder.cost.replace('£', '')) || 0,
                    shippingCost: 0,
                    discount: 0,
                    total: parseFloat(staticOrder.cost.replace('£', '')) || 0,
                    paymentMethod: 'Credit Card',
                    currency: 'GBP',
                    currencyRate: 1,
                    locale: 'en',
                    status: staticOrder.status,
                    note: 'This is a sample order for demonstration purposes.',
                    createdAt: new Date(staticOrder.date).toISOString(),
                    updatedAt: new Date().toISOString(),
                    products: [{
                        id: 1,
                        productId: 1,
                        productName: staticOrder.product,
                        unitPrice: parseFloat(staticOrder.cost.replace('£', '')) / 2 || 23.64,
                        quantity: 2,
                        lineTotal: parseFloat(staticOrder.cost.replace('£', '')) || 47.28
                    }],
                    transaction: null
                };

                setOrder(mockOrder);
            } else {
                // Handle dynamic order - fetch from backend
                const fetchOrder = async () => {
                    try {
                        setLoading(true);
                        const orderData = await orderAPI.getOrderById(parseInt(orderId));
                        setOrder(orderData);
                    } catch (error: any) {
                        console.error('Error fetching order:', error);
                        // Check for unauthorized error (401) and handle appropriately
                        if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
                            // Show unauthorized message instead of redirecting
                            console.log('Authentication required to view order details:', error?.response?.data?.message || 'Unauthorized');
                            // Set order to null to trigger the "Order not found or access denied" message
                            setOrder(null);
                        } else {
                            // For other errors, also set order to null
                            console.log('Other error occurred:', error?.response?.data?.message || error.message);
                            setOrder(null);
                        }
                    } finally {
                        setLoading(false);
                    }
                };

                if (orderId) {
                    fetchOrder();
                }
            }
        };

        fetchParams();
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

    return (
        <div className="min-h-screen bg-[#F9F9F9] p-6 md:p-10 font-sans text-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb */}
                <button onClick={() => router.push('/order')} className="flex items-center text-sm font-semibold text-blue-600 hover:underline mb-4">
                    <ChevronLeft className="w-4 h-4 mr-1" /> View orders
                </button>

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-extrabold">Order {order.id || "10535700"} {isStaticOrder ? "(Static Data)" : "(Dynamic Data)"}</h1>

                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#D1D5DB] text-gray-700 rounded-full font-bold text-sm hover:bg-gray-300 transition-colors flex-1 lg:flex-none">
                            <Download className="w-4 h-4" /> Download invoice
                        </button>

                        <div className="bg-[#F3E8FF] border border-[#E9D5FF] p-3 rounded-xl flex items-center gap-4 flex-1 lg:flex-none">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <Package className="w-6 h-6 text-[#7C3AED]" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Estimated delivery</p>
                                <p className="text-[#7C3AED] font-bold text-sm">Friday, Jan 16</p>
                                <p className="text-[10px] text-purple-400 font-medium">Tracking link pending</p>
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
                                <div className="text-xs text-gray-500 italic mt-1">{isStaticOrder ? 'STATIC: Not available' : 'DB: Available'}</div>
                            </div>
                            <div>
                                <p className="text-[11px] text-gray-400 font-bold uppercase mb-2">Date submitted:</p>
                                <p className="text-sm font-bold">{formatDate(order.createdAt)}</p>
                                <p className="text-xs text-gray-500 italic">{isStaticOrder ? 'STATIC: Sample date' : 'DB: Actual date'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-[11px] text-gray-400 font-bold uppercase mb-2">Delivery address:</p>
                                <p className="text-sm font-bold">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                <p className="text-sm text-gray-600 font-medium">
                                    {order.shippingAddress.address1}, {order.shippingAddress.city}, {order.shippingAddress.zip}, {order.shippingAddress.country}
                                </p>
                                <p className="text-xs text-gray-500 italic">{isStaticOrder ? 'STATIC: Sample address' : 'DB: Actual address'}</p>
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
                                <div className="text-xs text-gray-500 italic">{isStaticOrder ? 'STATIC: Sample calculation' : 'DB: Actual calculation'}</div>
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
                        <button className="bg-[#7C3AED] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#6D28D9] transition-all">
                            Order available items again
                        </button>
                    </div>

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
                                {order.products.map((product, index) => (
                                    <tr key={product.id} className="border-b last:border-0">
                                        <td className="px-6 py-6">
                                            <p className="font-bold text-sm text-[#1A1A1A]">{product.productName}</p>
                                            <p className="text-xs text-gray-500 font-semibold italic">30 mg/10 ml</p>
                                            <div className="text-xs text-gray-500 italic">{isStaticOrder ? 'STATIC: Sample data' : 'DB: Actual data'}</div>
                                        </td>
                                        <td className="px-6 py-6 text-sm text-gray-600 font-medium">
                                            Solution for Injection<br />5 x 10 ml
                                            <div className="text-xs text-gray-500 italic">{isStaticOrder ? 'STATIC: Sample data' : 'DB: Actual data'}</div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="px-4 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-[11px] font-bold border border-green-100">
                                                {order.status}
                                            </span>
                                            <div className="text-xs text-gray-500 italic">{isStaticOrder ? 'STATIC: Sample status' : 'DB: Actual status'}</div>
                                        </td>
                                        <td className="px-6 py-6 text-sm font-bold text-gray-600">
                                            £{Number(product.unitPrice || 0).toFixed(2)}
                                            <div className="text-xs text-gray-500 italic">{isStaticOrder ? 'STATIC: Sample price' : 'DB: Actual price'}</div>
                                        </td>
                                        <td className="px-6 py-6 text-sm font-bold text-gray-600">
                                            {product.quantity}
                                            <div className="text-xs text-gray-500 italic">{isStaticOrder ? 'STATIC: Sample quantity' : 'DB: Actual quantity'}</div>
                                        </td>
                                        <td className="px-6 py-6 text-sm font-black">
                                            £{Number(product.lineTotal || 0).toFixed(2)}
                                            <div className="text-xs text-gray-500 italic">{isStaticOrder ? 'STATIC: Sample total' : 'DB: Actual total'}</div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                <button className="px-5 py-1.5 border-2 border-purple-700 text-purple-700 font-bold text-sm rounded-full hover:bg-purple-50 transition-all">
                                                    Order again
                                                </button>
                                                <button
                                                    onClick={() => setIsProductExpanded(!isProductExpanded)}
                                                    className="text-purple-700"
                                                >
                                                    {isProductExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Nested Expandable Content */}
                    <AnimatePresence>
                        {isProductExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-[#FDFDFF] border-t overflow-hidden"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-8">
                                    {/* Col 1 - Static Product Info */}
                                    <div className="space-y-5">
                                        <h4 className="text-xs font-bold text-[#1A1A1A] uppercase border-b pb-2">Static Product Information</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Brand</p>
                                                <p className="text-sm font-bold text-gray-800">Unizink</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Over-labelled</p>
                                                <p className="text-sm font-bold text-gray-800">No</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Manufacturer</p>
                                                <p className="text-sm font-bold text-gray-800">Kohler</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Product code</p>
                                                <p className="text-sm font-bold text-gray-800">1001300</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Col 2 - Dynamic Backend Data */}
                                    <div className="space-y-5">
                                        <h4 className="text-xs font-bold text-[#1A1A1A] uppercase border-b pb-2">Backend Product Information</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Product ID</p>
                                                <p className="text-sm font-bold text-gray-800">
                                                    {order.products[0]?.productId || 'N/A'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Customer Email</p>
                                                <p className="text-sm font-bold text-gray-800">{order.customerEmail}</p>
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
                                    {/* Col 3 - Handling */}
                                    <div className="space-y-5">
                                        <h4 className="text-xs font-bold text-[#1A1A1A] uppercase border-b pb-2">Licensing & Handling</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Country of license</p>
                                                <p className="text-sm font-bold text-gray-800">Germany</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">License holder</p>
                                                <p className="text-sm font-bold text-gray-800">Kohler</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">License number</p>
                                                <p className="text-sm font-bold text-gray-800">6073335.00.00</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Controlled drug status</p>
                                                <p className="text-sm font-bold text-gray-800">Not Controlled</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Expiry date</p>
                                                <p className="text-sm font-bold text-gray-800">Greater than 6 months (excluding UK & Ireland specials)</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Cytotoxic</p>
                                                <p className="text-sm font-bold text-gray-800">No</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Storage</p>
                                                <span className="inline-block px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-black rounded border border-green-200">
                                                    15-25 °C
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </div>
    );
}