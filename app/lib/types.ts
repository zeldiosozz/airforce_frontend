// export interface Product {
//   id: string;
//   name: string;
//   category: string;
//   subCategory: string;
//   price: number;
//   originalPrice?: number;
//   rating: number;
//   reviewsCount: number;
//   description: string;
//   features: string[];
//   image: string; // default image
//   images: {
//     [colorName: string]: string; // map color names to different images
//   };
//   colors: {
//     name: string;
//     class: string; // Tailwind bg class for swatch
//     hex: string;
//   }[];
//   sizes: number[];
//   isNew?: boolean;
//   isSale?: boolean;
// }
export interface productImage {
  id:string,
  url:string,
}

export interface Product {
  id: string;
  name: string;
  category: string,
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
// export interface CartItem {
//   id: string; // unique item id based on product + size + color
//   product: Products;
//   variant_size: VariantSize;
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