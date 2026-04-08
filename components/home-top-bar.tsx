"use client";

import { useState } from "react";
import OfficialMenuOverlay from "@/components/official-menu-overlay";

export default function HomeTopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <OfficialMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "14px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
          }}
        >
          Eagle Jazztech Orchestra
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          style={{
            flex: "0 0 auto",
            width: "48px",
            height: "48px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.12)",
            color: "white",
            fontSize: "24px",
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
    </>
  );
}