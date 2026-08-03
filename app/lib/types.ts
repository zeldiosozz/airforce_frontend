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
export interface CartItem {
  product: Product;
  selectedColor: {
    name: string;
    class: string;
    hex: string;
  };
  selectedSize: number;
  quantity: number;
}
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}
export interface CartItem{
  id: number,
  product_name: string,
  image: string,
  color: string,
  size: string,
  quantity: number,
  unit_price: string,
  subtotal: string,

}
export interface Cart{
  session_key: string,
  total_items: number,
  total_price: string, //decimal
  items:CartItem[],

}