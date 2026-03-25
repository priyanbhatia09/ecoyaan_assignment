import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, CheckCircle, Truck, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.svg';
import { useCheckout } from '@/context/CheckoutContext';
import { Button } from '@/components/ui/Button';

const steps = [
  { path: '/cart', label: 'Cart', icon: ShoppingBag },
  { path: '/shipping', label: 'Shipping', icon: Truck },
  { path: '/payment', label: 'Payment', icon: CreditCard },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, items, selectedAddressId } = useCheckout();
  const currentStepIndex = steps.findIndex((step) => step.path === location.pathname);

  const handleNext = () => {
    if (currentStepIndex === 0) navigate('/shipping');
    if (currentStepIndex === 1) navigate('/payment');
  };

  const handleBack = () => {
    if (currentStepIndex === 1) navigate('/cart');
    if (currentStepIndex === 2) navigate('/shipping');
  };

  const isNextDisabled = () => {
    if (items.length === 0) return true;
    if (currentStepIndex === 1 && !selectedAddressId) return true;
    return false;
  };

  const nextButtonLabel = () => {
    if (currentStepIndex === 0) return 'Shipping Details';
    if (currentStepIndex === 1) return 'Continue to Payment';
    return null;
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] font-sans text-stone-900 pb-32">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="transition-transform group-hover:scale-110 duration-300">
              <img src={logo} alt="Ecoyaan" className="h-10 w-10" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">Ecoyaan</span>
          </Link>
          
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="hidden sm:flex items-center gap-8">
              {currentStepIndex !== -1 && steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = location.pathname === step.path;
                const isCompleted = index < currentStepIndex;
                return (
                  <div key={step.path} className="flex items-center gap-2">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                      isActive ? "bg-stone-900 text-white shadow-lg scale-110" : 
                      isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-stone-100 text-stone-400"
                    )}>
                      {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      isActive ? "text-stone-900" : "text-stone-400"
                    )}>
                      {step.label}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="ml-4 h-px w-8 bg-stone-200" />
                    )}
                  </div>
                );
              })}
            </div>

            <Link to="/cart" className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Mobile Progress Steps */}
        {currentStepIndex !== -1 && (
          <div className="sm:hidden mb-8 flex justify-between px-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = location.pathname === step.path;
              const isCompleted = index < currentStepIndex;
              return (
                <div key={step.path} className="flex flex-col items-center gap-1">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                    isActive ? "bg-stone-900 text-white shadow-md scale-110" : 
                    isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-stone-100 text-stone-400"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider", isActive ? "text-stone-900" : "text-stone-400")}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <Outlet />
      </main>

      {/* Sticky Bottom Action Bar */}
      {currentStepIndex !== -1 && currentStepIndex < 2 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-white/90 backdrop-blur-lg p-4 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="text-sm text-stone-500 font-medium">Total Amount</p>
              <p className="text-2xl font-bold text-stone-900">₹{total}</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {currentStepIndex > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="flex-1 sm:flex-none h-12 px-6 border-stone-200 hover:bg-stone-50"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
              )}
              
              <Button 
                onClick={handleNext}
                disabled={isNextDisabled()}
                className={cn(
                  "flex-1 sm:flex-none h-12 px-8 bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 transition-all active:scale-95",
                  isNextDisabled() && "opacity-50 grayscale"
                )}
              >
                {nextButtonLabel()}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
