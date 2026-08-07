import { default_cart } from "@/app/hooks/useCartt";
import { CartSchema } from "@/app/lib/types";
import { NextRequest, NextResponse } from "next/server";
import {cookies} from "next/headers"
export async function POST(request: NextRequest){
        try{
        const res = await fetch(`${process.env.API_URL}/cart/items/add/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Cookie: (await cookies()).toString()

            },
            body: await request.text()
        },)
        if(!res.ok) return NextResponse.json(await res.json(), {status:res.status})
            return NextResponse.json(CartSchema.parse(await res.json()), {status:res.status}); 
        }catch(error){
            console.error("failed to add items to cart, ", error)
            return NextResponse.json(default_cart);
        }
    
}