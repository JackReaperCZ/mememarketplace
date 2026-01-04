import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import type { CartItem, Meme } from '../types';

interface CartContextType {
  cart: CartItem[];
  addItem: (meme: Meme) => void;
  removeItem: (id: string) => void;
  decreaseCount: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);

  const addItem = (meme: Meme) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === meme.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === meme.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...meme, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const decreaseCount = (id: string) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(0, item.quantity - 1) };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, decreaseCount, clearCart, getTotalPrice, getItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};


