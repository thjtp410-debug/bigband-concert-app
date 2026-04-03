import TopBackLink from "@/components/navigation/top-back-link";
import { fetchConcertDetail } from "@/lib/microcs/queries";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concert = await fetchConcertDetail(slug);

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
          {concert?.concertName ?? "公演名未設定"} / {concert?.venue ?? "Shibuya Public Hall"}
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
          <Link href={`/concerts/${slug}/news`} style={chipBtn}>
            News
          </Link>
          <Link href={`/concerts/${slug}/media`} style={activeChipBtn}>
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
          Media
        </h1>

        <div
          style={{
            borderRadius: "18px",
            padding: "16px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
            fontSize: "15px",
            lineHeight: 1.7,
            opacity: 0.92,
          }}
        >
          メディアは準備中です。
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