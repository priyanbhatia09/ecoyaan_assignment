import React from 'react';
import { useCheckout } from '@/context/CheckoutContext';
import { ShieldCheck, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function OrderSummary() {
  const { subtotal, shippingFee, discount, total, items } = useCheckout();

  return (
    <div className="rounded-3xl bg-white border border-stone-100 p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-stone-900 mb-6">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-stone-500">Subtotal ({items.length} items)</div>
          <div className="font-semibold text-stone-900">₹{subtotal}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-500">
            <span>Shipping</span>
            <Info className="h-4 w-4 text-stone-300" />
          </div>
          <div className="font-semibold text-stone-900">₹{subtotal > 0 ? shippingFee : 0}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-stone-500">Discount</div>
          <div className="font-semibold text-emerald-600">-₹{discount}</div>
        </div>

        <div className="pt-6 mt-6 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-stone-900">Total Amount</div>
            <div className="text-2xl font-black text-stone-900">₹{total}</div>
          </div>
          <p className="mt-2 text-xs text-stone-400 text-right">Inclusive of all taxes</p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3 p-4 rounded-2xl bg-stone-50 text-stone-500 border border-stone-100">
        <ShieldCheck className="h-5 w-5 text-stone-400" />
        <p className="text-[10px] font-medium leading-tight">
          Safe and secure payments. 100% Authentic products. Easy returns.
        </p>
      </div>
    </div>
  );
}
