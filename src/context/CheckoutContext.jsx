import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_CART_DATA } from '../data/mockData';

const CheckoutContext = createContext();

const STORAGE_KEY = 'ecoyaan_checkout_data';

export function CheckoutProvider({ children }) {
  const [items, setItems] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setItems(parsed.items || []);
        setAddresses(parsed.addresses || []);
        setSelectedAddressId(parsed.selectedAddressId || null);
        setShippingFee(parsed.shippingFee || 50);
        setDiscount(parsed.discount || 0);
        setLoading(false);
        return;
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }

    // Fallback to mock data if nothing saved
    const fetchData = async () => {
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

  // Persist data whenever it changes
  useEffect(() => {
    if (!loading) {
      const dataToSave = {
        items,
        addresses,
        selectedAddressId,
        shippingFee,
        discount
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [items, addresses, selectedAddressId, shippingFee, discount, loading]);

  const updateQuantity = (id, quantity) => {
    if (quantity < 0) return;
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const addAddress = (address) => {
    const newAddress = { ...address, id: Date.now().toString() };
    setAddresses(prev => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
  };

  const removeAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
  };

  const selectAddress = (id) => {
    setSelectedAddressId(id);
  };

  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal > 0 ? subtotal + shippingFee - discount : 0;

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);

  return (
    <CheckoutContext.Provider value={{
      items,
      shippingFee,
      discount,
      addresses,
      selectedAddressId,
      selectedAddress,
      addAddress,
      removeAddress,
      selectAddress,
      updateQuantity,
      removeItem,
      addItem,
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
