export type ConcertStatus = "before" | "playing" | "break" | "ended";

export type ThemeConfig = {
  primary: string;
  accent: string;
  background: string;
};

export type SetlistSong = {
  id: string;
  order: number;
  title: string;
  composer?: string;
  arranger?: string;
  note?: string;
  durationMinutes?: number;
};

export type SetlistStatus = {
  concertStatus: ConcertStatus;
  currentSongOrder: number;
  startedAt?: string;
  updatedAt?: string;
};

export type Concert = {
  id: string;
  slug: string;
  title: string;
  bandName: string;
  venue: string;
  date: string;
  description?: string;
  theme: ThemeConfig;
  setlist: SetlistSong[];
  setlistStatus: SetlistStatus;
};

export type Member = {
  id: string;
  name: string;
  part: string;
  role?: string;
};

export type NewsCategory = "before" | "today" | "after";

export type NewsItem = {
  id: string;
  title: string;
  body: string;
  category: NewsCategory;
  publishedAt: string;
};

export type MediaItem = {
  id: string;
  title: string;
  type: "photo" | "video";
  thumbnailUrl?: string;
  embedUrl?: string;
  caption?: string;
};
export type ConcertStatusUpdateInput = {
  concertStatus?: ConcertStatus;
  currentSongOrder?: number;
};