import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '@/context/CheckoutContext';
import { shippingSchema } from '@/schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { motion } from 'motion/react';

export function ShippingPage() {
  const { setShippingDetails, shippingDetails } = useCheckout();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingDetails || {
      fullName: '',
      email: '',
      phone: '',
      pinCode: '',
      city: '',
      state: '',
    },
  });

  const onSubmit = (data) => {
    setShippingDetails(data);
    navigate('/payment');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16"
    >
      <section className="lg:col-span-7">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Shipping Details
        </h1>
        <div className="mt-8 border-t border-stone-200 pt-8">
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

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button type="submit" size="lg" className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 focus:ring-orange-500">
                Continue to Payment
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="mt-16 rounded-lg bg-stone-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <OrderSummary isCheckout={true} />
      </section>
    </motion.div>
  );
}
