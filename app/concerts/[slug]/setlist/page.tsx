import Link from "next/link";
import AutoRefresh from "@/components/auto-refresh";
import { fetchConcertDetail, fetchConcertSetlist } from "@/lib/microcs/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concert = await fetchConcertDetail(slug);
  const setlist = await fetchConcertSetlist(slug);

  const currentSongOrder =
    concert?.setlistStatus?.currentSongOrder && concert.setlistStatus.currentSongOrder > 0
      ? concert.setlistStatus.currentSongOrder
      : 1;

  const currentSong =
    setlist.find((song: any) => song.order === currentSongOrder) ?? setlist[0];

  const totalSongs = setlist.length;
  const progressPercent =
    totalSongs > 0 ? Math.max(0, Math.min(100, (currentSongOrder / totalSongs) * 100)) : 0;

  const concertStatus = concert?.setlistStatus?.concertStatus ?? "before";

  const statusLabelMap: Record<string, string> = {
    before: "開演前",
    playing: "演奏中",
    break: "休憩中",
    ended: "終演",
  };

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(180deg, #081a5a 0%, #0d2cff 100%)",
        color: "white",
        padding: "20px 14px 120px",
      }}
    >
      <AutoRefresh intervalMs={3000} />

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

        {concert?.flyerImage?.url ? (
          <section
            style={{
              marginBottom: "18px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <img
              src={concert.flyerImage.url}
              alt="flyer"
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
            marginBottom: "14px",
            fontSize: "20px",
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          {concert?.concertName ?? "公演名未設定"} / {concert?.venue ?? "Shibuya Public Hall"}
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            marginBottom: "18px",
          }}
        >
          <Link href={`/concerts/${slug}/setlist`} style={activeChipBtn}>
            Setlist
          </Link>
          <Link href={`/concerts/${slug}/members`} style={chipBtn}>
            Members
          </Link>
          <Link href={`/concerts/${slug}/news`} style={chipBtn}>
            News
          </Link>
          <Link href={`/concerts/${slug}/media`} style={chipBtn}>
            Media
          </Link>
        </div>

        <section
          style={{
            position: "sticky",
            top: "10px",
            zIndex: 10,
            borderRadius: "24px",
            padding: "16px 16px 14px",
            background:
              "linear-gradient(135deg, rgba(14,27,88,0.95) 0%, rgba(71,121,255,0.95) 100%)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
            marginBottom: "16px",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                padding: "6px 12px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.18)",
                fontSize: "12px",
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              {statusLabelMap[concertStatus] ?? "開演前"}
            </div>

            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                opacity: 0.95,
                whiteSpace: "nowrap",
              }}
            >
              {concert?.date ?? "2026.04.12"}
            </div>
          </div>

          <div
            style={{
              fontSize: "16px",
              fontWeight: 500,
              opacity: 0.95,
              marginBottom: "6px",
            }}
          >
            Now Playing
          </div>

          <div
            style={{
              fontSize: "32px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "8px",
              wordBreak: "break-word",
            }}
          >
            {currentSong?.title ?? "未設定"}
          </div>

          <div
            style={{
              fontSize: "15px",
              opacity: 0.88,
              lineHeight: 1.4,
              marginBottom: "12px",
            }}
          >
            Composer: {currentSong?.composer ?? "-"}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              進行状況
            </div>

            <div
              style={{
                fontSize: "16px",
                fontWeight: 800,
              }}
            >
              {currentSongOrder}/{totalSongs}
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "12px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.18)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                borderRadius: "999px",
                background: "linear-gradient(90deg, #8ed7ff 0%, #6ec6ff 100%)",
              }}
            />
          </div>
        </section>

        <section
          style={{
            borderRadius: "24px",
            padding: "16px 12px 14px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 16px 36px rgba(0,0,0,0.16)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                fontSize: "26px",
                fontWeight: 800,
              }}
            >
              セットリスト
            </div>

            <div
              style={{
                fontSize: "13px",
                opacity: 0.8,
              }}
            >
              currentSongOrder: {currentSongOrder}
            </div>
          </div>

          <div style={{ display: "grid", gap: "10px" }}>
            {setlist.map((song: any) => {
              const status =
                song.order < currentSongOrder
                  ? "DONE"
                  : song.order === currentSongOrder
                  ? "NOW"
                  : "NEXT";

              const isNow = song.order === currentSongOrder;

              return (
                <Link
                  key={song.id}
                  href={`/concerts/${slug}/setlist/${song.id}`}
                  style={{
                    borderRadius: "18px",
                    padding: "14px 14px 12px",
                    background: isNow
                      ? "linear-gradient(135deg, rgba(205,230,255,0.30) 0%, rgba(255,255,255,0.16) 100%)"
                      : "rgba(255,255,255,0.08)",
                    border: isNow
                      ? "1px solid rgba(255,255,255,0.34)"
                      : "1px solid rgba(255,255,255,0.14)",
                    textDecoration: "none",
                    color: "white",
                    display: "block",
                    boxShadow: isNow ? "0 10px 22px rgba(0,0,0,0.16)" : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "6px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        opacity: 0.65,
                      }}
                    >
                      #{song.order}
                    </div>

                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 800,
                        opacity: isNow ? 0.98 : 0.82,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {status}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 800,
                      lineHeight: 1.15,
                      marginBottom: "6px",
                      wordBreak: "break-word",
                    }}
                  >
                    {song.title}
                  </div>

                  <div
                    style={{
                      fontSize: "15px",
                      opacity: 0.8,
                      lineHeight: 1.35,
                      wordBreak: "break-word",
                    }}
                  >
                    {song.composer}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
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
  display: "inline-block",
  fontSize: "14px",
};

const activeChipBtn = {
  padding: "9px 14px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.30)",
  border: "1px solid rgba(255,255,255,0.34)",
  textDecoration: "none",
  color: "white",
  fontWeight: 700,
  display: "inline-block",
  fontSize: "14px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
};