import { NextResponse } from "next/server";

const memoryStore = globalThis as typeof globalThis & {
  concertStatusStore: Record<string, "before" | "playing" | "break" | "ended">;
};

if (!memoryStore.concertStatusStore) {
  memoryStore.concertStatusStore = {};
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json();
  const status = body.status as "before" | "playing" | "break" | "ended";

  memoryStore.concertStatusStore[slug] = status;

  return NextResponse.json({
    ok: true,
    concertStatus: memoryStore.concertStatusStore[slug],
  });
}