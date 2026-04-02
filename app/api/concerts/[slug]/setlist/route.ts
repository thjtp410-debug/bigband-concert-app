import { NextResponse } from "next/server";
import { fetchConcertSetlist } from "@/lib/microcs/queries";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const setlist = await fetchConcertSetlist(slug);

  return NextResponse.json(setlist);
}