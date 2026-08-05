import { url } from "inspector";
import { number } from "motion";
import { describe } from "node:test";
import { name } from "typescipt";
import {Products, Testimonial } from "../types";
export async function fetchProducts(): Promise<Products[]>{
try{
const res  = await fetch(`/api/products/`)
  if(!res.ok){
  throw new Error(`failed to retrieve data ${res.status}`);
}

return await res.json();
}catch(error){
  console.error("failed to retrieve data", error)
  return [];
}
}
export async function fetchTestimonials():Promise<Testimonial[]>{
  try{
    const res = await fetch(`/api/testimonials`)
    if(!res.ok){
      throw new Error("failed to fetch testimonials data")
    } 
    return await res.json()
  }catch(error){
    console.error("failed to fetch testimonials data", error)
    return []
  }
}




