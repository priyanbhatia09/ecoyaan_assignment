import bambooToothbrushImg from '@/assets/bamboo-toothbrush.jpeg';
import cottonBagsImg from '@/assets/reused-cotton-produce-bags.jpeg';

export const MOCK_CART_DATA = {
  cartItems: [
    {
      product_id: 101,
      product_name: "Bamboo Toothbrush (Pack of 4)",
      product_price: 299,
      quantity: 2,
      image: bambooToothbrushImg
    },
    {
      product_id: 102,
      product_name: "Reusable Cotton Produce Bags",
      product_price: 450,
      quantity: 1,
      image: cottonBagsImg
    }
  ],
  shipping_fee: 50,
  discount_applied: 0
};
