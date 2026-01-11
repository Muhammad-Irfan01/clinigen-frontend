import { publicApi, authApi } from './apiService';
import {
  Product,
  ProductApiResponse,
  SearchProductsParams,
  Cart,
  AddToCartRequest,
  UpdateCartItemRequest,
  CheckoutRequest,
  CheckoutResponse,
  Wishlist
} from '@/types/product';

// Product API functions
export const productAPI = {
  // Get all products - public endpoint
  getAllProducts: () =>
    publicApi<Product[]>('/products', {
      method: 'GET',
    }),

  // Get product by ID - public endpoint
  getProductById: (id: number) =>
    publicApi<Product>(`/products/${id}`, {
      method: 'GET',
    }),

  // Search products with filters and pagination
  searchProducts: (params: SearchProductsParams) => {
    // Convert params to query string
    const queryParams = new URLSearchParams();
    if (params.q) queryParams.append('q', params.q);
    if (params.category) queryParams.append('category', params.category);
    if (params.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    return publicApi<ProductApiResponse>(`/products/search?${queryParams.toString()}`, {
      method: 'GET',
    });
  },

  // Cart management
  getCart: async () => {
    try {
      return await authApi<Cart>('/products/cart', { method: 'GET' });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn('Unauthorized access to cart:', error?.response?.data?.message || 'Unauthorized');
        return { items: [], total: 0, count: 0 }; // Return empty cart
      }
      console.warn('Failed to fetch cart:', error);
      throw error;
    }
  },

  addToCart: async (data: AddToCartRequest) => {
    try {
      return await authApi('/products/cart/add', { method: 'POST', data });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn('Unauthorized access to add to cart:', error?.response?.data?.message || 'Unauthorized');
        throw error;
      }
      console.warn('Failed to add to cart:', error);
      throw error;
    }
  },

  updateCartItem: async (productId: number, data: UpdateCartItemRequest) => {
    try {
      return await authApi(`/products/cart/update/${productId}`, { method: 'PATCH', data });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn('Unauthorized access to update cart item:', error?.response?.data?.message || 'Unauthorized');
        throw error;
      }
      console.warn('Failed to update cart item:', error);
      throw error;
    }
  },

  removeFromCart: async (productId: number) => {
    try {
      return await authApi(`/products/cart/remove/${productId}`, { method: 'DELETE' });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn('Unauthorized access to remove from cart:', error?.response?.data?.message || 'Unauthorized');
        throw error;
      }
      console.warn('Failed to remove from cart:', error);
      throw error;
    }
  },

  clearCart: async () => {
    try {
      return await authApi('/products/cart/clear', { method: 'POST' });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn('Unauthorized access to clear cart:', error?.response?.data?.message || 'Unauthorized');
        throw error;
      }
      console.warn('Failed to clear cart:', error);
      throw error;
    }
  },

  // Checkout
  checkout: async (data: CheckoutRequest) => {
    try {
      return await authApi<CheckoutResponse>('/products/checkout', { method: 'POST', data });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn('Unauthorized access to checkout:', error?.response?.data?.message || 'Unauthorized');
        throw error;
      }
      console.warn('Failed to checkout:', error);
      throw error;
    }
  },

  // Wishlist/Bookmark management
  addBookmark: async (productId: number) => {
    try {
      return await authApi('/products/bookmark', { method: 'POST', data: { productId } });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn('Unauthorized access to add bookmark:', error?.response?.data?.message || 'Unauthorized');
        throw error;
      }
      console.warn('Failed to add bookmark:', error);
      throw error;
    }
  },

  removeBookmark: async (productId: number) => {
    try {
      return await authApi(`/products/bookmark/${productId}`, { method: 'DELETE' });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn('Unauthorized access to remove bookmark:', error?.response?.data?.message || 'Unauthorized');
        throw error;
      }
      console.warn('Failed to remove bookmark:', error);
      throw error;
    }
  },

  getUserBookmarks: async () => {
    try {
      return await authApi<Wishlist>('/products/bookmarks', { method: 'GET' });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn('Unauthorized access to get bookmarks:', error?.response?.data?.message || 'Unauthorized');
        return { items: [], count: 0 }; // Return empty bookmarks
      }
      console.warn('Failed to get bookmarks:', error);
      throw error;
    }
  },

  isBookmarked: async (productId: number) => {
    try {
      return await authApi<boolean>(`/products/${productId}/is-bookmarked`, { method: 'GET' });
    } catch (error: any) {
      // Check if it's an unauthorized error (401) and handle appropriately
      if (error?.response?.status === 401 || (error?.response?.data?.statusCode === 401)) {
        console.warn('Unauthorized access to check bookmark:', error?.response?.data?.message || 'Unauthorized');
        return false; // Return false if unauthorized
      }
      console.warn('Failed to check bookmark:', error);
      throw error;
    }
  },
};