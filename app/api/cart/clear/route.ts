import { NextRequest, NextResponse } from "next/server";
import {cookies} from 'next/headers'
import { default_cart } from "@/app/hooks/useCartt";
import { CartSchema } from "@/app/lib/types";
export async function POST(request: NextRequest){
try{
        const res = await fetch(`${process.env.API_URL}/cart/delete/`, 
            {
        method: "DELETE",
        headers: {
            "Content-Type":"application/json",
            Cookie: (await cookies()).toString()
        }
    },)
    if(!res.ok) return NextResponse.json(await res.json(), {status: res.status}); 
    return NextResponse.json(CartSchema.parse(await res.json()), {status: res.status}); 

}catch(error){
    return NextResponse.json(default_cart,{status:500});
}
}