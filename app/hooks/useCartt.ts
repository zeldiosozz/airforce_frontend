import { useEffect, useState } from "react";
import { useLocalStorageCart } from "./useLocalStorageCart";
import { Products, VariantSize } from "../lib/types";
import { Variant } from "motion";
import { CartSchema, Cart } from "../lib/types";
const default_cart: Cart ={
            session_key:"", 
            total_items:0,
            total_price:"0", 
            items:[]
        }
export async function getCart(): Promise<Cart>{
    try{
    const res = await fetch(`${process.env.API_URL}/cart/`,{credentials:"include"})
    if(!res.ok) throw new Error("failed to get Cart items data")
        return CartSchema.parse(await res.json());
}catch(error){
    console.log("failed to get cart items data, ", error)
    return default_cart;
}
}
export async function addToCart(variant_size:number):Promise<Cart>{
    try{
    const res = await fetch(`${process.env.API_URL}/cart/items/add/`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        credentials: "include",
        body: JSON.stringify({
            variant_size
        })
    },)
    if(!res.ok) throw new Error("failed to post cart items data to the cart")
    return CartSchema.parse(await res.json()); 
    }catch(error){
        console.log("failed to add to cart items data, ", error)
        return default_cart;
    }


}
export async function updateCartItemAPI(variant_size:number, action:string):Promise<Cart>{

try{
        const res = await fetch(`${process.env.API_URL}/cart/items/quantity/`, {
        method: "PATCH",
        headers: {"Content-Type":"application/json"},
        credentials: "include",
        body: JSON.stringify({
            variant_size,
            action
        })

    },)
    if(!res.ok) throw new Error("failed to update quantity cart items data to the cart")
    return CartSchema.parse(await res.json()); 

}catch(error){
    console.log("failed to update quantity cart items data, ", error)
    return default_cart;
}
}

export async function removeCartItemAPI(variant_size:number):Promise<Cart>{
try{
        const res = await fetch(`${process.env.API_URL}/cart/items/delete/`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            variant_size
        })
    },)
    if(!res.ok) throw new Error("failed to post cart items data to the cart")
    return CartSchema.parse(await res.json()); 

}catch(error){
    console.log("failed to remove cart items data, ", error)
    return default_cart;
}
}
export async function clearCartAPI():Promise<Cart>{
try{
        const res = await fetch(`${process.env.API_URL}/cart/delete/`, {
        method: "DELETE",
        credentials: "include",
    },)
    if(!res.ok) throw new Error(`${res.status}, failed to post cart items data to the cart`)
    return CartSchema.parse(await res.json()); 

}catch(error){
    console.log("failed to clear cart items data, ", error)
    return default_cart;
}
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
const handleAddToCart = async (variant_size:number) => {
    const cart = await addToCart(variant_size);
        setCart(cart)
        setIsCartOpen(true);
      };
    
const handleUpdateQuantity = async (itemId: number, action: string) => {
    if (["increment", "decrement"].includes(action)) return;
    const cart = await updateCartItemAPI(itemId, action);
    if (cart.total_items === 0) setIsCartOpen(false);
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