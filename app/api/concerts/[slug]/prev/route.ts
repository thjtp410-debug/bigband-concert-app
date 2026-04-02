import { NextResponse } from "next/server";

const memoryStore = globalThis as typeof globalThis & {
  concertSongOrderStore: Record<string, number>;
};

if (!memoryStore.concertSongOrderStore) {
  memoryStore.concertSongOrderStore = {};
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const current = memoryStore.concertSongOrderStore[slug] ?? 0;
  memoryStore.concertSongOrderStore[slug] = Math.max(current - 1, 0);

  return NextResponse.json({
    ok: true,
    currentSongOrder: memoryStore.concertSongOrderStore[slug],
  });
}