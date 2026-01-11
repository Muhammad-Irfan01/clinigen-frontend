// Order-related types

export interface OrderProduct {
  id: number;
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Transaction {
  id: number;
  order_id: number;
  transaction_id: string;
  payment_method: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  customerId?: number;
  customerEmail: string;
  customerPhone?: string;
  customerName: string;
  billingAddress: OrderAddress;
  shippingAddress: OrderAddress;
  subTotal: number;
  shippingMethod?: string;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: string;
  currency: string;
  currencyRate: number;
  locale: string;
  status: string;
  note?: string;
  trackingReference?: string;
  createdAt: string;
  updatedAt: string;
  products: OrderProduct[];
  transaction?: Transaction | null;
}

export interface OrderApiResponse {
  data: Order[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}