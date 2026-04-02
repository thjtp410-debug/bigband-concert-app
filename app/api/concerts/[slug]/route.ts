import { NextResponse } from "next/server";
import { fetchConcertDetail } from "@/lib/microcs/queries";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const concert = await fetchConcertDetail(slug);

  if (!concert) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json(concert, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}