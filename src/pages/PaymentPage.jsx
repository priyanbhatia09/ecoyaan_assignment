import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '@/context/CheckoutContext';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { Button } from '@/components/ui/Button';
import { motion } from 'motion/react';
import { CheckCircle, MapPin, Phone, Mail } from 'lucide-react';

export function PaymentPage() {
  const { shippingDetails, items, total } = useCheckout();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Redirect if no shipping details
  React.useEffect(() => {
    if (!shippingDetails && !isSuccess) {
      navigate('/shipping');
    }
  }, [shippingDetails, navigate, isSuccess]);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[60vh] flex-col items-center justify-center text-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-stone-900">Order Successful!</h1>
        <p className="mt-2 text-lg text-stone-600">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="mt-8">
          <Button onClick={() => navigate('/')} variant="outline">
            Continue Shopping
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!shippingDetails) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16"
    >
      <section className="lg:col-span-7">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Review & Pay
        </h1>
        
        <div className="mt-8 space-y-8">
          {/* Shipping Details Review */}
          <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-stone-900">Shipping Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-stone-400" />
                <div>
                  <p className="font-medium text-stone-900">{shippingDetails.fullName}</p>
                  <p className="text-stone-600">{shippingDetails.city}, {shippingDetails.state} - {shippingDetails.pinCode}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-stone-400" />
                  <span className="text-stone-600">{shippingDetails.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-stone-400" />
                  <span className="text-stone-600">{shippingDetails.phone}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100">
                <Button variant="ghost" size="sm" onClick={() => navigate('/shipping')}>Edit Shipping Details</Button>
            </div>
          </div>

          {/* Payment Method (Simulated) */}
          <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-stone-900">Payment Method</h2>
            <div className="mt-4">
              <div className="flex items-center gap-4 rounded-md border border-emerald-200 bg-emerald-50 p-4">
                <div className="h-4 w-4 rounded-full border-[5px] border-emerald-600 bg-white"></div>
                <span className="font-medium text-stone-900">Cash on Delivery (Simulated)</span>
              </div>
              <p className="mt-2 text-sm text-stone-500 ml-8">
                For this demo, we are simulating a Cash on Delivery payment. No actual payment will be processed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-lg bg-stone-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <OrderSummary isCheckout={true} />
        <div className="mt-6 border-t border-stone-200 pt-6">
            <Button 
                className="w-full" 
                size="lg" 
                onClick={handlePayment}
                isLoading={isProcessing}
            >
                Pay ₹{total} Securely
            </Button>
            <p className="mt-4 text-center text-xs text-stone-500">
                By placing this order, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
      </section>
    </motion.div>
  );
}
