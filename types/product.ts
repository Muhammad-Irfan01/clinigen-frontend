// Product-related types

export interface ProductTranslation {
  id: number;
  product_id: number;
  locale: string;
  name: string;
  description: string;
  short_description?: string;
}

export interface Category {
  id: number;
  parent_id?: number;
  slug: string;
  position?: number;
  is_searchable: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  name?: string; // Add name field
  // Add other category fields as needed
}

export interface ProductCategory {
  id?: number;
  product_id: number;
  category_id: number;
  categories: Category;
}

export interface Product {
  id: number;
  brand_id?: number;
  tax_class_id?: number;
  slug: string;
  price?: number;
  special_price?: number;
  special_price_type?: string;
  special_price_start?: string; // Date string
  special_price_end?: string; // Date string
  selling_price?: number;
  sku?: string;
  manage_stock: boolean;
  qty?: number;
  in_stock: boolean;
  viewed: number;
  is_active: boolean;
  new_from?: string; // Date string
  new_to?: string; // Date string
  deleted_at?: string; // Date string
  created_at?: string; // Date string
  updated_at?: string; // Date string
  is_virtual: boolean;
  product_translations: ProductTranslation[];
  product_categories: ProductCategory[];
  // Add other related fields as needed
  product_variations?: any[]; // Add specific type if needed
  product_options?: any[]; // Add specific type if needed
}

export interface ProductApiResponse {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ProductDetail extends Product {
  // Additional fields that might be available for product detail
}

export interface SearchProductsParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CartItem {
  productId: number;
  quantity: number;
  productVariantId?: number;
  options?: any;
  product: Product;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  count: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
  productVariantId?: number;
  options?: any;
}

export interface UpdateCartItemRequest {
  quantity?: number;
  productVariantId?: number;
}

export interface CheckoutRequest {
  paymentMethod: string;
  shippingAddress?: string;
  billingAddress?: string;
  notes?: string;
  sameAsShipping?: boolean;
}

export interface CheckoutResponse {
  message: string;
  orderId: number;
  total: number;
  status: string;
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  slug: string;
  image?: string;
  createdAt: string;
}

export interface Wishlist {
  items: WishlistItem[];
  count: number;
}