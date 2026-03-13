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
  name?: string;
}

export interface ProductCategory {
  id?: number;
  product_id: number;
  category_id: number;
  categories: Category;
}

export interface Brand {
  id: number;
  slug: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductVariant {
  id: number;
  uid: string;
  uids: string;
  product_id: number;
  name: string;
  price?: number;
  special_price?: number;
  special_price_type?: string;
  special_price_start?: string;
  special_price_end?: string;
  selling_price?: number;
  sku?: string;
  manage_stock?: boolean;
  qty?: number;
  in_stock?: boolean;
  is_default?: boolean;
  is_active?: boolean;
  position?: number;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Variation {
  id: number;
  name: string;
  type: string;
}

export interface ProductVariation {
  product_id: number;
  variation_id: number;
  variations: Variation;
}

export interface OptionTranslation {
  id: number;
  option_id: number;
  locale: string;
  name: string;
}

export interface Option {
  id: number;
  type: string;
  is_required: boolean;
  is_global: boolean;
  position?: number;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
  option_translations: OptionTranslation[];
}

export interface ProductOption {
  product_id: number;
  option_id: number;
  options: Option;
}

export interface AttributeTranslation {
  id: number;
  attribute_id: number;
  locale: string;
  name: string;
}

export interface Attribute {
  id: number;
  attribute_set_id: number;
  is_filterable: boolean;
  created_at?: string;
  updated_at?: string;
  slug?: string;
  attribute_translations: AttributeTranslation[];
}

export interface ProductAttribute {
  product_id: number;
  attribute_id: number;
  attributes: Attribute;
}

export interface TagTranslation {
  id: number;
  tag_id: number;
  locale: string;
  name: string;
}

export interface Tag {
  id: number;
  slug: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  tag_translations: TagTranslation[];
}

export interface ProductTag {
  product_id: number;
  tag_id: number;
  tags: Tag;
}

export interface RelatedProduct {
  product_id: number;
  related_product_id: number;
  created_at?: string;
  updated_at?: string;
  related_products?: Product;
  products?: Product;
}

export interface UpSellProduct {
  product_id: number;
  up_sell_product_id: number;
  created_at?: string;
  updated_at?: string;
  up_sell_products?: Product;
  products?: Product;
}

export interface CrossSellProduct {
  product_id: number;
  cross_sell_product_id: number;
  created_at?: string;
  updated_at?: string;
  cross_sell_products?: Product;
  products?: Product;
}

export interface ShortageAlternative {
  product_id: number;
  alternative_product_id: number;
  created_at?: string;
  updated_at?: string;
  products_shortage_alternatives_alternative_product_idToproducts?: Product;
  products_shortage_alternatives_product_idToproducts?: Product;
}

export interface Product {
  id: number;
  brand_id?: number;
  tax_class_id?: number;
  slug: string;
  price?: number;
  special_price?: number;
  special_price_type?: string;
  special_price_start?: string;
  special_price_end?: string;
  selling_price?: number;
  sku?: string;
  dosage_form_pack_size?: string;
  product_code?: string;
  over_labelled: boolean;
  manufacturer?: string;
  country_of_license?: string;
  license_holder?: string;
  license_number?: string;
  controlled_drug_status?: string;
  expiry_date?: string;
  cytotoxic: boolean;
  storage?: string;
  manage_stock: boolean;
  qty?: number;
  in_stock: boolean;
  viewed: number;
  is_active: boolean;
  is_shortage: boolean;
  shortage_reason?: string;
  shortage_start_date?: string;
  shortage_end_date?: string;
  new_from?: string;
  new_to?: string;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
  is_virtual: boolean;
  product_translations: ProductTranslation[];
  product_categories: ProductCategory[];
  product_variants: ProductVariant[];
  product_variations: ProductVariation[];
  product_options: ProductOption[];
  product_attributes: ProductAttribute[];
  product_tags: ProductTag[];
  brands?: Brand;
  // Related products (alternatives)
  related_products_related_products_product_idToproducts?: RelatedProduct[];
  related_products_related_products_related_product_idToproducts?: RelatedProduct[];
  // Up-sell products
  up_sell_products_up_sell_products_product_idToproducts?: UpSellProduct[];
  up_sell_products_up_sell_products_up_sell_product_idToproducts?: UpSellProduct[];
  // Cross-sell products
  cross_sell_products_cross_sell_products_product_idToproducts?: CrossSellProduct[];
  cross_sell_products_cross_sell_products_cross_sell_product_idToproducts?: CrossSellProduct[];
  // Shortage alternatives
  shortage_alternatives_shortage_alternatives_product_idToproducts?: ShortageAlternative[];
  shortage_alternatives_shortage_alternatives_alternative_product_idToproducts?: ShortageAlternative[];
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
  is_shortage?: boolean;
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
  product: {
    id: number;
    name: string;
    slug: string;
    price?: string | number;
    image?: string | null;
    sku?: string;
    description?: string;
    in_stock?: boolean;
    inStock?: boolean;
    product_translations?: Array<{
      name: string;
      description: string;
      locale?: string;
    }>;
    [key: string]: any; // Allow additional fields
  };
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