// app/lib/data/orders.ts
export interface OrderPayload {
  address: string;
  google_maps_link: string;
  phone: string;
  items: {
    product_id: number;
    variant_size: string;
    quantity: number;
  }[];
}

export async function createOrder(payload: OrderPayload) {
  const res = await fetch(`${process.env.API_URL}/api/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(JSON.stringify(errorData));
  }

  return await res.json();
}