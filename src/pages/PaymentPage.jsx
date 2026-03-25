import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '@/context/CheckoutContext';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Smartphone, Landmark, Banknote, CheckCircle2, MapPin, ShieldCheck, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', name: 'Card', icon: CreditCard, description: 'Debit or Credit Card' },
  { id: 'netbanking', name: 'Net Banking', icon: Landmark, description: 'All major banks' },
  { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' },
];

export function PaymentPage() {
  const { selectedAddress, total } = useCheckout();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // Redirect if no address selected
  useEffect(() => {
    if (!selectedAddress && !isSuccess) {
      navigate('/shipping');
    }
  }, [selectedAddress, navigate, isSuccess]);

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
        className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4"
      >
        <div className="mb-6 rounded-full bg-emerald-100 p-8 text-emerald-600">
          <CheckCircle2 className="h-20 w-20" />
        </div>
        <h2 className="text-4xl font-bold text-stone-900">Order Placed!</h2>
        <p className="mt-4 text-lg text-stone-500 max-w-md">
          Thank you for your purchase. Your order has been successfully placed and will be delivered soon.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate('/')}
            className="rounded-full bg-stone-900 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-stone-800 hover:shadow-xl active:scale-95"
          >
            Continue Shopping
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-stone-200 px-8 py-4 text-lg font-semibold text-stone-600 transition-all hover:bg-stone-50 active:scale-95"
          >
            Track Order
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!selectedAddress) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16"
    >
      <section className="lg:col-span-7">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-8">
          Payment Method
        </h1>

        <div className="space-y-8">
          {/* Address Review */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-stone-400" />
                Delivering to
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/shipping')}
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-bold"
              >
                Change
              </Button>
            </div>
            <div className="text-stone-600">
              <p className="font-bold text-stone-900">{selectedAddress.fullName}</p>
              <p className="mt-1">{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pinCode}</p>
              <p className="text-sm mt-1">{selectedAddress.phone}</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="grid grid-cols-1 gap-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    "relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 group bg-white",
                    selectedMethod === method.id
                      ? "border-stone-900 ring-1 ring-stone-900"
                      : "border-stone-200 hover:border-stone-400 hover:shadow-[6px_6px_15px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:-translate-x-1"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                        selectedMethod === method.id ? "bg-stone-900 text-white" : "bg-white text-stone-400 border border-stone-100"
                      )}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 text-lg">{method.name}</p>
                        <p className="text-stone-500 text-sm">{method.description}</p>
                      </div>
                    </div>
                    {selectedMethod === method.id && (
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
            <ShieldCheck className="h-5 w-5" />
            <p className="text-sm font-medium">Your payment is secured with 256-bit encryption</p>
          </div>

          <Button
            size="lg"
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full h-16 text-xl font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-600/20 rounded-2xl transition-all active:scale-[0.98]"
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Processing...
              </div>
            ) : (
              `Pay ₹${total} Securely`
            )}
          </Button>
        </div>
      </section>

      <section className="mt-16 lg:col-span-5 lg:mt-0 sticky top-24">
        <OrderSummary isCheckout={true} />
      </section>
    </motion.div>
  );
}
