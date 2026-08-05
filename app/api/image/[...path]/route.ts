import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  const backendUrl =
    `${process.env.MEDIA_API_URL}/${path.join("/")}`;

  const res = await fetch(backendUrl);

  if (!res.ok) {
  console.log(backendUrl)
    return Response.redirect(
      new URL("/images/itemplaceholder.jpg", request.url)
    );
  }
  console.log(backendUrl)
  return new Response(res.body, {
    status: res.status,
    headers: {
      "Content-Type":
        res.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}