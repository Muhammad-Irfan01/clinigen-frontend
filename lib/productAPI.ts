import {
  Product,
  ProductApiResponse,
  SearchProductsParams,
  Cart,
  AddToCartRequest,
  UpdateCartItemRequest,
  CheckoutRequest,
  CheckoutResponse,
  Wishlist,
} from "@/types/product";
import { api } from "./api";
import { authApi } from "./apiService";

export const productAPI = {
  // ---------- PRODUCTS ----------
  getAllProducts: () =>
    api<Product[]>("/products"),

  getProductById: (id: number) =>
    api<Product>(`/products/${id}`),

  searchProducts: (params: SearchProductsParams) => {
    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined && v !== "")
        .map(([k, v]) => [k, String(v)])
    );

    return api<ProductApiResponse>(`/products/search?${query}`);
  },

  // ---------- CART ----------
 getCart: () => authApi<Cart>("/products/cart"),

  addToCart: (data: AddToCartRequest) =>
    authApi<Cart>("/products/cart/add", { method: "POST", data }),

  updateCartItem: (productId: number, data: UpdateCartItemRequest) =>
    authApi<Cart>(`/products/cart/update/${productId}`, { method: "PATCH", data }),

  removeFromCart: (productId: number) =>
    authApi<Cart>(`/products/cart/remove/${productId}`, { method: "DELETE" }),

  clearCart: () =>
    authApi<void>("/products/cart/clear", { method: "POST" }),

  // ---------- CHECKOUT ----------
  checkout: (data: CheckoutRequest) =>
    authApi<CheckoutResponse>("/products/checkout", { method: "POST", data }),

  // ---------- BOOKMARKS ----------
  addBookmark: (productId: number) =>
    authApi<void>("/products/bookmark", { method: "POST", data: { productId } }),

  removeBookmark: (productId: number) =>
    authApi<void>(`/products/bookmark/${productId}`, { method: "DELETE" }),

  getUserBookmarks: () =>
    authApi<Wishlist>("/products/bookmarks"),

  isBookmarked: (productId: number) =>
    authApi<boolean>(`/products/${productId}/is-bookmarked`)
};
