// app/page.tsx
import { fetchProducts, fetchTestimonials } from "@/app/lib/data/products";
import App from "@/app/components/App";
import Testimonials from "@/app/components/Testimonials";

export default async function Page() {
  const rawProducts = await fetchProducts();
  const TESTIMONIALS = await fetchTestimonials();
  return (<>
<App rawProducts={rawProducts} rawTestimonials={TESTIMONIALS} />;
</>)
}