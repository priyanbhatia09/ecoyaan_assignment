import React from 'react';
import { useCheckout } from '@/context/CheckoutContext';
import { CartItem } from '@/components/cart/CartItem';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { motion } from 'motion/react';

export function CartPage() {
  const { items } = useCheckout();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-stone-900">Your cart is empty</h2>
        <p className="mt-2 text-stone-500">Looks like you haven't added anything yet.</p>
      </div>
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
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <div className="mt-8 border-t border-stone-200">
          <ul role="list" className="divide-y divide-stone-200">
            {items.map((item) => (
              <li key={item.id}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16 rounded-lg bg-stone-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <OrderSummary />
      </section>
    </motion.div>
  );
}
