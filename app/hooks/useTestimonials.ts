import { Testimonial } from "../lib/types";

export async function fetchTestimonials(): Promise<Testimonial[]>{
try{
const res  = await fetch(`/api/testimonials`,{cache: 'no-store'})
  if(!res.ok){
  throw new Error(`failed to retrieve data ${res.status}`);
}
    return await res.json()
}catch(error){
  console.error("failed to retrieve data", error)
  return [];
}
}