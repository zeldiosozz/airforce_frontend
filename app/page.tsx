// app/page.tsx
import { fetchProducts, fetchTestimonials } from "@/app/lib/data/products";
import App from "@/app/components/App";
export default async function Page() {
  const PRODUCTS = await fetchProducts();
  const TESTIMONIALS = await fetchTestimonials();
  return (<>
<App PRODUCTS={PRODUCTS} rawTestimonials={TESTIMONIALS} />;
</>)
}