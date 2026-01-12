"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trash2, CheckCircle, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { productAPI } from '@/lib/productAPI';
import { CartItem, Cart } from '@/types/product';
import useToast from '@/lib/useToast';
import { div } from 'framer-motion/client';

// --- Main Basket Page ---

export default function BasketPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingQuantities, setUpdatingQuantities] = useState<Record<number, boolean>>({});
  const { error: showError, success: showSuccess } = useToast();
  const router = useRouter()
  // Load cart items on component mount
  const fetchCart = async () => {
    try {
      const cartData = await productAPI.getCart();
      setCart(cartData);
    } catch (error: any) {
      console.error('Error fetching cart:', error);

      // Check if it's an "Invalid product ID" error
      if (error?.response?.data?.message?.includes('Invalid product ID')) {
        // The cart data is corrupted, offer to clear it
        if (window.confirm('Your cart contains invalid product data. Would you like to clear your cart?')) {
          try {
            await productAPI.clearCart();
            setCart({ items: [], total: 0, count: 0 });
            showSuccess('Corrupted cart cleared successfully');
          } catch (clearError) {
            console.error('Error clearing cart:', clearError);
            showError('Failed to clear corrupted cart');
          }
        } else {
          // Set an empty cart to prevent continuous error
          setCart({ items: [], total: 0, count: 0 });
        }
      } else {
        showError(error.message || 'Failed to load cart');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdatingQuantities(prev => ({ ...prev, [productId]: true }));

    try {
      // Update the cart item
      const updatedCart = await productAPI.updateCartItem(productId, { quantity: newQuantity });
      setCart(updatedCart);
      fetchCart();
      showSuccess('Cart updated successfully');
    } catch (error: any) {
      console.error('Error updating cart item:', error);

      // Check if it's an "Invalid product ID" error
      if (error?.response?.data?.message?.includes('Invalid product ID')) {
        showError('This product is no longer available in your cart. The cart will be refreshed.');
        // Refresh the cart to get the latest valid data
        try {
          const freshCart = await productAPI.getCart();
          setCart(freshCart);
        } catch (refreshError) {
          console.error('Error refreshing cart:', refreshError);
          setCart({ items: [], total: 0, count: 0 }); // Fallback to empty cart
        }
      } else {
        showError(error.message || 'Failed to update cart item');
      }
    } finally {
      setUpdatingQuantities(prev => ({ ...prev, [productId]: false }));
    }
  };


  const handleRemoveItem = async (productId: number) => {
    try {
      await productAPI.removeFromCart(productId);
      // Reload cart after removal
      const updatedCart = await productAPI.getCart();
      setCart(updatedCart);
      showSuccess('Item removed from cart');
    } catch (error: any) {
      console.error('Error removing item from cart:', error);

      // Check if it's an "Invalid product ID" error
      if (error?.response?.data?.message?.includes('Invalid product ID')) {
        showError('This product is no longer available in your cart. The cart will be refreshed.');
        // Refresh the cart to get the latest valid data
        try {
          const freshCart = await productAPI.getCart();
          setCart(freshCart);
        } catch (refreshError) {
          console.error('Error refreshing cart:', refreshError);
          setCart({ items: [], total: 0, count: 0 }); // Fallback to empty cart
        }
      } else {
        showError(error.message || 'Failed to remove item from cart');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <span className="ml-3">Loading cart...</span>
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-12 font-sans text-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black text-[#1D0E62] mb-6">Basket</h1>
          <div className="p-12 text-center text-gray-500 border rounded-xl bg-white">
            Your basket is empty. Add products from the catalog!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-12 font-sans text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Item List */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-black text-[#1D0E62] mb-6">Basket</h1>

          {!cart || !cart.items || cart.items.length === 0 ? (
            <div className="p-12 text-center text-gray-500 border rounded-xl bg-white">
              {cart ? 'Your basket is empty. Add products from the catalog!' : 'Loading cart...'}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {cart.items.map((item) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <BasketProductCard
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    isUpdating={!!updatingQuantities[item.productId]}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Right Column: Summary Sidebar */}
        <div className="lg:col-span-1 sticky top-8 h-fit space-y-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 space-y-6">
            <h2 className="text-xl font-black text-[#1D0E62]">Summary ({cart.count} items)</h2>

            <div className="flex justify-between items-center text-lg font-semibold">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-extrabold">£{cart.total ? cart.total.toFixed(2) : '0.00'}</span>
            </div>

            {/* Free Shipping Callout */}
            <div className="p-4 rounded-xl bg-[#E6F4FF] border border-[#B3D9FF] flex items-center justify-center text-center">
              <img
                src="shipping-icon-placeholder.svg" // Replace with actual SVG or use a placeholder icon
                alt="Shipping Truck"
                className="w-12 h-12 mr-3"
              />
              <p className="text-xs font-bold text-[#1D0E62] leading-tight">
                FREE Shipping on all *small-sized orders!
              </p>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="w-full py-4 border border-[#706FE4] hover:text-white font-bold text-sm rounded-full shadow-lg hover:bg-[#706FE4] transition-colors"
            >
              Proceed to checkout
            </button>

            {/* Button to clear corrupted cart data */}
            <button
              onClick={async () => {
                if (window.confirm('Are you sure you want to clear your cart? This will remove all items.')) {
                  try {
                    await productAPI.clearCart();
                    setCart({ items: [], total: 0, count: 0 });
                    showSuccess('Cart cleared successfully');
                  } catch (error: any) {
                    console.error('Error clearing cart:', error);
                    showError(error.message || 'Failed to clear cart');
                  }
                }
              }}
              className="w-full py-2 mt-2 text-sm text-red-600 hover:text-white font-bold rounded-full border border-red-600 hover:bg-red-600 transition-colors"
            >
              Clear Cart (if having issues)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BasketProductCard({
  item,
  onQuantityChange,
  onRemove,
  isUpdating
}: {
  item: CartItem,
  onQuantityChange: (productId: number, quantity: number) => void,
  onRemove: (productId: number) => void,
  isUpdating: boolean
}) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Update local state when item.quantity changes
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const calculatedAmount = (quantity * (item.subtotal / item.quantity)).toFixed(2);

  const handleQuantityUpdate = (newQuantity: number) => {
    if (newQuantity !== quantity) {
      setQuantity(newQuantity);
      onQuantityChange(item.productId, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 space-y-4">

      {/* Product Header Row */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-black text-[#1D0E62]">
            {item.product?.product_translations?.[0]?.name || `Product ${item.productId}`} ({item.product?.product_translations?.[0]?.name || 'N/A'})
          </h3>
          <p className="text-sm font-semibold text-gray-500">Number of packs</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-[#7C3AED]">£{calculatedAmount}</span>
          <button
            onClick={() => onRemove(item.productId)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label={`Delete ${item.product?.product_translations?.[0]?.name || 'item'} from basket`}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Quantity Input */}
      <div className="flex justify-between items-start">
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => handleQuantityUpdate(Math.max(1, parseInt(e.target.value) || 1))}
          disabled={isUpdating}
          className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] disabled:opacity-50"
        />
        <span className="text-sm font-semibold text-gray-500 mr-16">Amount:</span>
      </div>

      {/* Product Details Toggle */}
      <button
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        className="flex items-center justify-between w-full pt-4 text-sm font-bold text-[#1D0E62] hover:text-[#7C3AED] transition-colors"
      >
        Product details
        <motion.div
          animate={{ rotate: isDetailsOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      {/* Collapsible Details */}
      <AnimatePresence>
        {isDetailsOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden text-sm text-gray-600 border-t pt-4"
          >
            {item.product?.product_translations?.[0]?.description || 'Product details not available'} {/* Placeholder for full spec data */}
            <p className="mt-2 text-[#7C3AED] font-semibold hover:underline cursor-pointer">View full details page</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}