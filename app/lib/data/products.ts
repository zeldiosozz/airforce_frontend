import { url } from "inspector";
import { number } from "motion";
import { describe } from "node:test";
import { name } from "typescipt";
import { Product, Products, Testimonial } from "../types";
export async function fetchProducts(): Promise<Products[]>{
try{
const res  = await fetch(`${process.env.API_URL}/api/products-details/`)
  if(!res.ok){
  throw new Error(`failed to retrieve data ${res.status}`);
}

  const data: Products[] = await res.json();
return data
}catch(error){
  console.error("failed to retrieve data", error)
  return [];
}
}


export function transformProducts(products: Products[]):Product[]{
  return products.map((product)=>{
    const colors = product.variants.map((v)=>({
      name: v.color.name.toLocaleLowerCase(),
      hex: v.color.hex
    }))
    const images = product.variants.flatMap((v)=>
    v.images.map((i)=>({
      id: v.color.name.toLowerCase(),
      url: i.image,
    })))
    const uniqueSizes = new Set<number>();
    product.variants.forEach((v)=>{
      v.sizes.forEach((s)=>uniqueSizes.add(Number(s.size)))
    })
    const sizes = Array.from(uniqueSizes).sort((a, b)=> a-b);
    return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    price: Number(product.price),
    image: images,
    colors: colors,
    sizes: sizes,
    rating: Number(product.rating),
    reviewsCount: product.review_count,
    description: product.description,
    badge: product.badge,
    isTrending: product.is_trending,
  }
  });
}
// export const rawProducts = await fetchProducts();
// export const PRODUCTS: Product[] = transformProducts(rawProducts);
// export const PRODUCTS: Product[] = [
//   {
//     id: "airforce_1",
//     name: "AirForce 1",
//     category: "Formal",
//     price: 450,
//     rating: 4.9,
//     reviewsCount: 142,
//     image: [{id:"white",url:"/images/a0.png"},{id:"black",url:"/images/a00.png"}],
//     colors: [{id:"white", hex:"#ffffff"}, {id:"black", hex:"#000000"}], // White, Black
//     sizes: [41, 42, 43, 44, 45],
//     description: "More than a sneaker, the Air Force 1 is a symbol of enduring style. This collection highlights its refined details, bold character, and the craftsmanship behind one of the world's most recognizable silhouettes.",
//     badge: "Best Seller",
//     isTrending: true
//   },
// ];
export const BRANDS = [
  { name: "Running", count: 2 },
  { name: "Casual", count: 1 },
  { name: "Basketball", count: 1 },
  { name: "Training", count: 0 }
];
export async function fetchTestimonials():Promise<Testimonial[]>{
  try{
    const res = await fetch(`${process.env.API_URL}/api/testimonials`)
    if(!res.ok){
      throw new Error("failed to fetch testimonials data")
    } 
    const data = await res.json()
    return data.map((d:any)=>({
      id:d.id,
      name: d.name,
      role: d.role,
      comment: d.comment,
      rating: Number(d.rating) | 0,
      avatar: d.avatar
    }))
  }catch(error){
    console.error("failed to fetch testimonials data", error)
    return []
  }
}
// export const TESTIMONIALS = await fetchTestimonials();
// export const TESTIMONIALS = [
//   {
//     id: 1,  
//     name: "Rahul Krishnan",
//     role: "Marathon Runner, Kochi",
//     comment: "The Spike AeroX 1 is a game changer. I shaved 2 minutes off my half-marathon time. The carbon spike plate gives an incredible spring in every step, and the orange style stands out beautifully!",
//     rating: 5,
//     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150&q=80"
//   },
//   {
//     id: 2,
//     name: "Aparna Nair",
//     role: "Fitness Coach, Trivandrum",
//     comment: "I wear the Spike Nitro Burn during long functional training sessions. The cushion supports my feet perfectly, and they hold up incredibly well under high impacts. True Kerala craftsmanship!",
//     rating: 5,
//     avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150&q=80"
//   },
//   {
//     id: 3,
//     name: "John Mathews",
//     role: "Sneaker Enthusiast, Bangalore",
//     comment: "Absolutely love the Air Casual. Clean lines, gorgeous electric blue colorway, and supreme comfort. It goes with literally everything. The packaging was top notch, too!",
//     rating: 4.8,
//     avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&h=150&q=80"
//   }
// ];




