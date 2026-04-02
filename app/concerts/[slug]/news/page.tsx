import Link from "next/link";
import { fetchConcertDetail, fetchConcertNews } from "@/lib/microcs/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const concert = await fetchConcertDetail(slug);
  const newsList = await fetchConcertNews(slug);

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(180deg, #081a5a 0%, #0d2cff 100%)",
        color: "white",
        padding: "20px 14px 120px",
      }}
    >
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginBottom: "16px",
            fontSize: "14px",
            opacity: 0.9,
            textDecoration: "none",
            color: "white",
          }}
        >
          ← 公演一覧へ
        </Link>

        <div
          style={{
            marginBottom: "14px",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          {concert?.concertName ?? "公演名未設定"} / {concert?.venue}
        </div>

        {/* タブ（統一） */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            marginBottom: "18px",
          }}
        >
          <Link href={`/concerts/${slug}/setlist`} style={chipBtn}>
            Setlist
          </Link>
          <Link href={`/concerts/${slug}/members`} style={chipBtn}>
            Members
          </Link>
          <Link href={`/concerts/${slug}/news`} style={activeChipBtn}>
            News
          </Link>
          <Link href={`/concerts/${slug}/media`} style={chipBtn}>
            Media
          </Link>
        </div>

        <h1
          style={{
            fontSize: "32px",
            fontWeight: 800,
            marginBottom: "18px",
          }}
        >
          News
        </h1>

        <div style={{ display: "grid", gap: "14px" }}>
          {newsList.map((news: any) => (
            <div
              key={news.id}
              style={{
                borderRadius: "18px",
                padding: "16px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  marginBottom: "8px",
                }}
              >
                {news.title}
              </div>

              <div
                style={{
                  fontSize: "14px",
                  opacity: 0.8,
                  marginBottom: "10px",
                }}
              >
                {new Date(news.publishedAt).toLocaleDateString()}
              </div>

              <div
                style={{
                  fontSize: "15px",
                  lineHeight: 1.6,
                  opacity: 0.9,
                  whiteSpace: "pre-wrap",
                }}
              >
                {news.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const chipBtn = {
  padding: "9px 14px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.24)",
  textDecoration: "none",
  color: "white",
  fontWeight: 700,
  fontSize: "14px",
  whiteSpace: "nowrap",
};

const activeChipBtn = {
  padding: "9px 14px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.30)",
  border: "1px solid rgba(255,255,255,0.34)",
  textDecoration: "none",
  color: "white",
  fontWeight: 700,
  fontSize: "14px",
};