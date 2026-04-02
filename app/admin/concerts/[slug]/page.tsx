"use client";

import { useEffect, useState } from "react";

type AdminConcert = {
  id: string;
  slug: string;
  title: string;
  bandName?: string;
  venue?: string;
  date?: string;
  setlistStatus: {
    concertStatus: "before" | "playing" | "break" | "ended";
    currentSongOrder: number;
  };
};

type AdminSong = {
  id: string;
  title: string;
  composer?: string;
  order: number;
};

export default function AdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState("");
  const [concert, setConcert] = useState<AdminConcert | null>(null);
  const [setlist, setSetlist] = useState<AdminSong[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const resolved = await params;
      setSlug(resolved.slug);
      await refresh(resolved.slug);
    })();
  }, [params]);

  async function refresh(targetSlug: string) {
    const concertRes = await fetch(`/api/concerts/${targetSlug}`, {
      cache: "no-store",
    });
    const concertData = await concertRes.json();
    setConcert(concertData);

    const setlistRes = await fetch(`/api/concerts/${targetSlug}/setlist`, {
      cache: "no-store",
    });
    const setlistData = await setlistRes.json();
    setSetlist(setlistData);
  }

  async function updateConcert(payload: {
    nextOrder?: number;
    concertStatus?: "before" | "playing" | "break" | "ended";
  }) {
    if (!concert) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/updateCurrentSong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          concertId: concert.id,
          nextOrder: payload.nextOrder,
          concertStatus: payload.concertStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setMessage(`更新失敗: ${data?.detail || data?.error || "unknown error"}`);
        setLoading(false);
        return;
      }

      await refresh(slug);
      setMessage("更新成功");
    } catch (error) {
      setMessage(
        `更新失敗: ${error instanceof Error ? error.message : "unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  }

  async function prevSong() {
    if (!concert) return;
    const current = concert.setlistStatus.currentSongOrder || 0;
    const nextOrder = Math.max(current - 1, 1);
    await updateConcert({ nextOrder });
  }

  async function nextSong() {
    if (!concert) return;
    const current = concert.setlistStatus.currentSongOrder || 0;
    const nextOrder = Math.min(current + 1, setlist.length);
    await updateConcert({ nextOrder });
  }

  async function setStatus(status: "before" | "playing" | "break" | "ended") {
    await updateConcert({ concertStatus: status });
  }

  if (!concert) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          padding: "40px 20px",
        }}
      >
        Loading...
      </main>
    );
  }

  const currentSong =
    setlist.find((song) => song.order === concert.setlistStatus.currentSongOrder) ??
    setlist[0];

  const currentStatus = concert.setlistStatus.concertStatus ?? "before";

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
        <div
          style={{
            fontSize: "40px",
            fontWeight: 800,
            marginBottom: "10px",
          }}
        >
          管理画面
        </div>

        <div
          style={{
            fontSize: "20px",
            opacity: 0.86,
            marginBottom: "28px",
          }}
        >
          {concert.bandName ?? "Eagle Jazztech Orchestra"} /{" "}
          {concert.venue ?? "Shibuya Public Hall"}
        </div>

        <section
          style={{
            borderRadius: "24px",
            padding: "22px",
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              opacity: 0.8,
              marginBottom: "10px",
            }}
          >
            現在の曲番号
          </div>

          <div
            style={{
              fontSize: "40px",
              fontWeight: 800,
              marginBottom: "16px",
            }}
          >
            {concert.setlistStatus.currentSongOrder}
          </div>

          <div
            style={{
              fontSize: "18px",
              opacity: 0.85,
              marginBottom: "10px",
            }}
          >
            Now Playing: {currentSong?.title ?? "未設定"}
          </div>

          <div
            style={{
              fontSize: "16px",
              opacity: 0.8,
            }}
          >
            現在のステータス: {currentStatus}
          </div>
        </section>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "14px",
            flexWrap: "wrap",
          }}
        >
          <button onClick={prevSong} style={btnSecondary} disabled={loading}>
            ← 前の曲
          </button>

          <button onClick={nextSong} style={btnPrimary} disabled={loading}>
            次の曲 →
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setStatus("before")}
            style={currentStatus === "before" ? activeStatusBtn : statusBtn}
            disabled={loading}
          >
            開演前
          </button>

          <button
            onClick={() => setStatus("playing")}
            style={currentStatus === "playing" ? activeStatusBtn : statusBtn}
            disabled={loading}
          >
            演奏中
          </button>

          <button
            onClick={() => setStatus("break")}
            style={currentStatus === "break" ? activeStatusBtn : statusBtn}
            disabled={loading}
          >
            休憩中
          </button>

          <button
            onClick={() => setStatus("ended")}
            style={currentStatus === "ended" ? activeStatusBtn : statusBtn}
            disabled={loading}
          >
            終演
          </button>
        </div>

        {message && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px 14px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.14)",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}

        <section
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
              fontSize: "28px",
              fontWeight: 800,
              marginBottom: "18px",
            }}
          >
            セットリスト
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            {setlist.map((song) => {
              const isNow = song.order === concert.setlistStatus.currentSongOrder;

              return (
                <div
                  key={song.id}
                  style={{
                    borderRadius: "18px",
                    padding: "16px",
                    background: isNow
                      ? "linear-gradient(135deg, rgba(205,230,255,0.30) 0%, rgba(255,255,255,0.16) 100%)"
                      : "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      opacity: 0.7,
                      marginBottom: "6px",
                    }}
                  >
                    #{song.order}
                  </div>

                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 800,
                      marginBottom: "6px",
                    }}
                  >
                    {song.title}
                  </div>

                  <div
                    style={{
                      fontSize: "16px",
                      opacity: 0.8,
                    }}
                  >
                    {song.composer}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

const btnPrimary = {
  padding: "12px 18px",
  borderRadius: "12px",
  border: "none",
  background: "#60a5fa",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: "16px",
};

const btnSecondary = {
  padding: "12px 18px",
  borderRadius: "12px",
  border: "none",
  background: "rgba(255,255,255,0.18)",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: "16px",
};

const statusBtn = {
  padding: "12px 18px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.24)",
  background: "rgba(255,255,255,0.14)",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: "15px",
};

const activeStatusBtn = {
  padding: "12px 18px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.34)",
  background: "rgba(255,255,255,0.30)",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
};