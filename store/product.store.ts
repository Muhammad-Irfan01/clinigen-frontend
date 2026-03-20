import { create } from 'zustand';
import { productAPI } from '@/lib/productAPI';
import { Product, ProductApiResponse, SearchProductsParams, Cart, AddToCartRequest, UpdateCartItemRequest, CheckoutRequest, CheckoutResponse, Wishlist } from '@/types/product';

interface ProductState {
  products: Product[];
  productDetail: Product | null;
  cart: Cart | null;
  wishlist: Wishlist | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };

  // Product methods
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  searchProducts: (params: SearchProductsParams) => Promise<void>;

  // Cart methods
  fetchCart: () => Promise<void>;
  addToCart: (data: AddToCartRequest) => Promise<void>;
  updateCartItem: (productId: number, data: UpdateCartItemRequest) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;

  // Checkout method
  checkout: (data: CheckoutRequest) => Promise<CheckoutResponse>;

  // Wishlist methods
  fetchWishlist: () => Promise<void>;
  addBookmark: (productId: number) => Promise<void>;
  removeBookmark: (productId: number) => Promise<void>;
  isBookmarked: (productId: number, skipAuthRedirect?: boolean) => Promise<boolean>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  productDetail: null,
  cart: null,
  wishlist: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const response = await productAPI.getAllProducts();
      set({
        products: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchProductById: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const response = await productAPI.getProductById(id);
      set({
        productDetail: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  searchProducts: async (params: SearchProductsParams) => {
    set({ loading: true, error: null });

    try {
      const response = await productAPI.searchProducts(params);
      set({
        products: response.data,
        pagination: response.meta,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCart: async () => {
    set({ loading: true, error: null });

    try {
      const response = await productAPI.getCart();
      console.log('[product.store] Cart fetched:', response);

      set({
        cart: response,
        loading: false,
      });
    } catch (error: any) {
      console.error('[product.store] Cart fetch error:', error);
      set({ error: error.message, loading: false });
    }
  },

  addToCart: async (data: AddToCartRequest) => {
    set({ loading: true, error: null });

    try {
      console.log('[product.store] Adding to cart:', data);
      await productAPI.addToCart(data);
      console.log('[product.store] Add to cart successful, fetching updated cart...');

      // Update cart after adding item
      await get().fetchCart();
      console.log('[product.store] Cart refetched successfully, count:', get().cart?.count);

      set({ loading: false });
    } catch (error: any) {
      console.error('[product.store] Add to cart error:', error);
      set({ error: error.message, loading: false });
    }
  },

  updateCartItem: async (productId: number, data: UpdateCartItemRequest) => {
    set({ loading: true, error: null });

    try {
      await productAPI.updateCartItem(productId, data);
      // Update cart after updating item
      await get().fetchCart();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  removeFromCart: async (productId: number) => {
    set({ loading: true, error: null });

    try {
      await productAPI.removeFromCart(productId);
      // Update cart after removing item
      await get().fetchCart();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  clearCart: async () => {
    set({ loading: true, error: null });

    try {
      await productAPI.clearCart();
      set({
        cart: { items: [], total: 0, count: 0 },
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  checkout: async (data: CheckoutRequest) => {
    set({ loading: true, error: null });

    try {
      const response = await productAPI.checkout(data);
      // Clear cart after successful checkout
      set({
        cart: { items: [], total: 0, count: 0 },
        loading: false,
      });
      return response;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchWishlist: async () => {
    set({ loading: true, error: null });

    try {
      const response = await productAPI.getUserBookmarks();
      set({
        wishlist: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addBookmark: async (productId: number) => {
    set({ loading: true, error: null });

    try {
      await productAPI.addBookmark(productId);
      // Update wishlist after adding bookmark
      await get().fetchWishlist();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  removeBookmark: async (productId: number) => {
    set({ loading: true, error: null });

    try {
      await productAPI.removeBookmark(productId);
      // Update wishlist after removing bookmark
      await get().fetchWishlist();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  isBookmarked: async (productId: number, skipAuthRedirect: boolean = false): Promise<boolean> => {
    try {
      const response = await productAPI.isBookmarked(productId, skipAuthRedirect);
      return response;
    } catch (error: any) {
      console.error('Error checking bookmark status:', error);
      return false;
    }
  },
}));