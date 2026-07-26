import { useState } from "react";
import { useLocalStorageCart } from "./useLocalStorageCart";
import { Product } from "../lib/data/products";

export default function useCart(){
const [cartItems, setCartItems] = useLocalStorageCart();
const [isCartOpen, setIsCartOpen] = useState(false);
const handleAddToCart = (product: Product, size: number, colorId: string) => {
const itemId = `${product.id}-${size}-${colorId.replace("#", "")}`;
      
        setCartItems((prevItems) => {
          const existingIdx = prevItems.findIndex((item) => item.id === itemId);
          if (existingIdx > -1) {
            return prevItems.map((item, idx) =>
              idx === existingIdx
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            );
          } else {
            return [...prevItems, { id: itemId, product, size, colorId, quantity: 1 }];
          }
        });
      
        setIsCartOpen(true);
      };
    
const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };
  return {
     cartItems,
     isCartOpen,
     setIsCartOpen,
     handleAddToCart,
     handleClearCart,
     handleRemoveItem, 
     handleUpdateQuantity
    }


}