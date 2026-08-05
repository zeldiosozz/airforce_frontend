import { ProductsSchema } from "@/app/lib/types";
import { NextResponse } from "next/server";

export async function GET(){
try{
const res  = await fetch(`${process.env.API_URL}/products-details/`,
  {
    method:"GET",
    credentials:"include"
  }
)
  if(!res.ok){
  throw new Error(`failed to retrieve products data ${res.status}`);
}

  return NextResponse.json(ProductsSchema.parse(await res.json()));
}catch(error){
  console.error("failed to retrieve products data", error)
  return NextResponse.json({status:500});
}
}