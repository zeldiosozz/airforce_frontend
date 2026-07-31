import { useEffect, useState } from "react";
import { useLocalStorageCart } from "./useLocalStorageCart";
import { Products, VariantSize } from "../lib/data/products";
import { Variant } from "motion";
import { CartItem, Cart } from "../lib/types";

export async function getCart(): Promise<Cart>{
    try{
    const res = await fetch("http://127.0.0.1:8000/cart/",{credentials:"include"})
    if(!res.ok) throw new Error("failed to get Cart items data")
        return res.json()
}catch(error){
    console.log("failed to get cart items data, ", error)
    return( 
        {
            session_key:"", 
            total_items:0,
            total_price:"0", 
            items:[]
        }
                )
}
}
export async function addToCart(variant_size:number, quantity:number):Promise<Cart>{
    const res = await fetch("http://127.0.0.1:8000/cart/items", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        credentials: "include",
        body: JSON.stringify({
            variant_size,
            quantity
        })

    },)
    if(!res.ok) throw new Error("failed to post cart items data to the cart")
    return res.json()

}
export async function updateCartItemAPI(itemId:number, delta:number):Promise<Cart>{
    const res = await fetch(`http://127.0.0.1:8000/cart/items/${itemId}`, {
        method: "PATCH",
        headers: {"Content-Type":"application/json"},
        credentials: "include",
        body: JSON.stringify({
            delta
        })

    },)
    if(!res.ok) throw new Error("failed to post cart items data to the cart")
    return res.json()

}
export async function removeCartItemAPI(itemId:number):Promise<Cart>{
    const res = await fetch(`http://127.0.0.1:8000/cart/items/${itemId}`, {
        method: "DELETE",
        credentials: "include",
    },)
    if(!res.ok) throw new Error("failed to post cart items data to the cart")
    return res.json()

}
export async function clearCartAPI():Promise<Cart>{
    const res = await fetch("http://127.0.0.1:8000/cart/", {
        method: "DELETE",
        credentials: "include",
    },)
    if(!res.ok) throw new Error("failed to post cart items data to the cart")
    return res.json()

}

export default function useCart(){
const [cart, setCart] = useState<Cart>({
    session_key:"", 
    total_items:0,
    total_price:"0", 
    items:[]
});
    useEffect(()=>{
        async function loadCart(){
            const cart = await getCart()
            setCart(cart)
        }
        loadCart()
    },[])
const [isCartOpen, setIsCartOpen] = useState(false);
const handleAddToCart = async (variant_size:VariantSize, quantity:number= 1) => {
    const cart = await addToCart(variant_size.id, quantity);
        setCart(cart)
        setIsCartOpen(true);
      };
    
const handleUpdateQuantity = async (itemId: number, delta: number) => {
    const cart = await updateCartItemAPI(itemId, delta)
    setCart(cart);
  };

  const handleRemoveItem = async (itemId: number) => {
    const cart = await removeCartItemAPI(itemId)
    setCart(cart);
  };

  const handleClearCart = async () => {
    const cart = await clearCartAPI();
    setCart(cart);
  };
  return {
     cart,
     isCartOpen,
     setIsCartOpen,
     handleAddToCart,
     handleClearCart,
     handleRemoveItem, 
     handleUpdateQuantity
    }


}