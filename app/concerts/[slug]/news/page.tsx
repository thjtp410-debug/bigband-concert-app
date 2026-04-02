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
        minHeight: "100vh",
        background: "linear-gradient(180deg, #081a5a 0%, #0d2cff 100%)",
        color: "white",
        padding: "36px 20px 120px",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <Link
          href={`/concerts/${slug}/setlist`}
          style={{
            display: "inline-block",
            marginBottom: "20px",
            fontSize: "15px",
            opacity: 0.85,
            textDecoration: "none",
            color: "white",
          }}
        >
          ← セットリストへ戻る
        </Link>

        <div
          style={{
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: 1.5,
          }}
        >
          {concert?.bandName ?? "Eagle Jazztech Orchestra"} / {concert?.venue ?? "Shibuya Public Hall"}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            marginBottom: "26px",
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
            fontSize: "44px",
            fontWeight: 800,
            marginBottom: "12px",
          }}
        >
          News
        </h1>

        <div
          style={{
            fontSize: "14px",
            opacity: 0.65,
            marginBottom: "24px",
          }}
        >
          slug: {slug} / count: {newsList.length}
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
          {newsList.length === 0 ? (
            <div
              style={{
                borderRadius: "24px",
                padding: "24px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              お知らせはまだありません。
            </div>
          ) : (
            newsList.map((item: any) => (
              <article
                key={item.id}
                style={{
                  borderRadius: "24px",
                  padding: "22px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.16)",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    opacity: 0.72,
                    marginBottom: "10px",
                  }}
                >
                  {formatDate(item.publishedAt ?? item.createdAt)}
                </div>

                <h2
                  style={{
                    fontSize: "30px",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    margin: 0,
                    marginBottom: "12px",
                  }}
                >
                  {item.title}
                </h2>

                <div
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.8,
                    opacity: 0.9,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {typeof item.body === "string"
                    ? item.body
                    : JSON.stringify(item.body, null, 2)}
                </div>
              </article>
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
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");

  return `${y}.${m}.${d} ${hh}:${mm}`;
}

const chipBtn = {
  padding: "10px 16px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.24)",
  textDecoration: "none",
  color: "white",
  fontWeight: 700,
  display: "inline-block",
};

const activeChipBtn = {
  padding: "10px 16px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.30)",
  border: "1px solid rgba(255,255,255,0.34)",
  textDecoration: "none",
  color: "white",
  fontWeight: 700,
  display: "inline-block",
  boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
};