import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_CART_DATA } from '../data/mockData';

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [items, setItems] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingDetails, setShippingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mappedItems = MOCK_CART_DATA.cartItems.map(item => ({
        id: item.product_id,
        name: item.product_name,
        price: item.product_price,
        quantity: item.quantity,
        image: item.image
      }));
      
      setItems(mappedItems);
      setShippingFee(MOCK_CART_DATA.shipping_fee);
      setDiscount(MOCK_CART_DATA.discount_applied);
      setLoading(false);
    };

    fetchData();
  }, []);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + shippingFee - discount;

  return (
    <CheckoutContext.Provider value={{
      items,
      shippingFee,
      discount,
      shippingDetails,
      setShippingDetails,
      updateQuantity,
      removeItem,
      subtotal,
      total
    }}>
      {!loading && children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
