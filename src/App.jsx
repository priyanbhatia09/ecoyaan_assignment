import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CheckoutProvider } from '@/context/CheckoutContext';
import { Layout } from '@/components/layout/Layout';
import { ProductsPage } from '@/pages/ProductsPage';
import { CartPage } from '@/pages/CartPage';
import { ShippingPage } from '@/pages/ShippingPage';
import { PaymentPage } from '@/pages/PaymentPage';

export default function App() {
  return (
    <CheckoutProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="shipping" element={<ShippingPage />} />
            <Route path="payment" element={<PaymentPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CheckoutProvider>
  );
}
