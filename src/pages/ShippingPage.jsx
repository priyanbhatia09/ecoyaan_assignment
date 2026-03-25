import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCheckout } from '@/context/CheckoutContext';
import { shippingSchema } from '@/schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MapPin, Trash2, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ShippingPage() {
  const { addresses, addAddress, removeAddress, selectAddress, selectedAddressId } = useCheckout();
  const [isAddingNew, setIsAddingNew] = useState(addresses.length === 0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shippingSchema),
  });

  const onSubmit = (data) => {
    addAddress(data);
    setIsAddingNew(false);
    reset();
  };

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
            Shipping Address
          </h1>
          {!isAddingNew && addresses.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"   
              onClick={() => setIsAddingNew(true)}
              className="rounded-full border-stone-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {isAddingNew ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Add New Address</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <Input
                          label="Full Name"
                          error={errors.fullName?.message}
                          {...register('fullName')}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Input
                          label="Email Address"
                          type="email"
                          error={errors.email?.message}
                          {...register('email')}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Input
                          label="Phone Number"
                          type="tel"
                          error={errors.phone?.message}
                          {...register('phone')}
                        />
                      </div>

                      <div>
                        <Input
                          label="PIN Code"
                          error={errors.pinCode?.message}
                          {...register('pinCode')}
                        />
                      </div>

                      <div>
                        <Input
                          label="City"
                          error={errors.city?.message}
                          {...register('city')}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Input
                          label="State"
                          error={errors.state?.message}
                          {...register('state')}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex-1 bg-stone-900 hover:bg-stone-800">
                        Save Address
                      </Button>
                      {addresses.length > 0 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          onClick={() => setIsAddingNew(false)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-4"
              >
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => selectAddress(address.id)}
                    className={cn(
                      "relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 group bg-white",
                      selectedAddressId === address.id
                        ? "border-stone-900 ring-1 ring-stone-900"
                        : "border-stone-200 hover:border-stone-400 hover:shadow-[6px_6px_15px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:-translate-x-1"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "mt-1 flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                          selectedAddressId === address.id ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-500"
                        )}>
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-stone-900 text-lg">{address.fullName}</p>
                          <p className="text-stone-500 mt-1">{address.city}, {address.state} - {address.pinCode}</p>
                          <p className="text-stone-400 text-sm mt-2 flex items-center gap-2">
                            <span>{address.phone}</span>
                            <span className="h-1 w-1 rounded-full bg-stone-300" />
                            <span>{address.email}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-4">
                        {selectedAddressId === address.id && (
                          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAddress(address.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="mt-16 lg:col-span-5 lg:mt-0 sticky top-24">
        <OrderSummary isCheckout={true} />
      </section>
    </motion.div>
  );
}
