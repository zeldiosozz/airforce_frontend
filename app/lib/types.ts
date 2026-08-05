import {z} from "zod";

const ColorSchema = z.object({
  id:z.number(),
  name: z.string(),
  hex: z.string(),
})
const ImageSchema = z.object({
  image:z.string()
})

export const VariantSizeSchema = z.object({
  id:z.number(),
  variant_id:z.number(),
  size:z.string(),
  stock: z.string(),
})
export const ProductVariantsSchema = z.object({
  id: z.number(),
  color: z.object(ColorSchema),
  images: z.array(ImageSchema),
  sizes: z.array(VariantSizeSchema),
})
export const ProductsSchema = z.object(
{
            id: z.number(),
            slug: z.string(),
            name: z.string(),
            category: z.string(),
            price: z.string(),
            rating: z.string(),
            review_count: z.number(),
            variants: z.array(ProductVariantsSchema),
            description: z.string(),
            badge: z.string(),
            is_trending: z.boolean(),
})
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
  total_items: z.number(),
  total_price: z.string(),
  shipping_fee: z.string(),
  items: z.array(CartItemSchema),
});
export const payloadSchema = z.object({
      full_name: z.string(),
      address: z.string(),
      google_maps_link: z.string(),
      phone_number: z.string(),
    });

export const TestimonialSchema = z.object({
      id:z.string(),
      name: z.string(),
      role: z.string(),
      comment: z.string(),
      rating: z.number() ,
      avatar: z.string(),
})
export type Products = z.infer<typeof ProductsSchema>;
export type VariantSize = z.infer<typeof VariantSizeSchema>;
export type ProductVariants = z.infer<typeof ProductVariantsSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
export type payload = z.infer<typeof payloadSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;










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
// export interface Testimonial {
//   id: string;
//   name: string;
//   role: string;
//   rating: number;
//   comment: string;
//   avatar: string;
// }

