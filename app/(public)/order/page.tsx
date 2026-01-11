"use client";
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, ChevronLeft, MoreHorizontal, SearchIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { TabFilter } from '@/components/ui/TabFilter';
import { OrderStatusPill } from '@/components/ui/OrderStatus';
import { RecentlyViewed } from '@/components/ui/RecentlyViewed';
import { SearchInput } from '@/components/ui/SearchInput';
import Pagination from '@/components/ui/Pagination';
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

const TABS = ['Current orders', 'Previous orders', 'My orders'];

export default function Orders() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultPerPage] = useState<number>(5);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const totalPages = 11; // Based on the image

    // Fetch orders from backend
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const userOrders = await orderAPI.getUserOrders();
                setOrders(userOrders);
            } catch (error: any) {
                console.error('Error fetching orders:', error);
                // Check if it's an unauthorized error (401) and handle appropriately
                if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
                    console.log('Authentication required to view orders:', error?.response?.data?.message || 'Unauthorized');
                    setOrders([]); // Set empty array to prevent redirect
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(' ', '/') + '/' + date.getFullYear();
    };

    const getTotalCost = (order: Order) => {
        return `£${order.total.toFixed(2)}`;
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
                <h2 className="text-3xl font-bold tracking-tight">Orders (Static + Dynamic Data)</h2>
                <div className=" w-full max-w-lg">
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
                                {/* Headers with sort icons, based on image */}
                                {['Order number', 'P.O. number', 'Patient', 'Products', 'Cost', 'Date submitted', 'Order status', 'Actions'].map((header) => (
                                    <th key={header} scope="col" className="px-6 py-3 tracking-wider">
                                        <div className="flex items-center">
                                            {header}
                                            {/* Only 'Order status' has a visible sort indicator in the image */}
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
                            ) : (
                                <>
                                    {/* Display static orders */}
                                    {STATIC_ORDERS.map((order, index) => (
                                        <motion.tr
                                            key={`static-${order.id}`}
                                            whileHover={{ backgroundColor: '#f9f9f9' }}
                                            className="text-sm bg-blue-50" // Different background to distinguish static data
                                            onClick={() => router.push(`/order/${order.id}`)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.id}
                                                <div className="text-xs text-gray-500 italic">DB: {orders[index]?.id || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.po}
                                                <div className="text-xs text-gray-500 italic">DB: {orders[index]?.id || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.patient}
                                                <div className="text-xs text-gray-500 italic">DB: {orders[index]?.customerName || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.product}
                                                <div className="text-xs text-gray-500 italic">DB: {orders[index]?.products[0]?.productName || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.cost}
                                                <div className="text-xs text-gray-500 italic">DB: {orders[index] ? `£${orders[index].total.toFixed(2)}` : 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.date}
                                                <div className="text-xs text-gray-500 italic">DB: {orders[index] ? formatDate(orders[index].createdAt) : 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <OrderStatusPill status={order.status as any} />
                                                    <span className="text-xs text-gray-500 italic">DB: {orders[index]?.status || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <MoreHorizontal className="h-5 w-5 text-gray-400 cursor-pointer hover:text-primary-dark" />
                                            </td>
                                        </motion.tr>
                                    ))}

                                    {/* Display dynamic orders from DB */}
                                    {orders.map((order) => (
                                        <motion.tr
                                            key={`dynamic-${order.id}`}
                                            whileHover={{ backgroundColor: '#f9f9f9' }}
                                            className="text-sm bg-white"
                                            onClick={() => router.push(`/order/${order.id}`)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.id}
                                                <div className="text-xs text-gray-500 italic">STATIC: N/A</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.id}
                                                <div className="text-xs text-gray-500 italic">STATIC: N/A</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.customerName}
                                                <div className="text-xs text-gray-500 italic">STATIC: --</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.products[0]?.productName || 'N/A'}
                                                <div className="text-xs text-gray-500 italic">STATIC: Uniznik - zinc aspartat...</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getTotalCost(order)}
                                                <div className="text-xs text-gray-500 italic">STATIC: £47.28</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatDate(order.createdAt)}
                                                <div className="text-xs text-gray-500 italic">STATIC: 08/Dec/2025</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <OrderStatusPill status={order.status as any} />
                                                    <span className="text-xs text-gray-500 italic">STATIC: Processing</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <MoreHorizontal className="h-5 w-5 text-gray-400 cursor-pointer hover:text-primary-dark" />
                                            </td>
                                        </motion.tr>
                                    ))}
                                    {orders.length === 0 && !loading && STATIC_ORDERS.length > 0 && (
                                        <tr>
                                            <td colSpan={8} className="py-8 text-center text-gray-500">
                                                <p>You need to be logged in to view your order history.</p>
                                                <button
                                                    onClick={() => router.push('/signin')}
                                                    className="mt-2 bg-[#706FE4] hover:bg-[#D89AFE] text-white px-4 py-2 rounded-full font-bold text-sm"
                                                >
                                                    Sign In
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Pagination (Exact layout from the image) */}
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