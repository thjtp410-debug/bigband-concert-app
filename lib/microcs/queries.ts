import { client } from "@/lib/microcms/client";

export async function fetchConcertList() {
  const data = await client.get({
    endpoint: "concerts",
    queries: {
      limit: 100,
    },
  });

  return data.contents.map((item: any) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    bandName: item.bandName ?? "Eagle Jazztech Orchestra",
    venue: item.venue ?? "Shibuya Public Hall",
    date: item.date ?? "2026.04.12",
    description: item.description ?? "",
    flyerImage: item.flyerImage ?? null,
    setlistStatus: {
      concertStatus: item.concertStatus ?? "before",
      currentSongOrder: item.currentSongOrder ?? 0,
    },
  }));
}

export async function fetchConcertDetail(slug: string) {
  const data = await client.get({
    endpoint: "concerts",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });

  const item = data.contents?.[0];
  if (!item) return null;

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    bandName: item.bandName ?? "Eagle Jazztech Orchestra",
    venue: item.venue ?? "Shibuya Public Hall",
    date: item.date ?? "2026.04.12",
    description: item.description ?? "",
    flyerImage: item.flyerImage ?? null,
    setlistStatus: {
      concertStatus: item.concertStatus ?? "before",
      currentSongOrder: item.currentSongOrder ?? 0,
    },
  };
}

export async function fetchConcertSetlist(slug: string) {
  const data = await client.get({
    endpoint: "setlist",
    queries: {
      filters: `concertSlug[equals]${slug}`,
      orders: "order",
      limit: 100,
    },
  });

  return data.contents;
}

export async function fetchConcertMembers(slug: string) {
  const data = await client.get({
    endpoint: "members",
    queries: {
      filters: `concertSlug[equals]${slug}`,
      orders: "order",
      limit: 100,
    },
  });

  return data.contents;
}

export async function fetchConcertNews(slug: string) {
  const data = await client.get({
    endpoint: "news",
    queries: {
      filters: `concertSlug[equals]${slug}`,
      limit: 100,
    },
  });

  return data.contents.sort((a: any, b: any) => {
    const da = new Date(b.publishedAt ?? b.createdAt ?? 0).getTime();
    const db = new Date(a.publishedAt ?? a.createdAt ?? 0).getTime();
    return da - db;
  });
}

export async function fetchConcertMedia(slug: string) {
  const data = await client.get({
    endpoint: "media",
    queries: {
      filters: `concertSlug[equals]${slug}`,
      limit: 100,
    },
  });

  return data.contents;
}