import { default_cart } from "@/app/hooks/useCartt";
import { CartSchema } from "@/app/lib/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(){
    try{
    const res = await fetch(`${process.env.API_URL}/cart/list/`,
        {
        headers:{
                Cookie: (await cookies()).toString()
            }
        })
    if(!res.ok) throw new Error("failed to get Cart items data")
    const data = CartSchema.parse(await res.json());
    return NextResponse.json(data);
}catch(error){
    console.error("failed to get cart items data, ", error)
    return NextResponse.json(default_cart, {status:500});
}
}