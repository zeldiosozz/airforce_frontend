import { NextRequest, NextResponse } from "next/server";
import {cookies} from 'next/headers'
import { default_cart } from "@/app/hooks/useCartt";
import { CartSchema } from "@/app/lib/types";
export async function POST(request: NextRequest){
try{
        const res = await fetch(`${process.env.API_URL}/cart/items/quantity/`, 
            {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            Cookie: (await cookies()).toString()
        },
        body: await request.text()

    },)
    if(!res.ok) throw new Error("failed to update quantity cart items data to the cart")
    return NextResponse.json(CartSchema.parse(await res.json()), {status: res.status}); 

}catch(error){
    console.error("failed to update quantity cart items data, ", error)
    return NextResponse.json(default_cart);
}
}