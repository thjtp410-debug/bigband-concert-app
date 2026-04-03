"use client";

import { useEffect, useState } from "react";

export default function OpeningOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setIsClosing(true);
    }, 3800);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4600);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        background:
          "radial-gradient(circle at center, #1d4ed8 0%, #081a5a 45%, #020617 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isClosing ? 0 : 1,
        transition: "opacity 0.8s ease",
      }}
    >
      {/* 音符（増量） */}
      {Array.from({ length: 20 }).map((_, i) => (
        <MusicNote key={i} index={i} />
      ))}

      {/* シルエット */}
      <div
        style={{
          position: "relative",
          transform: isClosing ? "scale(1.25)" : "scale(1)",
          transition: "transform 1s ease",
        }}
      >
        <div style={{ display: "flex", gap: "14px" }}>
          <Player type="sax" />
          <Player type="tp" />
          <Player type="drum" />
          <Player type="tb" />
          <Player type="sax2" />
        </div>
      </div>

      {/* タイトル */}
      <div
        style={{
          position: "absolute",
          bottom: "14%",
          fontSize: "16px",
          letterSpacing: "0.25em",
          fontWeight: 800,
          opacity: 0.85,
        }}
      >
        Eagle Jazztech Orchestra
      </div>
    </div>
  );
}

/* 音符 */
function MusicNote({ index }: { index: number }) {
  const positions = [
    ["10%", "20%"],
    ["20%", "80%"],
    ["80%", "30%"],
    ["70%", "70%"],
    ["50%", "10%"],
    ["90%", "60%"],
  ];

  const pos = positions[index % positions.length];

  return (
    <div
      style={{
        position: "absolute",
        left: pos[0],
        top: pos[1],
        fontSize: `${18 + (index % 4) * 6}px`,
        color: "rgba(255,255,255,0.25)",
        animation: `noteMove ${4 + (index % 3)}s ease-in-out infinite`,
      }}
    >
      ♪
      <style>
        {`
        @keyframes noteMove {
          0% { transform: translate(0,0) scale(0.8); opacity: 0.1; }
          50% { transform: translate(20px,-30px) scale(1.1); opacity: 0.4; }
          100% { transform: translate(-10px,-60px) scale(0.9); opacity: 0.05; }
        }
        `}
      </style>
    </div>
  );
}

/* プレイヤー */
function Player({ type }: { type: string }) {
  return (
    <div style={{ position: "relative", width: 60, height: 180 }}>
      {/* 頭 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 20,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "white",
        }}
      />

      {/* 体（前傾） */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 24,
          width: 10,
          height: 60,
          background: "white",
          transform: "rotate(15deg)",
        }}
      />

      {/* 足 */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 14,
          width: 10,
          height: 70,
          background: "white",
          transform: "rotate(10deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 34,
          width: 10,
          height: 70,
          background: "white",
          transform: "rotate(-10deg)",
        }}
      />

      {/* 楽器 */}
      {type === "tp" && <Instrument angle={-10} />}
      {type === "tb" && <Instrument angle={5} />}
      {type === "sax" && <Instrument angle={20} />}
      {type === "sax2" && <Instrument angle={-20} />}
      {type === "drum" && <Drum />}

      {/* 音の波 */}
      {type !== "drum" && (
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 50,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.4)",
            animation: "soundWave 1.5s infinite",
          }}
        >
          <style>
            {`
            @keyframes soundWave {
              0% { transform: scale(0.5); opacity: 0.6; }
              100% { transform: scale(2); opacity: 0; }
            }
            `}
          </style>
        </div>
      )}
    </div>
  );
}

function Instrument({ angle }: { angle: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 0,
        width: 50,
        height: 6,
        background: "white",
        transform: `rotate(${angle}deg)`,
      }}
    />
  );
}

function Drum() {
  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 10,
        width: 40,
        height: 30,
        borderRadius: "50%",
        border: "4px solid white",
      }}
    />
  );
}