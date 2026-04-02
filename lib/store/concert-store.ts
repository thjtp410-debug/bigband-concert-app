import type { Concert, ConcertStatus, ConcertStatusUpdateInput } from "@/types/microcms";

const concerts: Concert[] = [
  {
    id: "1",
    slug: "blue-symphony-2026",
    title: "Blue Symphony Spring Concert 2026",
    bandName: "Blue Symphony Jazz Orchestra",
    venue: "Shibuya Public Hall",
    date: "2026.04.12",
    description: "春公演。セットリスト中心の体験を想定したMVPモックです。",
    theme: {
      primary: "#2563eb",
      accent: "#60a5fa",
      background: "#0f172a",
    },
    setlist: [
      { id: "s1", order: 1, title: "Take the A Train", composer: "Billy Strayhorn" },
      { id: "s2", order: 2, title: "Sing, Sing, Sing", composer: "Louis Prima" },
      { id: "s3", order: 3, title: "Moanin'", composer: "Bobby Timmons" },
      { id: "s4", order: 4, title: "In the Mood", composer: "Joe Garland" },
      { id: "s5", order: 5, title: "Spain", composer: "Chick Corea" },
      { id: "s6", order: 6, title: "Birdland", composer: "Joe Zawinul" },
    ],
    setlistStatus: {
      concertStatus: "playing",
      currentSongOrder: 3,
      startedAt: "2026-04-12T18:00:00+09:00",
      updatedAt: "2026-04-12T18:45:00+09:00",
    },
  },
  {
    id: "2",
    slug: "autumn-swing-night",
    title: "Autumn Swing Night",
    bandName: "Tokyo Riverside Big Band",
    venue: "Kichijoji Star Pine's Cafe",
    date: "2026.10.03",
    description: "秋公演。複数公演対応モック。",
    theme: {
      primary: "#b45309",
      accent: "#f59e0b",
      background: "#1c1917",
    },
    setlist: [
      { id: "a1", order: 1, title: "Autumn Leaves" },
      { id: "a2", order: 2, title: "Fly Me to the Moon" },
      { id: "a3", order: 3, title: "My Funny Valentine" },
      { id: "a4", order: 4, title: "It Don't Mean a Thing" },
    ],
    setlistStatus: {
      concertStatus: "before",
      currentSongOrder: 0,
    },
  },
];

export function getAllConcertsFromStore(): Concert[] {
  return concerts;
}

export function getConcertBySlugFromStore(slug: string): Concert | null {
  return concerts.find((concert) => concert.slug === slug) ?? null;
}

export function updateConcertStatusInStore(
  slug: string,
  input: ConcertStatusUpdateInput
): Concert | null {
  const concert = concerts.find((item) => item.slug === slug);

  if (!concert) {
    return null;
  }

  const totalSongs = concert.setlist.length;

  if (typeof input.currentSongOrder === "number") {
    const clampedOrder = Math.max(0, Math.min(input.currentSongOrder, totalSongs));
    concert.setlistStatus.currentSongOrder = clampedOrder;
  }

  if (input.concertStatus) {
    concert.setlistStatus.concertStatus = input.concertStatus;
  }

  concert.setlistStatus.updatedAt = new Date().toISOString();

  return concert;
}

export function moveConcertSongOrder(
  slug: string,
  direction: "prev" | "next"
): Concert | null {
  const concert = concerts.find((item) => item.slug === slug);

  if (!concert) {
    return null;
  }

  const current = concert.setlistStatus.currentSongOrder;
  const totalSongs = concert.setlist.length;

  if (direction === "prev") {
    concert.setlistStatus.currentSongOrder = Math.max(0, current - 1);
  }

  if (direction === "next") {
    concert.setlistStatus.currentSongOrder = Math.min(totalSongs, current + 1);
  }

  concert.setlistStatus.updatedAt = new Date().toISOString();

  return concert;
}

export function setConcertPhase(slug: string, status: ConcertStatus): Concert | null {
  const concert = concerts.find((item) => item.slug === slug);

  if (!concert) {
    return null;
  }

  concert.setlistStatus.concertStatus = status;
  concert.setlistStatus.updatedAt = new Date().toISOString();

  return concert;
}