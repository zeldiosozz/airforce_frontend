import { Cart } from "../types";
export async function cartItems(variantId: number, quantity: number): Promise<Cart> {
  const res = await fetch(`${process.env.API_URL}/api/cart/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ variant_size: variantId, quantity: quantity }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(JSON.stringify(errorData));
  }

  return await res.json();
}