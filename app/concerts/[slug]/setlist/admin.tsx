"use client";

export default function AdminControls({
  concertId,
  currentOrder,
  total,
}: {
  concertId: string;
  currentOrder: number;
  total: number;
}) {
  const next = async () => {
    const nextOrder = Math.min(currentOrder + 1, total);

    await fetch("/api/updateCurrentSong", {
      method: "POST",
      body: JSON.stringify({
        concertId,
        nextOrder,
      }),
    });

    location.reload();
  };

  const prev = async () => {
    const prevOrder = Math.max(currentOrder - 1, 1);

    await fetch("/api/updateCurrentSong", {
      method: "POST",
      body: JSON.stringify({
        concertId,
        nextOrder: prevOrder,
      }),
    });

    location.reload();
  };

  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
      <button onClick={prev} style={btn}>
        ← 前の曲
      </button>
      <button onClick={next} style={btn}>
        次の曲 →
      </button>
    </div>
  );
}

const btn = {
  padding: "12px 18px",
  borderRadius: "12px",
  border: "none",
  background: "#60a5fa",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};