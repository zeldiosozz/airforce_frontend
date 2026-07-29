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

export default function useCart(){
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    useEffect(()=>{
        async function loadCart(){
            const cart = await getCart()
            setCartItems(cart.items)
        }
        loadCart()
    },[])
const [cart, setCart] = useState<Cart>({
    session_key:"", 
    total_items:0,
    total_price:"0", 
    items:[]
});
const [isCartOpen, setIsCartOpen] = useState(false);
const handleAddToCart = async (variant_size:VariantSize, quantity:number= 1) => {
    const cart = await addToCart(variant_size.id, quantity);
        setCartItems(cart.items)
        setIsCartOpen(true);
      };
    
const handleUpdateQuantity = async (itemId: string, delta: number) => {
    const cart = await updateCartItem(itemId, delta)
    setCartItems(cart.items);
  };

  const handleRemoveItem = async (itemId: string) => {
    const cart = await removeCartItem(itemId)
    setCartItems(cart.items);
  };

  const handleClearCart = async () => {
    const cart = await clearCart();
    setCartItems(cart.items);
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