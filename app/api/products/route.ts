export async function GET(){
try{
const res = await fetch(`${process.env.API_URL}/products-details/`, {cache: 'no-store'});
if(!res.ok){
  throw new Error(`failed to retrieve data ${res.status}`);
}

return Response.json(await res.json());
}catch(error){
  console.error("failed to retrieve data", error)
  return [];
}
}