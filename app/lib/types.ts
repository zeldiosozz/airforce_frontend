import {z} from "zod";

const ColorSchema = z.object({
  id:z.number(),
  name: z.string(),
  hex_code: z.string(),
})
const ImageSchema = z.object({
  image:z.string()
})

export const VariantSizeSchema = z.object({
  id:z.number(),
  size:z.string(),
  stock: z.number(),
})
export const ProductVariantsSchema = z.object({
  id: z.number(),
  color: ColorSchema,
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
      id:z.number(),
      name: z.string(),
      role: z.string(),
      comment: z.string(),
      rating: z.string() ,
      avatar: z.string(),
})
export type Products = z.infer<typeof ProductsSchema>;
export type VariantSize = z.infer<typeof VariantSizeSchema>;
export type ProductVariants = z.infer<typeof ProductVariantsSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
export type payload = z.infer<typeof payloadSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
type Image = z.infer<typeof ImageSchema>
type Color = z.infer<typeof ColorSchema>









// ===== Default Values =====

export const defaultImage: Image = {
image:""
};

export const defaultColor: Color = {
  id:0,
  name:"",
  hex_code:"",
};

export const defaultVariantSize: VariantSize = {
  id: 0,
  size: "41",
  stock: 0,
};

export const defaultProductVariant: ProductVariants = {
  id: 0,
  color: {
    id:0,
    name: "white",
    hex_code: "#ffffff",
  },
  images: [],
  sizes: [],
};

export const defaultProduct: Products = {
  id: 0,
  slug: "",
  name: "",
  category: "",
  price: "0",
  rating: "0",
  review_count: 0,
  variants: [],
  description: "",
  badge: "",
  is_trending: false,
};

export const defaultCartItem: CartItem = {
  id: 0,
  product_name: "",
  image: "",
  color: "",
  size: "",
  quantity: 0,
  unit_price: "0",
  subtotal: "0",
};

export const defaultCart: Cart = {
  total_items: 0,
  total_price: "0",
  shipping_fee: "0",
  items: [],
};

export const defaultPayload: payload = {
  full_name: "",
  address: "",
  google_maps_link: "",
  phone_number: "",
};

export const defaultTestimonial: Testimonial = {
  id: 0,
  name: "",
  role: "",
  comment: "",
  rating: "0",
  avatar: "",
};