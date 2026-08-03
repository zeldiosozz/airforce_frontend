import {z} from "zod";

export const CartItemSchema = z.object({
  id: z.number(),
  product_name: z.string(),
  image: z.string(),
  color: z.string(),
  size: z.string(),
  quantity: z.number(),
  unit_price: z.string(),
  subtotal: z.string(),
});

export const CartSchema = z.object({
  session_key: z.string(),
  total_items: z.number(),
  total_price: z.string(),
  items: z.array(CartItemSchema),
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;

export interface ProductImage{
  id:string,
  url:string,
}

export interface productImage {
  id:string,
  url:string,
}

interface Color{
  id:number,
  name: string,
  hex: string,
}
export interface VariantSize{
  id:number,
  variant_id:number,
  size:string,
  stock: string,
  // extra_price: string,
  // sku: string,

}
export interface ProductVariants{
  id: number,
  color: Color,
  images: Image[],
  sizes: VariantSize[],
}
interface Image{
  image:string
}

export interface Products
{
            id: number,
            slug: string,
            name: string,
            category: string,
            price: string,
            rating: string,
            review_count: number,
            variants: ProductVariants[],
            description: string,
            badge: string,
            is_trending: boolean,
}
export interface productImage {
  id:string,
  url:string,
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string,
  price: number;
  image: productImage[] ;
  colors: {name:string, hex:string}[];
  sizes: number[];
  rating: number;
  reviewsCount: number;
  description: string;
  badge?: string;
  isTrending?: boolean;
}
// export interface CartItem {
//   product: Product;
//   selectedColor: {
//     name: string;
//     class: string;
//     hex: string;
//   };
//   selectedSize: number;
//   quantity: number;
// }
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

