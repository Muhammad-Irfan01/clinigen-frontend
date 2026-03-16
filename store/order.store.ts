import { create } from 'zustand';
import { orderAPI } from '@/lib/orderAPI';
import { Order } from '@/types/order';

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;

  // Order methods
  fetchUserOrders: () => Promise<void>;
  fetchOrderById: (id: number) => Promise<void>;
  fetchAllOrders: () => Promise<void>;
  fetchOrdersByStatus: (status: string) => Promise<void>;
  updateOrderStatus: (id: number, status: string) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,

  fetchUserOrders: async () => {
    set({ loading: true, error: null });

    try {
      const response = await orderAPI.getUserOrders();
      set({
        orders: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchOrderById: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const response = await orderAPI.getOrderById(id);
      set({
        selectedOrder: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchAllOrders: async () => {
    set({ loading: true, error: null });

    try {
      const response = await orderAPI.getAllOrders();
      set({
        orders: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchOrdersByStatus: async (status: string) => {
    set({ loading: true, error: null });

    try {
      const response = await orderAPI.getOrdersByStatus(status);
      set({
        orders: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateOrderStatus: async (id: number, status: string) => {
    set({ loading: true, error: null });

    try {
      const response = await orderAPI.updateOrderStatus(id, status);
      // Update the order in the store
      set((state) => ({
        orders: state.orders.map(order =>
          order.id === id ? response : order
        ),
        selectedOrder: state.selectedOrder?.id === id ? response : state.selectedOrder,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));