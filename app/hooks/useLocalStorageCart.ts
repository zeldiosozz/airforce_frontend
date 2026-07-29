// app/hooks/useLocalStorageCart.ts
import { useState, useEffect } from "react";
import type { CartItemm } from "@/app/components/CartDrawer";

const CART_STORAGE_KEY = "airforce_cart";

export function useLocalStorageCart() {
  const [cartItems, setCartItems] = useState<CartItemm[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse saved cart:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {  
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  return [cartItems, setCartItems] as const;
}