import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCheckout } from '@/context/CheckoutContext';
import { cn } from '@/lib/utils';

export function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCheckout();

  return (
    <div className="group relative flex items-center gap-4 sm:gap-6 rounded-3xl bg-white border border-stone-100 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/50 hover:border-stone-200">
      <div className="h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-stone-50 border border-stone-100">
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between self-stretch py-1">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-stone-900 leading-tight sm:text-xl">
              {item.name}
            </h3>
            <p className="text-lg font-black text-stone-900 sm:text-xl">
              ₹{item.price * item.quantity}
            </p>
          </div>
          <p className="mt-1 text-sm font-medium text-stone-400">
            ₹{item.price} / unit
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 rounded-full bg-stone-50 p-1 border border-stone-100">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-all hover:bg-white hover:text-stone-900 hover:shadow-sm disabled:opacity-30"
              disabled={item.quantity <= 0}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-bold text-stone-900">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-all hover:bg-white hover:text-stone-900 hover:shadow-sm"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-300 transition-all hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
