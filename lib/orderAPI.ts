import { Order, OrderApiResponse } from '@/types/order';
import { authApi } from './apiService';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Order API functions using the auth API instance to handle authentication automatically
export const orderAPI = {
  // Get all orders for the authenticated user
  getUserOrders: () => authApi<Order[]>('/orders/history', { method: 'GET' }),

  // Get all orders (admin only)
  getAllOrders: () => authApi<Order[]>('/orders', { method: 'GET' }),

  // Get order by ID
  getOrderById: (id: number) => authApi<Order>(`/orders/${id}`, { method: 'GET' }),

  // Get orders by status (admin only)
  getOrdersByStatus: (status: string) => authApi<Order[]>(`/orders/status/${status}`, { method: 'GET' }),

  // Update order status (admin only)
  updateOrderStatus: (id: number, status: string) => authApi<Order>(`/orders/${id}/status`, {
    method: 'PATCH',
    data: { status }
  }),

  // Download invoice PDF
  downloadInvoice: async (orderId: number) => {
    const response = await axios.get(`${BASE_URL}/orders/${orderId}/invoice`, {
      responseType: 'blob',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
    return response;
  },
};