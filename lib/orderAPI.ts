import { Order, OrderApiResponse } from '@/types/order';
import { api } from './api';

// Order API functions using the auth API instance to avoid redirect
export const orderAPI = {
  // Get all orders for the authenticated user
  getUserOrders: async () => {
    try {
      return await api<Order[]>('/orders/history', { method: 'GET' });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn('Unauthorized access to user orders:', error?.response?.data?.message || 'Unauthorized');
        return []; // Return empty array instead of throwing to prevent redirect
      }
      // Don't throw error, return empty array to prevent redirect
      console.warn('Failed to fetch user orders:', error);
      return [];
    }
  },

  // Get all orders (admin only)
  getAllOrders: async () => {
    try {
      return await api<Order[]>('/orders', { method: 'GET' });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn('Unauthorized access to all orders:', error?.response?.data?.message || 'Unauthorized');
        return []; // Return empty array instead of throwing to prevent redirect
      }
      console.warn('Failed to fetch all orders:', error);
      return [];
    }
  },

  // Get order by ID
  getOrderById: async (id: number) => {
    try {
      return await api<Order>(`/orders/${id}`, { method: 'GET' });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn(`Unauthorized access to order ${id}:`, error?.response?.data?.message || 'Unauthorized');
        // Re-throw for single order page to handle appropriately
        throw error;
      }
      console.warn(`Failed to fetch order ${id}:`, error);
      // Re-throw for single order page to handle appropriately
      throw error;
    }
  },

  // Get orders by status (admin only)
  getOrdersByStatus: async (status: string) => {
    try {
      return await api<Order[]>(`/orders/status/${status}`, { method: 'GET' });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn(`Unauthorized access to orders with status ${status}:`, error?.response?.data?.message || 'Unauthorized');
        return []; // Return empty array instead of throwing to prevent redirect
      }
      console.warn(`Failed to fetch orders with status ${status}:`, error);
      return [];
    }
  },

  // Update order status (admin only)
  updateOrderStatus: async (id: number, status: string) => {
    try {
      return await api<Order>(`/orders/${id}/status`, {
        method: 'PATCH',
        data: { status }
      });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn(`Unauthorized to update order ${id} status:`, error?.response?.data?.message || 'Unauthorized');
        throw error; // Re-throw to allow UI to handle appropriately
      }
      console.warn(`Failed to update order ${id} status:`, error);
      throw error;
    }
  },
};