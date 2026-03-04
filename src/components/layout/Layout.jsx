import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, CheckCircle, Truck, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.svg';

const steps = [
  { path: '/', label: 'Cart', icon: ShoppingBag },
  { path: '/shipping', label: 'Shipping', icon: Truck },
  { path: '/payment', label: 'Payment', icon: CreditCard },
];

export function Layout() {
  const location = useLocation();
  const currentStepIndex = steps.findIndex((step) => step.path === location.pathname);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Ecoyaan" className="h-10 w-10" />
            <span className="text-lg font-bold tracking-tight text-stone-900">Ecoyaan</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="relative flex justify-between">
            {/* Connecting Line */}
            <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-y-1/2 bg-stone-200" />
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = location.pathname === step.path;
              const isCompleted = index < currentStepIndex;

              return (
                <div key={step.path} className="flex flex-col items-center bg-stone-50 px-2 z-10">
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full transition-colors bg-stone-50',
                      isActive || isCompleted ? 'text-stone-900' : 'text-stone-400'
                    )}
                  >
                    <Icon className={cn("h-8 w-8", isActive && "scale-110 transition-transform")} />
                  </div>
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium',
                      isActive ? 'text-stone-900' : 'text-stone-500'
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
