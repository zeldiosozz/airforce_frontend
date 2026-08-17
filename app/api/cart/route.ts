import { default_cart } from "@/app/hooks/useCartt";
import { CartSchema } from "@/app/lib/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sessionCookie = (await cookies()).get("sessionid");

    const res = await fetch(`${process.env.API_URL}/cart/list/`, {
      headers: {
        Cookie: sessionCookie ? `sessionid=${sessionCookie.value}` : "",
      },
    });


    if (!res.ok) throw new Error("failed to get Cart items data");

    const data = CartSchema.parse(await res.json());
    const response = NextResponse.json(data);

    const cookiesArray = res.headers.getSetCookie?.() ?? [];
    cookiesArray.forEach((cookie) => {
      response.headers.append("set-cookie", cookie);
    });


    return response;
  } catch (error) {
    console.error("failed to get cart items data, ", error);
    return NextResponse.json(default_cart, { status: 500 });
  }
}