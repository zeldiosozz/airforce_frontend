import { NextRequest, NextResponse } from "next/server";
import {cookies} from "next/headers"
export async function POST(request: NextRequest){
        try{
        const res = await fetch(`${process.env.API_URL}/checkout/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Cookie: (await cookies()).toString()

            },
            body: await request.text()
        },)
        if(!res.ok) return NextResponse.json(await res.json(), {status:res.status})
            return NextResponse.json(await res.json(), {status:res.status}); 
        }catch(error){
            console.log(error)
            return NextResponse.json({status:500});
        }
    
}