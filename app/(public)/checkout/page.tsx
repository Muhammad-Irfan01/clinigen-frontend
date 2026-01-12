'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, MapPin, User, Mail, Phone, Lock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { productAPI } from '@/lib/productAPI';
import { Cart, CartItem } from '@/types/product';
import useToast from '@/lib/useToast';

interface CheckoutFormData {
  paymentMethod: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  sameAsShipping: boolean;
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { success: showSuccess, error: showError } = useToast();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    paymentMethod: 'credit_card',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    shippingCountry: 'UK',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    billingCountry: 'UK',
    sameAsShipping: true,
    notes: '',
  });

  // Load cart items on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await productAPI.getCart();
        setCart(cartData);
      } catch (error: any) {
        console.error('Error fetching cart:', error);
        showError(error.message || 'Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [showError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Prepare checkout data
      const checkoutData = {
        paymentMethod: formData.paymentMethod,
        shippingAddress: `${formData.shippingAddress}, ${formData.shippingCity}, ${formData.shippingState}, ${formData.shippingZip}, ${formData.shippingCountry}`,
        billingAddress: formData.sameAsShipping 
          ? `${formData.shippingAddress}, ${formData.shippingCity}, ${formData.shippingState}, ${formData.shippingZip}, ${formData.shippingCountry}`
          : `${formData.billingAddress}, ${formData.billingCity}, ${formData.billingState}, ${formData.billingZip}, ${formData.billingCountry}`,
        notes: formData.notes,
        sameAsShipping: formData.sameAsShipping,
      };

      // Call checkout API
      const response = await productAPI.checkout(checkoutData);
      
      showSuccess(response.message || 'Order placed successfully!');
      
      // Redirect to order confirmation page
      setTimeout(() => {
        router.push(`/order/${response.orderId}`);
      }, 1500);
    } catch (error: any) {
      console.error('Checkout error:', error);
      showError(error.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <span className="ml-3">Loading checkout...</span>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-12 font-sans text-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black text-[#1D0E62] mb-6">Checkout</h1>
          <div className="p-12 text-center text-gray-500 border rounded-xl bg-white">
            Your basket is empty. Add products from the catalog!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-12 font-sans text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-[#1D0E62] mb-6">Checkout</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Shipping & Billing Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-[#1D0E62] mb-4 flex items-center">
                  <MapPin className="mr-2" /> Shipping Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <input
                      type="text"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <input
                        type="text"
                        name="shippingState"
                        value={formData.shippingState}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                      <input
                        type="text"
                        name="shippingZip"
                        value={formData.shippingZip}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                      <input
                        type="text"
                        name="shippingCountry"
                        value={formData.shippingCountry}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Billing Information */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#1D0E62] flex items-center">
                    <MapPin className="mr-2" /> Billing Information
                  </h2>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="sameAsShipping"
                      checked={formData.sameAsShipping}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-[#7C3AED] focus:ring-[#7C3AED]"
                    />
                    <span className="ml-2 text-sm">Same as shipping address</span>
                  </label>
                </div>
                
                <AnimatePresence>
                  {!formData.sameAsShipping && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                        <input
                          type="text"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleChange}
                          required={!formData.sameAsShipping}
                          disabled={formData.sameAsShipping}
                          className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
                            formData.sameAsShipping ? 'bg-gray-100' : ''
                          }`}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                          <input
                            type="text"
                            name="billingCity"
                            value={formData.billingCity}
                            onChange={handleChange}
                            required={!formData.sameAsShipping}
                            disabled={formData.sameAsShipping}
                            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
                              formData.sameAsShipping ? 'bg-gray-100' : ''
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                          <input
                            type="text"
                            name="billingState"
                            value={formData.billingState}
                            onChange={handleChange}
                            required={!formData.sameAsShipping}
                            disabled={formData.sameAsShipping}
                            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
                              formData.sameAsShipping ? 'bg-gray-100' : ''
                            }`}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                          <input
                            type="text"
                            name="billingZip"
                            value={formData.billingZip}
                            onChange={handleChange}
                            required={!formData.sameAsShipping}
                            disabled={formData.sameAsShipping}
                            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
                              formData.sameAsShipping ? 'bg-gray-100' : ''
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                          <input
                            type="text"
                            name="billingCountry"
                            value={formData.billingCountry}
                            onChange={handleChange}
                            required={!formData.sameAsShipping}
                            disabled={formData.sameAsShipping}
                            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] ${
                              formData.sameAsShipping ? 'bg-gray-100' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Special Instructions */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-[#1D0E62] mb-4">Special Instructions</h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions for your order..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                />
              </div>
            </div>
            
            {/* Right Column: Order Summary & Payment */}
            <div className="lg:col-span-1 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-[#1D0E62] mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  {cart.items.map((item: CartItem) => (
                    <div key={item.productId} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {item.product?.product_translations?.[0]?.name || `Product ${item.productId}`}
                        </p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">£{item.subtotal.toFixed(2)}</p>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>£{cart.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>£{cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-[#1D0E62] mb-4 flex items-center">
                  <CreditCard className="mr-2" /> Payment Method
                </h2>
                
                <div className="space-y-4">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={formData.paymentMethod === 'credit_card'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <CreditCard className="mr-2" size={20} />
                    <span>Credit Card</span>
                  </label>
                  
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span>PayPal</span>
                  </label>
                  
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span>Bank Transfer</span>
                  </label>
                </div>
              </div>
              
              {/* Place Order Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm rounded-full shadow-lg flex items-center justify-center disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Place Order
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}