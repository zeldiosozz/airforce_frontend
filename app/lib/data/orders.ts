// app/lib/data/orders.ts
import { payload } from "@/app/lib/types";

export async function createOrder(payload: payload) {
  console.log(payload)
try{
    const res = await fetch(`/api/checkout/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials:"include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
    return await res.json();

}catch(error){
    console.error("Error creating order:", error);
}
}