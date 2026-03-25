import React from 'react';
import { useCheckout } from '@/context/CheckoutContext';
import { CartItem } from '@/components/cart/CartItem';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CartPage() {
  const { items } = useCheckout();

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4"
      >
        <div className="mb-6 rounded-full bg-stone-100 p-8">
          <ShoppingBag className="h-16 w-16 text-stone-300" />
        </div>
        <h2 className="text-3xl font-bold text-stone-900">Your cart is empty</h2>
        <p className="mt-4 text-lg text-stone-500 max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our sustainable products and make a difference.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center rounded-full bg-stone-900 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-stone-800 hover:shadow-xl active:scale-95"
        >
          Start Shopping
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16"
    >
      <section className="lg:col-span-7">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">
            Shopping Cart
          </h1>
          <span className="text-stone-500 font-medium">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mt-16 lg:col-span-5 lg:mt-0 sticky top-24">
        <OrderSummary />
      </section>
    </motion.div>
  );
}
