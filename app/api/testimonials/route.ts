import { TestimonialSchema } from "@/app/lib/types";
import { NextResponse } from "next/server";

export async function GET(){
try{
const res  = await fetch(`${process.env.API_URL}/testimonials/`,{
    method:"GET",
    credentials:"include"
})
  if(!res.ok){
  throw new Error(`failed to retrieve testimonials data ${res.status}`);
}

  return NextResponse.json(TestimonialSchema.parse(await res.json()));
}catch(error){
  console.error("failed to retrieve testimonials data", error)
  return NextResponse.json({status:500});
}
}
// export async function GET():Promise<Testimonial[]>{
//   try{
//     const res = await fetch(`${process.env.API_URL}/testimonials`)
//     if(!res.ok){
//       throw new Error("failed to fetch testimonials data")
//     } 
//     const data = await res.json()
//     return data.map((d:any)=>({
//       id:d.id,
//       name: d.name,
//       role: d.role,
//       comment: d.comment,
//       rating: Number(d.rating) | 0,
//       avatar: d.avatar
//     }))
//   }catch(error){
//     console.error("failed to fetch testimonials data", error)
//     return []
//   }
// }
