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
        background: "radial-gradient(circle at center, #1d4ed8 0%, #081a5a 45%, #030712 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isClosing ? 0 : 1,
        transition: "opacity 0.8s ease",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <MusicNote x="8%" y="18%" size={28} delay="0s" duration="4.2s" rotate={-18} />
        <MusicNote x="20%" y="72%" size={20} delay="0.4s" duration="4.8s" rotate={15} />
        <MusicNote x="84%" y="24%" size={26} delay="0.2s" duration="4.6s" rotate={12} />
        <MusicNote x="74%" y="78%" size={22} delay="0.7s" duration="4.4s" rotate={-12} />
        <MusicNote x="50%" y="10%" size={18} delay="0.1s" duration="5s" rotate={8} />
        <MusicNote x="10%" y="48%" size={24} delay="0.6s" duration="4.5s" rotate={-8} />
        <MusicNote x="89%" y="54%" size={24} delay="0.3s" duration="4.9s" rotate={18} />
        <MusicNote x="58%" y="84%" size={18} delay="0.9s" duration="4.1s" rotate={-15} />
      </div>

      <div
        style={{
          position: "relative",
          transform: isClosing ? "scale(1.22)" : "scale(1)",
          transition: "transform 0.9s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "12px",
            filter: "drop-shadow(0 14px 36px rgba(0,0,0,0.45))",
          }}
        >
          <Player kind="sax" />
          <Player kind="tp" />
          <Player kind="drum" />
          <Player kind="tb" />
          <Player kind="sax2" />
        </div>

        <div
          style={{
            fontSize: "14px",
            letterSpacing: "0.24em",
            fontWeight: 800,
            opacity: 0.82,
          }}
        >
          BIG BAND CONCERT
        </div>
      </div>
    </div>
  );
}

function MusicNote({
  x,
  y,
  size,
  delay,
  duration,
  rotate,
}: {
  x: string;
  y: string;
  size: number;
  delay: string;
  duration: string;
  rotate: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontSize: `${size}px`,
        color: "rgba(255,255,255,0.22)",
        transform: `rotate(${rotate}deg)`,
        animation: `floatNote ${duration} ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      ♪
      <style>
        {`
          @keyframes floatNote {
            0% { transform: translate(0, 0) rotate(${rotate}deg) scale(0.9); opacity: 0.10; }
            25% { opacity: 0.32; }
            50% { transform: translate(18px, -22px) rotate(${rotate + 10}deg) scale(1.05); opacity: 0.22; }
            75% { opacity: 0.30; }
            100% { transform: translate(-12px, -40px) rotate(${rotate - 8}deg) scale(0.92); opacity: 0.08; }
          }
        `}
      </style>
    </div>
  );
}

function Player({ kind }: { kind: "sax" | "sax2" | "tp" | "tb" | "drum" }) {
  return (
    <div
      style={{
        position: "relative",
        width: kind === "drum" ? 88 : 60,
        height: kind === "drum" ? 170 : 185,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 8,
          left: kind === "drum" ? 27 : 16,
          width: 22,
          height: 22,
          borderRadius: "999px",
          background: "rgba(255,255,255,0.92)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 30,
          left: kind === "drum" ? 30 : 21,
          width: kind === "drum" ? 16 : 12,
          height: 58,
          borderRadius: "999px",
          background: "rgba(255,255,255,0.88)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 82,
          left: kind === "drum" ? 20 : 10,
          width: kind === "drum" ? 14 : 10,
          height: 64,
          borderRadius: "999px",
          background: "rgba(255,255,255,0.88)",
          transform: "rotate(10deg)",
          transformOrigin: "top center",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 82,
          left: kind === "drum" ? 44 : 34,
          width: kind === "drum" ? 14 : 10,
          height: 64,
          borderRadius: "999px",
          background: "rgba(255,255,255,0.88)",
          transform: "rotate(-10deg)",
          transformOrigin: "top center",
        }}
      />

      {kind === "tp" && (
        <>
          <div
            style={{
              position: "absolute",
              top: 52,
              left: 4,
              width: 46,
              height: 8,
              borderRadius: "999px",
              background: "rgba(255,255,255,0.92)",
              transform: "rotate(-10deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 44,
              left: 42,
              width: 18,
              height: 20,
              clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 70%)",
              background: "rgba(255,255,255,0.92)",
              transform: "rotate(-10deg)",
            }}
          />
        </>
      )}

      {kind === "tb" && (
        <>
          <div
            style={{
              position: "absolute",
              top: 58,
              left: 2,
              width: 52,
              height: 7,
              borderRadius: "999px",
              background: "rgba(255,255,255,0.92)",
              transform: "rotate(6deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 51,
              left: 47,
              width: 7,
              height: 28,
              borderRadius: "999px",
              background: "rgba(255,255,255,0.92)",
              transform: "rotate(6deg)",
            }}
          />
        </>
      )}

      {(kind === "sax" || kind === "sax2") && (
        <>
          <div
            style={{
              position: "absolute",
              top: 56,
              left: kind === "sax" ? 24 : 18,
              width: 11,
              height: 42,
              borderRadius: "999px",
              background: "rgba(255,255,255,0.92)",
              transform: kind === "sax" ? "rotate(26deg)" : "rotate(-26deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 88,
              left: kind === "sax" ? 30 : 12,
              width: 24,
              height: 10,
              borderRadius: "999px",
              background: "rgba(255,255,255,0.92)",
              transform: kind === "sax" ? "rotate(18deg)" : "rotate(-18deg)",
            }}
          />
        </>
      )}

      {kind === "drum" && (
        <>
          <div
            style={{
              position: "absolute",
              top: 62,
              left: 10,
              width: 52,
              height: 40,
              borderRadius: "999px",
              border: "6px solid rgba(255,255,255,0.94)",
              background: "transparent",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 42,
              left: 6,
              width: 28,
              height: 5,
              borderRadius: "999px",
              background: "rgba(255,255,255,0.92)",
              transform: "rotate(-20deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 42,
              width: 28,
              height: 5,
              borderRadius: "999px",
              background: "rgba(255,255,255,0.92)",
              transform: "rotate(20deg)",
            }}
          />
        </>
      )}
    </div>
  );
}