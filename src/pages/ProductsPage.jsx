import React from 'react';
import { useCheckout } from '@/context/CheckoutContext';
import { motion } from 'motion/react';
import { ShoppingCart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import bambooToothbrushImg from '@/assets/bamboo-toothbrush.jpeg';
import cottonBagsImg from '@/assets/reused-cotton-produce-bags.jpeg';
import loofahSpongeImg from '@/assets/loofah-sponge.jpeg';

const PRODUCTS = [
  {
    id: 101,
    name: "Bamboo Toothbrush (Pack of 4)",
    price: 299,
    image: bambooToothbrushImg,
    description: "Eco-friendly, biodegradable bamboo toothbrushes."
  },
  {
    id: 102,
    name: "Reusable Cotton Produce Bags",
    price: 450,
    image: cottonBagsImg,
    description: "Set of 5 organic cotton bags for grocery shopping."
  },
  {
    id: 103,
    name: "Stainless Steel Water Bottle",
    price: 899,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800",
    description: "Insulated 750ml bottle keeps water cold for 24 hours."
  },
  {
    id: 104,
    name: "Natural Loofah Sponges",
    price: 199,
    image: loofahSpongeImg,
    description: "Plant-based alternative to plastic dish sponges."
  }
];

export function ProductsPage() {
  const { addItem, items } = useCheckout();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          Sustainable Products
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => {
          const cartItem = items.find(item => item.id === product.id);
          
          return (
            <div key={product.id} className="group relative rounded-3xl bg-white border border-stone-100 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/50 hover:border-stone-200">
              <div className="aspect-square overflow-hidden rounded-2xl bg-stone-50 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-2">
                <h3 className="text-lg font-bold text-stone-900 leading-tight mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-stone-500 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-stone-900">₹{product.price}</span>
                  <Button
                    onClick={() => addItem(product)}
                    className="rounded-full bg-stone-900 text-white hover:bg-stone-800 px-4 py-2 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
