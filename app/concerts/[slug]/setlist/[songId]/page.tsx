import Link from "next/link";
import { fetchConcertDetail, fetchConcertSetlist } from "@/lib/microcs/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; songId: string }>;
}) {
  const { slug, songId } = await params;

  const concert = await fetchConcertDetail(slug);
  const setlist = await fetchConcertSetlist(slug);
  const song = setlist.find((item: any) => item.id === songId);

  if (!song) {
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
            href={`/concerts/${slug}/setlist`}
            style={{
              display: "inline-block",
              marginBottom: "16px",
              fontSize: "14px",
              opacity: 0.9,
              textDecoration: "none",
              color: "white",
            }}
          >
            ← セットリストへ戻る
          </Link>

          <h1
            style={{
              fontSize: "32px",
              fontWeight: 800,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            曲が見つかりません
          </h1>
        </div>
      </main>
    );
  }

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
          href={`/concerts/${slug}/setlist`}
          style={{
            display: "inline-block",
            marginBottom: "16px",
            fontSize: "14px",
            opacity: 0.9,
            textDecoration: "none",
            color: "white",
          }}
        >
          ← セットリストへ戻る
        </Link>

        <div
          style={{
            marginBottom: "14px",
            fontSize: "20px",
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          {concert?.bandName ?? "Eagle Jazztech Orchestra"} /{" "}
          {concert?.venue ?? "Shibuya Public Hall"}
        </div>

        <section
          style={{
            borderRadius: "24px",
            padding: "18px 16px 16px",
            background:
              "linear-gradient(135deg, rgba(14,27,88,0.95) 0%, rgba(71,121,255,0.95) 100%)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              fontSize: "15px",
              fontWeight: 700,
              opacity: 0.68,
              marginBottom: "8px",
            }}
          >
            #{song.order}
          </div>

          <h1
            style={{
              fontSize: "34px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              margin: 0,
              marginBottom: "12px",
              wordBreak: "break-word",
            }}
          >
            {song.title}
          </h1>

          <div
            style={{
              fontSize: "16px",
              lineHeight: 1.45,
              opacity: 0.9,
            }}
          >
            Composer: {song.composer ?? "-"}
          </div>
        </section>
      </div>
    </main>
  );
}