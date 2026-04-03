import TopBackLink from "@/components/navigation/top-back-link";
import { fetchConcertDetail, fetchConcertNews } from "@/lib/microcs/queries";
import Link from "next/link";

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
        <TopBackLink />

        <div
          style={{
            marginBottom: "14px",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          {concert?.concertName ?? "公演名未設定"} / {concert?.venue}
        </div>

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
          {newsList.length === 0 ? (
            <div
              style={{
                borderRadius: "18px",
                padding: "16px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
              }}
            >
              お知らせはまだありません。
            </div>
          ) : (
            newsList.map((news: any) => (
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
                    lineHeight: 1.3,
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
                  {formatDate(news.publishedAt ?? news.createdAt)}
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.7,
                    opacity: 0.92,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {typeof news.body === "string" ? news.body : ""}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}.${m}.${d}`;
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
  whiteSpace: "nowrap" as const,
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
  whiteSpace: "nowrap" as const,
};