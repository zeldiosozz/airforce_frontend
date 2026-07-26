// app/lib/data/orders.ts
export interface OrderPayload {
  address: string;
  google_maps_link: string;
  phone: string;
  items: {
    product_id: number;
    size: string;
    color: string;
    quantity: number;
  }[];
}

export async function createOrder(payload: OrderPayload) {
  const res = await fetch("http://127.0.0.1:8000/api/orders/", {
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