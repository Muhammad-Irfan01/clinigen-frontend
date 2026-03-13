"use client";
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, MoreHorizontal, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
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
    const totalPages = 11;

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
            const productName = order.products[0].productName;
            // Truncate long product names
            return productName.length > 30 ? productName.substring(0, 30) + '...' : productName;
        }
        return '--';
    };

    return (
        <div className="min-h-screen text-custom-text">
            <div className="bg-white border-b border-gray-100"></div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-around items-center bg-white py-4"
            >
                <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                <div className="w-full max-w-lg">
                    <SearchInput button={false} />
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
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                >
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 text-left text-sm font-medium text-gray-500">
                            <tr>
                                {['Order number', 'P.O. number', 'Patient', 'Products', 'Cost', 'Date submitted', 'Order status', 'Actions'].map((header) => (
                                    <th key={header} scope="col" className="px-6 py-3 tracking-wider">
                                        <div className="flex items-center">
                                            {header}
                                            {header === 'Order status' && <ChevronDown className="ml-1 h-3 w-3" />}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="py-12 text-center">
                                        <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                                        <p className="mt-2">Loading orders...</p>
                                    </td>
                                </tr>
                            ) : orders.length > 0 ? (
                                orders.map((order) => (
                                    <motion.tr
                                        key={order.id}
                                        whileHover={{ backgroundColor: '#f9f9f9' }}
                                        className="text-sm"
                                        onClick={() => router.push(`/order/${order.id}`)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {order.customerName || '--'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getProductName(order)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                                            {getTotalCost(order)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {formatDate(order.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <OrderStatusPill status={order.status as any} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <MoreHorizontal className="h-5 w-5 text-gray-400 cursor-pointer hover:text-primary-dark" />
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-lg font-medium">No orders found</p>
                                            <p className="text-sm">You haven't placed any orders yet.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Pagination */}
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
            </main>
            <div className='py-10'>
                <RecentlyViewed />
            </div>
        </div>
    );
}