"use client"
import { Products } from "../lib/types";
import { useState, useEffect } from "react";
export async function fetchProducts(): Promise<Products[]>{
try{
const res = await fetch(`/api/products`, {cache: 'no-store'});
if(!res.ok){
  throw new Error(`failed to retrieve data ${res.status}`);
}

return await res.json();
}catch(error){
  console.error("failed to retrieve data", error)
  return [];
}
}

export default function useProducts(){
    const [products, setProducts] = useState<Products[]>([]);
    useEffect(()=>{
        async function loadProducts(){
            setProducts(await fetchProducts())
        }
        loadProducts()
    },[])

    return {products}

}