import Link from "next/link";
import { fetchConcertList } from "@/lib/microcs/queries";

export default async function HomePage() {
  const concerts = await fetchConcertList();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f172a 0%, #1d4ed8 100%)",
        color: "white",
        padding: "48px 20px 80px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "36px" }}>
          <div
            style={{
              fontSize: "13px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.8,
              marginBottom: "10px",
            }}
          >
            Big Band Concert App
          </div>

          <h1
            style={{
              fontSize: "48px",
              lineHeight: 1.1,
              fontWeight: 800,
              margin: 0,
            }}
          >
            公演ごとの
            <br />
            セットリスト体験をまとめる
          </h1>

          <p
            style={{
              marginTop: "18px",
              maxWidth: "720px",
              fontSize: "18px",
              lineHeight: 1.7,
              opacity: 0.82,
            }}
          >
            複数バンド・複数公演で使い回せる、スマホ最優先のビッグバンド公演向けWebアプリ。
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {concerts.map((concert: any) => (
            <Link
              key={concert.id}
              href={`/concerts/${concert.slug}/setlist`}
              style={{
                display: "block",
                borderRadius: "28px",
                padding: "28px",
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.95) 0%, rgba(96,165,250,0.9) 100%)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      background: "rgba(15,23,42,0.28)",
                      fontSize: "13px",
                      fontWeight: 700,
                      marginBottom: "16px",
                    }}
                  >
                    {concert.setlistStatus?.concertStatus === "live"
                      ? "公演中"
                      : concert.setlistStatus?.concertStatus === "after"
                      ? "終演"
                      : "開演前"}
                  </div>

                  <div
                    style={{
                      fontSize: "34px",
                      fontWeight: 800,
                      lineHeight: 1.2,
                    }}
                  >
                    {concert.title}
                  </div>

                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "20px",
                      fontWeight: 600,
                      opacity: 0.95,
                    }}
                  >
                    {concert.bandName}
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "18px",
                      opacity: 0.82,
                    }}
                  >
                    {concert.venue}
                  </div>

                  <div
                    style={{
                      marginTop: "18px",
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    セットリストを見る →
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    opacity: 0.95,
                  }}
                >
                  {concert.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}