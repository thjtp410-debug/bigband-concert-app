export const dynamic = "force-dynamic";

import Link from "next/link";
import { fetchConcertList, fetchSiteSettings } from "@/lib/microcs/queries";

export default async function HomePage() {
  const concerts = await fetchConcertList();
  const siteSettings = await fetchSiteSettings();

  const topImageUrl = siteSettings?.topImage?.url ?? null;

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(180deg, #081a5a 0%, #0d2cff 100%)",
        color: "white",
        padding: "20px 14px 120px",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {topImageUrl ? (
          <section
            style={{
              marginBottom: "20px",
              borderRadius: "28px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <img
              src={topImageUrl}
              alt="band photo"
              style={{
                width: "100%",
                display: "block",
                objectFit: "cover",
              }}
            />
          </section>
        ) : null}

        <div
          style={{
            fontSize: "34px",
            fontWeight: 800,
            marginBottom: "18px",
            lineHeight: 1.1,
          }}
        >
          公演一覧
        </div>

        <div style={{ display: "grid", gap: "18px" }}>
          {concerts.map((concert: any) => {
            const status = concert.setlistStatus?.concertStatus ?? "before";

            const statusLabelMap: Record<string, string> = {
              before: "開演前",
              playing: "開演中",
              break: "休憩中",
              ended: "終演",
            };

            return (
              <Link
                key={concert.id}
                href={`/concerts/${concert.slug}/setlist`}
                style={{
                  display: "block",
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.16)",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                {concert.flyerImage?.url ? (
                  <img
                    src={concert.flyerImage.url}
                    alt={concert.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "220px",
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.18) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      opacity: 0.7,
                    }}
                  >
                    No Image
                  </div>
                )}

                <div style={{ padding: "18px 18px 20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        padding: "7px 12px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.18)",
                        fontSize: "13px",
                        fontWeight: 800,
                      }}
                    >
                      {statusLabelMap[status] ?? "開演前"}
                    </div>

                    <div
                      style={{
                        fontSize: "14px",
                        opacity: 0.8,
                        fontWeight: 700,
                      }}
                    >
                      {concert.date}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "30px",
                      fontWeight: 800,
                      lineHeight: 1.15,
                      marginBottom: "10px",
                    }}
                  >
                    {concert.title}
                  </div>

                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      lineHeight: 1.35,
                      marginBottom: "4px",
                    }}
                  >
                    {concert.bandName}
                  </div>

                  <div
                    style={{
                      fontSize: "15px",
                      opacity: 0.78,
                      lineHeight: 1.4,
                    }}
                  >
                    {concert.venue}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}