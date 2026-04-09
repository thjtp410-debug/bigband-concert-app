"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import OpeningOverlay from "@/components/opening-overlay";
import OfficialMenuOverlay from "@/components/official-menu-overlay";
import { fetchConcertList, fetchSiteSettings } from "@/lib/microcs/queries";

export default function HomePage() {
  const [concerts, setConcerts] = useState<any[]>([]);
  const [topImageUrl, setTopImageUrl] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showOpening, setShowOpening] = useState(false);

  useEffect(() => {
    const openedOnce = sessionStorage.getItem("opening-shown");
    if (!openedOnce) {
      setShowOpening(true);
      sessionStorage.setItem("opening-shown", "true");
    }

    async function load() {
      const concertData = await fetchConcertList();
      const settings = await fetchSiteSettings();
      setConcerts(concertData);
      setTopImageUrl(settings?.topImage?.url ?? null);
    }

    load();
  }, []);

  const activeConcerts = concerts.filter((concert) => {
    const status = concert.setlistStatus?.concertStatus ?? "before";
    return status !== "ended";
  });

  const pastConcerts = concerts.filter((concert) => {
    const status = concert.setlistStatus?.concertStatus ?? "before";
    return status === "ended";
  });

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(180deg, #081a5a 0%, #0d2cff 100%)",
        color: "white",
        padding: "20px 14px 120px",
      }}
    >
      {showOpening ? <OpeningOverlay /> : null}

      <OfficialMenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pastConcerts={pastConcerts}
      />

      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {/* 上部 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "14px",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              fontSize: "clamp(26px, 5vw, 48px)",
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: "-0.05em",
              whiteSpace: "nowrap",
            }}
          >
            Eagle Jazztech Orchestra
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            style={{
              flex: "0 0 auto",
              width: "56px",
              height: "56px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.12)",
              color: "white",
              fontSize: "26px",
              fontWeight: 700,
              boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              cursor: "pointer",
            }}
          >
            ≡
          </button>
        </div>

        {/* トップ画像 */}
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

        {/* タイトル */}
        <div
          style={{
            fontSize: "34px",
            fontWeight: 800,
            marginBottom: "18px",
            lineHeight: 1.1,
          }}
        >
          予約公演
        </div>

        {/* 公演一覧 */}
        <div style={{ display: "grid", gap: "18px" }}>
          {activeConcerts.map((concert: any) => {
            const status = concert.setlistStatus?.concertStatus ?? "before";
            const showReservationButton =
              status === "before" && !!concert.reservationUrl;

            const statusLabelMap: Record<string, string> = {
              before: "開演前",
              playing: "開演中",
              break: "休憩中",
              ended: "終演",
            };

            return (
              <div
                key={concert.id}
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.16)",
                }}
              >
                <Link
                  href={`/concerts/${concert.slug}/setlist`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  {concert.flyerImage?.url ? (
                    <img
                      src={concert.flyerImage.url}
                      alt={concert.concertName}
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

                  <div style={{ padding: "18px 18px 14px" }}>
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
                      {concert.concertName}
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

                <div
                  style={{
                    padding: "0 18px 18px",
                  }}
                >
                  {showReservationButton ? (
                    <a
                      href={concert.reservationUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-block",
                        width: "100%",
                        textAlign: "center",
                        padding: "14px 16px",
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.92)",
                        color: "#081a5a",
                        textDecoration: "none",
                        fontWeight: 800,
                        fontSize: "16px",
                        boxSizing: "border-box",
                      }}
                    >
                      予約する
                    </a>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "48px",
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}