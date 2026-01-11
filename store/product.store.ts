import { create } from 'zustand';
import { productAPI } from '@/lib/productAPI';
import { Product, ProductApiResponse, SearchProductsParams, Cart, AddToCartRequest, UpdateCartItemRequest, CheckoutRequest, CheckoutResponse, Wishlist } from '@/types/product';
import useToast from '@/lib/useToast';

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
  isBookmarked: (productId: number) => Promise<boolean>;
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
    const toast = useToast();

    try {
      const response = await productAPI.getAllProducts();
      set({
        products: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to fetch products');
    }
  },

  fetchProductById: async (id: number) => {
    set({ loading: true, error: null });
    const toast = useToast();

    try {
      const response = await productAPI.getProductById(id);
      set({
        productDetail: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to fetch product');
    }
  },

  searchProducts: async (params: SearchProductsParams) => {
    set({ loading: true, error: null });
    const toast = useToast();

    try {
      const response = await productAPI.searchProducts(params);
      set({
        products: response.data,
        pagination: response.meta,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to search products');
    }
  },

  fetchCart: async () => {
    set({ loading: true, error: null });
    const toast = useToast();

    try {
      const response = await productAPI.getCart();
      set({
        cart: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to fetch cart');
    }
  },

  addToCart: async (data: AddToCartRequest) => {
    set({ loading: true, error: null });
    const toast = useToast();

    try {
      await productAPI.addToCart(data);
      // Update cart after adding item
      await get().fetchCart();
      toast.success('Product added to cart successfully');
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to add product to cart');
    }
  },

  updateCartItem: async (productId: number, data: UpdateCartItemRequest) => {
    set({ loading: true, error: null });
    const toast = useToast();

    try {
      await productAPI.updateCartItem(productId, data);
      // Update cart after updating item
      await get().fetchCart();
      toast.success('Cart updated successfully');
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to update cart item');
    }
  },

  removeFromCart: async (productId: number) => {
    set({ loading: true, error: null });
    const toast = useToast();

    try {
      await productAPI.removeFromCart(productId);
      // Update cart after removing item
      await get().fetchCart();
      toast.success('Product removed from cart successfully');
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to remove product from cart');
    }
  },

  clearCart: async () => {
    set({ loading: true, error: null });
    const toast = useToast();

    try {
      await productAPI.clearCart();
      set({
        cart: { items: [], total: 0, count: 0 },
        loading: false,
      });
      toast.success('Cart cleared successfully');
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to clear cart');
    }
  },

  checkout: async (data: CheckoutRequest) => {
    set({ loading: true, error: null });
    const toast = useToast();

    try {
      const response = await productAPI.checkout(data);
      // Clear cart after successful checkout
      set({
        cart: { items: [], total: 0, count: 0 },
        loading: false,
      });
      toast.success(response.message || 'Order placed successfully');
      return response;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to complete checkout');
      throw error;
    }
  },

  fetchWishlist: async () => {
    set({ loading: true, error: null });
    const toast = useToast();

    try {
      const response = await productAPI.getUserBookmarks();
      set({
        wishlist: response,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to fetch wishlist');
    }
  },

  addBookmark: async (productId: number) => {
    set({ loading: true, error: null });
    const toast = useToast();

    try {
      await productAPI.addBookmark(productId);
      // Update wishlist after adding bookmark
      await get().fetchWishlist();
      toast.success('Product added to bookmarks successfully');
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to add bookmark');
    }
  },

  removeBookmark: async (productId: number) => {
    set({ loading: true, error: null });
    const toast = useToast();

    try {
      await productAPI.removeBookmark(productId);
      // Update wishlist after removing bookmark
      await get().fetchWishlist();
      toast.success('Product removed from bookmarks successfully');
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Failed to remove bookmark');
    }
  },

  isBookmarked: async (productId: number): Promise<boolean> => {
    try {
      const response = await productAPI.isBookmarked(productId);
      return response;
    } catch (error: any) {
      console.error('Error checking bookmark status:', error);
      return false;
    }
  },
}));