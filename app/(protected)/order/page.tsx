"use client";
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TabFilter } from '@/components/ui/TabFilter';
import { OrderStatusPill } from '@/components/ui/OrderStatus';
import { RecentlyViewed } from '@/components/ui/RecentlyViewed';
import { SearchInput } from '@/components/ui/SearchInput';
import Pagination from '@/components/ui/Pagination';
import { useRouter } from 'next/navigation';
import { orderAPI } from '@/lib/orderAPI';
import { Order } from '@/types/order';

const TABS = ['Current orders', 'Previous orders', 'My orders'];

export default function Orders() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultPerPage] = useState<number>(5);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const totalPages = 11;

    // Filter orders based on active tab
    const filterOrders = (orders: Order[]) => {
        let filtered = [...orders];

        // Apply search filter
        if (searchTerm.trim()) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(order =>
                order.id.toString().toLowerCase().includes(search) ||
                order.customerName.toLowerCase().includes(search) ||
                (order.products.some(p => p.productName.toLowerCase().includes(search)))
            );
        }

        // Apply tab filter
        const now = new Date();
        switch (activeTab) {
            case 'Current orders':
                // Orders with pending, processing, or shipped status
                filtered = filtered.filter(order =>
                    ['pending', 'processing', 'shipped'].includes(order.status.toLowerCase())
                );
                break;
            case 'Previous orders':
                // Orders with completed, cancelled, or delivered status
                filtered = filtered.filter(order =>
                    ['completed', 'delivered', 'cancelled'].includes(order.status.toLowerCase())
                );
                break;
            case 'My orders':
                // All orders (no additional filter)
                break;
        }

        return filtered;
    };

    const filteredOrders = filterOrders(orders);

    // Fetch orders from backend
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const userOrders = await orderAPI.getUserOrders();
                setOrders(userOrders);
            } catch (error: any) {
                console.error('Error fetching orders:', error);
                if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
                    console.log('Authentication required to view orders:', error?.response?.data?.message || 'Unauthorized');
                    setOrders([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const getTotalCost = (order: Order) => {
        return `£${Number(order.total || 0).toFixed(2)}`;
    };

    const getProductName = (order: Order) => {
        if (order.products && order.products.length > 0) {
            return order.products[0].productName || '--';
        }
        return '--';
    };

    const getPatientName = (order: Order) => {
        return order.customerName || '--';
    };

    return (
        <div className="min-h-screen text-custom-text">
            <div className="bg-white border-b border-gray-100"></div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-around items-center bg-white py-4 gap-4"
            >
                <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                <div className="w-full max-w-lg relative">
                    <SearchInput 
                        button={false}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search by order ID, customer, or product"
                    />
                </div>
            </motion.div>

            <main className="max-w-7xl mx-auto py-10 px-6">
                <div className="mb-6 flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-500">Filter by</span>
                    <TabFilter tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {/* Desktop Table Headers */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-500">
                        <div className="col-span-2">Order Number</div>
                        <div className="col-span-2">P.O. Number</div>
                        <div className="col-span-2">Patient</div>
                        <div className="col-span-2">Products</div>
                        <div className="col-span-1">Cost</div>
                        <div className="col-span-1">Date</div>
                        <div className="col-span-2 text-right">Status</div>
                    </div>

                    {/* Order Rows */}
                    <div className="space-y-3">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-[#706FE4]" />
                                <span className="ml-3 text-gray-600">Loading orders...</span>
                            </div>
                        ) : filteredOrders.length > 0 ? (
                            <AnimatePresence>
                                {/* Desktop View */}
                                {filteredOrders
                                    .slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)
                                    .map((order, idx) => (
                                    <React.Fragment key={order.id}>
                                        {/* Desktop Row */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="hidden md:grid grid-cols-12 gap-4 px-4 py-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                                            onClick={() => router.push(`/order/${order.id}`)}
                                        >
                                            {/* Order Number Column */}
                                            <div className="col-span-2">
                                                <div className="font-bold text-gray-800 text-base">{order.id}</div>
                                            </div>

                                            {/* P.O. Number Column */}
                                            <div className="col-span-2">
                                                <span className="text-sm text-gray-600">{order.id}</span>
                                            </div>

                                            {/* Patient Column */}
                                            <div className="col-span-2 flex items-center">
                                                <span className="text-sm text-gray-600">{getPatientName(order)}</span>
                                            </div>

                                            {/* Products Column */}
                                            <div className="col-span-2 flex items-center">
                                                <span className="text-sm text-gray-600">{getProductName(order)}</span>
                                            </div>

                                            {/* Cost Column */}
                                            <div className="col-span-1 flex items-center">
                                                <span className="font-semibold text-gray-800 text-sm">{getTotalCost(order)}</span>
                                            </div>

                                            {/* Date Column */}
                                            <div className="col-span-1 flex items-center">
                                                <span className="text-sm text-gray-600">{formatDate(order.createdAt)}</span>
                                            </div>

                                            {/* Status Column */}
                                            <div className="col-span-2 flex items-center justify-end">
                                                <OrderStatusPill status={order.status as any} />
                                                <button
                                                    className="ml-3 bg-[#7a6fe4] text-white px-4 py-2 rounded-lg"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/order/${order.id}`);
                                                    }}
                                                >
                                                    <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        </motion.div>

                                        {/* Mobile Card */}
                                        <motion.div
                                            key={`mobile-${order.id}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="md:hidden bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer p-4 space-y-3"
                                            onClick={() => router.push(`/order/${order.id}`)}
                                        >
                                            {/* Header Row */}
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase">Order Number</p>
                                                    <p className="font-bold text-gray-800 text-lg">{order.id}</p>
                                                </div>
                                                <OrderStatusPill status={order.status as any} />
                                            </div>

                                            {/* Details Grid */}
                                            <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                                                <div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase">Patient</p>
                                                    <p className="text-sm text-gray-700 font-medium">{getPatientName(order)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase">P.O. Number</p>
                                                    <p className="text-sm text-gray-600">{order.id}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase">Products</p>
                                                    <p className="text-sm text-gray-600 truncate">{getProductName(order)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase">Cost</p>
                                                    <p className="text-sm font-semibold text-gray-800">{getTotalCost(order)}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase">Date</p>
                                                    <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                                                </div>
                                            </div>

                                            {/* View Details Button */}
                                            <div className="pt-3 border-t flex justify-end">
                                                <button
                                                    className="bg-[#7a6fe4] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#5a5bd4] transition-colors flex items-center gap-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/order/${order.id}`);
                                                    }}
                                                >
                                                    View Details
                                                    <ArrowRight size={16} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    </React.Fragment>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <div className="flex flex-col items-center gap-3">
                                    <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-lg font-medium">
                                        {searchTerm ? 'No orders match your search' : 'No orders found'
                                    }</p>
                                    <p className="text-sm">
                                        {searchTerm 
                                            ? 'Try searching with different keywords' 
                                            : 'You haven\'t placed any orders yet.'
                                        }
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Pagination */}
                {filteredOrders.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filteredOrders.length / resultsPerPage)}
                        resultsPerPage={resultsPerPage}
                        onPageChange={(page) => setCurrentPage(page)}
                        onResultsPerPageChange={(count) => {
                            setResultPerPage(count);
                            setCurrentPage(1);
                        }}
                    />
                )}
            </main>
            <div className='py-10'>
                <RecentlyViewed />
            </div>
        </div>
    );
}