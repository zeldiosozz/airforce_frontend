"use client"
import { useEffect, useState } from "react";
import { Cart } from "../lib/types";
export const default_cart: Cart ={
            total_items:0,
            total_price:"0",
            shipping_fee:"0", 
            items:[]
        }
export async function getCart(): Promise<Cart>{
    const res = await fetch("/api/cart",
        {
            method:"GET",
            credentials:"include"
        })
    return await res.json();
}
export async function addToCart(variant_size:number):Promise<Cart>{
    const res = await fetch("/api/cart/items/add",
        {   
            method:"POST",
            credentials:"include",
            body: JSON.stringify({variant_size})
        })
    return await res.json();


}
export async function updateCartItemAPI(variant_size:number, action:string):Promise<Cart>{

    const res = await fetch("/api/cart/items/quantity",
        {
            method:"POST",
            credentials:"include",
            body: JSON.stringify({variant_size, action})
        })
    return await res.json();
}

export async function removeCartItemAPI(variant_size:number):Promise<Cart>{
    const res = await fetch("/api/cart/items/remove",
        {
            method:"POST",
            credentials:"include",
            body: JSON.stringify({variant_size})
        })
    return await res.json();
}
export async function clearCartAPI():Promise<Cart>{
    const res = await fetch("/api/cart/clear",
        {
            method:"POST",
            credentials:"include",
        })
    return await res.json();
}

export default function useCart(){
const [cart, setCart] = useState<Cart>(default_cart);
const [updatingId, setUpdatingId] = useState<number | null>(null)
    useEffect(()=>{
        async function loadCart(){
            const cart = await getCart()
            setCart(cart)
        }
        loadCart()
    },[])

const [isCartOpen, setIsCartOpen] = useState(false);
const handleAddToCart = async (variant_size:number) => {
    const cart = await addToCart(variant_size);
        setCart(cart)
        setIsCartOpen(true);
      };
    
const handleUpdateQuantity = async (itemId: number, action: string) => {
    if (!["increment", "decrement"].includes(action)) return;
    setUpdatingId(itemId)
    try{
    const cart = await updateCartItemAPI(itemId, action);
    if (cart.total_items === 0) setIsCartOpen(false);
        setCart(cart);

    }finally{
    setUpdatingId(null)
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    setCart(await removeCartItemAPI(itemId));
  };

  const handleClearCart = async () => {
    setCart(await clearCartAPI());
  };
  return {
     cart,
     updatingId,
     isCartOpen,
     setIsCartOpen,
     handleAddToCart,
     handleClearCart,
     handleRemoveItem, 
     handleUpdateQuantity
    }


}