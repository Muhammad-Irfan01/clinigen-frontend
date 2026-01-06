"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, ChevronLeft, MoreHorizontal, SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { TabFilter } from '@/components/ui/TabFilter';
import { OrderStatusPill } from '@/components/ui/OrderStatus';
import { RecentlyViewed } from '@/components/ui/RecentlyViewed';
import { SearchInput } from '@/components/ui/SearchInput';
import Pagination from '@/components/ui/Pagination';
import { useRouter } from 'next/navigation';

// Mock Data structure based on the image
const MOCK_ORDERS = [
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
    const [resultsPerPage, setResultPerPage] = useState<number>(5)
    const totalPages = 11; // Based on the image

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
                            {MOCK_ORDERS.map((order) => (
                                <motion.tr
                                    key={order.id}
                                    whileHover={{ backgroundColor: '#f9f9f9' }}
                                    className="text-sm"
                                    onClick={() => router.push('/checkout')}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.po}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.patient}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.cost}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <OrderStatusPill status={order.status as any} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <MoreHorizontal className="h-5 w-5 text-gray-400 cursor-pointer hover:text-primary-dark" />
                                    </td>
                                </motion.tr>
                            ))}
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