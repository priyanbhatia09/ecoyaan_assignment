import React from 'react';
import { useCheckout } from '@/context/CheckoutContext';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export function OrderSummary({ isCheckout = false }) {
  const { subtotal, shippingFee, discount, total } = useCheckout();

  return (
    <div className="rounded-lg bg-stone-50 px-4 py-6 sm:p-6 lg:p-8">
      <h2 className="text-lg font-medium text-stone-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-stone-200 pt-4">
          <div className="text-base font-medium text-stone-900">Subtotal</div>
          <div className="text-base font-medium text-stone-900">₹{subtotal}</div>
        </div>

        <div className="flex items-center justify-between border-t border-stone-200 pt-4">
          <div className="flex items-center text-sm text-stone-600">
            <span>Shipping estimate</span>
          </div>
          <div className="text-sm font-medium text-stone-900">₹{shippingFee}</div>
        </div>

        <div className="flex items-center justify-between border-t border-stone-200 pt-4">
          <div className="flex items-center text-sm text-stone-600">
            <span>Discount</span>
          </div>
          <div className="text-sm font-medium text-emerald-600">-₹{discount}</div>
        </div>

        <div className="flex items-center justify-between border-t border-stone-200 pt-4">
          <div className="text-base font-medium text-stone-900">Order total</div>
          <div className="text-xl font-bold text-stone-900">₹{total}</div>
        </div>
      </div>

      {!isCheckout && (
        <div className="mt-6">
          <Link to="/shipping">
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
