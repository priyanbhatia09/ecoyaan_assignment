import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCheckout } from '@/context/CheckoutContext';
import { Button } from '@/components/ui/Button';

export function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCheckout();

  return (
    <div className="flex items-start gap-4 border-b border-stone-200 py-6 last:border-0">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-stone-200 bg-stone-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-stone-900">
          <h3>{item.name}</h3>
          <p className="ml-4">₹{item.price * item.quantity}</p>
        </div>
        <p className="mt-1 text-sm text-stone-500">Unit Price: ₹{item.price}</p>

        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center gap-2 rounded-md border border-stone-200 bg-white p-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="rounded p-1 text-stone-600 hover:bg-stone-100 disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="rounded p-1 text-stone-600 hover:bg-stone-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
