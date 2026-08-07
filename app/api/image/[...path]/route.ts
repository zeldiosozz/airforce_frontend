import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const res = await fetch(`${process.env.MEDIA_API_URL}/${path.join("/")}`);

  if (!res.ok) {
    return Response.redirect(
      new URL("/images/itemplaceholder.jpg", request.url)
    );
  }
  return new Response(res.body, {
    status: res.status,
    headers: {
      "Content-Type":
        res.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}