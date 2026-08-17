// app/context/CartContext.tsx
"use client";
import { createContext, useContext, ReactNode } from "react";
import useCart from "../hooks/useCartt";

type CartContextType = ReturnType<typeof useCart>;

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();
  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside a CartProvider");
  }
  return context;
}