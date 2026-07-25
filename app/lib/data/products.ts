import { number } from "motion";

export interface ProductImage{
  id:string,
  url:string,
}
export interface Product {
  id: string;
  name: string;
  category: 'Running' | 'Formal' | 'Casual' | 'Basketball' | 'Training';
  price: number;
  image: productImage[] ;
  colors: {id:string, hex:string}[];
  sizes: number[];
  rating: number;
  reviewsCount: number;
  description: string;
  badge?: string;
  isTrending?: boolean;
}
export interface productImage {
  id:string,
  url:string,
}
interface Products
{
            id: number,
            slug: string,
            name: string,
            category: string,
            price: string,
            variants: ProductVariants[],
            main_image: string,
            rating: string,
            review_count: number,
            description: string,
            badge: string,
            is_trending: boolean,
}

interface ProductVariants{
  id: number,
  product: number,
  size: string,
  color: string,
  stock: number,
  extra_price: number,
}
interface ProductImages{
  id: number,
  variant: number,
  image: string,
  alt_text: string,
}
export default async function fetchProducts(): Promise<Products[] | null>{
const res  = await fetch("http://127.0.0.1:8000/api/products/")
try{
  if(!res.ok){
  throw new Error(`failed to retrieve data ${res.status}`);
}

  const data: Products[] = await res.json()
return data
}catch(error){
  console.error("failed to retrieve data", error)
  return null;
}
}
export async function fetchProductImages(): Promise<ProductImages[] | null>{
const res  = await fetch("http://127.0.0.1:8000/api/products-images/")
try{
  if(!res.ok){
  throw new Error(`failed to retrieve data ${res.status}`);
}

  const data: ProductImages[] = await res.json()
return data
}catch(error){
  console.error("failed to retrieve data", error)
  return null;
}
}


export const PRODUCTS: Product[] = [
  {
    id: "airforce_1",
    name: "AirForce 1",
    category: "Formal",
    price: 450,
    image: [{id:"white",url:"/images/a0.png"},{id:"black",url:"/images/a00.png"}],
    rating: 4.9,
    reviewsCount: 142,
    colors: [{id:"white", hex:"#ffffff"}, {id:"black", hex:"#000000"}], // White, Black
    sizes: [41, 42, 43, 44, 45],
    description: "More than a sneaker, the Air Force 1 is a symbol of enduring style. This collection highlights its refined details, bold character, and the craftsmanship behind one of the world's most recognizable silhouettes.",
    badge: "Best Seller",
    isTrending: true
  },
];
export const BRANDS = [
  { name: "Running", count: 2 },
  { name: "Casual", count: 1 },
  { name: "Basketball", count: 1 },
  { name: "Training", count: 0 }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul Krishnan",
    role: "Marathon Runner, Kochi",
    comment: "The Spike AeroX 1 is a game changer. I shaved 2 minutes off my half-marathon time. The carbon spike plate gives an incredible spring in every step, and the orange style stands out beautifully!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    name: "Aparna Nair",
    role: "Fitness Coach, Trivandrum",
    comment: "I wear the Spike Nitro Burn during long functional training sessions. The cushion supports my feet perfectly, and they hold up incredibly well under high impacts. True Kerala craftsmanship!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    name: "John Mathews",
    role: "Sneaker Enthusiast, Bangalore",
    comment: "Absolutely love the Air Casual. Clean lines, gorgeous electric blue colorway, and supreme comfort. It goes with literally everything. The packaging was top notch, too!",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&h=150&q=80"
  }
];

function transformProducts(products: Products[],
  variants: ProductVariants[],
  images: ProductImages[]){
    return products.map((product)=>{
      const productVariants = variants.filter((v)=> v.id === product.id)
      const uniqueColors = [...new Set(productVariants.map((v)=>v.color))]
      const uniqueSizes = [...new Set(productVariants.map((v)=>Number(v.size)))]
      .filter((size)=>!isNaN(size))
      .sort((a, b) => a - b);

      const variantIds = productVariants.map((v)=> v.id);
      const productImages = images.filter(
      (img)=> variantIds.includes(img.variant));
      const imageList = productImages.map((img)=>{
      const relatedVariant = productVariants.find((v)=> v.id === img.variant);
        
        return{

        }
      })








    })



    }


