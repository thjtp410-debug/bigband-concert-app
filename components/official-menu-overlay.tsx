"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function OfficialMenuOverlay({ open, onClose }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        background: open ? "rgba(2, 6, 23, 0.72)" : "rgba(2, 6, 23, 0)",
        backdropFilter: open ? "blur(10px)" : "blur(0px)",
        WebkitBackdropFilter: open ? "blur(10px)" : "blur(0px)",
        transition: "all 0.35s ease",
        pointerEvents: open ? "auto" : "none",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          margin: "0 auto",
          width: "100%",
          maxWidth: "760px",
          transform: open ? "translateY(0)" : "translateY(-24px)",
          opacity: open ? 1 : 0,
          transition: "all 0.35s ease",
          padding: "18px 14px 28px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            borderRadius: "28px",
            padding: "22px 18px 22px",
            background:
              "linear-gradient(180deg, rgba(8,26,90,0.96) 0%, rgba(13,44,255,0.92) 100%)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.30)",
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "0.18em",
                opacity: 0.86,
              }}
            >
              OFFICIAL MENU
            </div>

            <button
              onClick={onClose}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.12)",
                color: "white",
                fontSize: "20px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: "grid", gap: "12px", marginBottom: "22px" }}>
            <MenuCard title="News" desc="最新のお知らせ" />
            <MenuCard title="Schedule" desc="今後の出演予定" />
            <MenuCard title="Profile" desc="バンド紹介・活動情報" />
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <SocialBtn href="https://www.youtube.com/" label="YouTube" icon="▶" />
            <SocialBtn href="https://x.com/" label="X" icon="𝕏" />
            <SocialBtn href="https://www.instagram.com/" label="Instagram" icon="◎" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuCard({ title, desc }: { title: string; desc: string }) {
  return (
    <button
      style={{
        width: "100%",
        textAlign: "left",
        borderRadius: "18px",
        padding: "16px 16px",
        background: "rgba(255,255,255,0.10)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "white",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          fontSize: "22px",
          fontWeight: 800,
          marginBottom: "4px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "14px",
          opacity: 0.78,
        }}
      >
        {desc}
      </div>
    </button>
  );
}

function SocialBtn({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 16px",
        borderRadius: "999px",
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.16)",
        color: "white",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: "15px",
      }}
    >
      <span
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "999px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.16)",
          fontSize: "13px",
        }}
      >
        {icon}
      </span>
      {label}
    </a>
  );
}