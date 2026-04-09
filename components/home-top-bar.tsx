"use client";

type Concert = {
  id: string;
  slug: string;
  concertName: string;
  date: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  pastConcerts: Concert[];
};

export default function OfficialMenuOverlay({
  open,
  onClose,
  pastConcerts,
}: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        background: open ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0)",
        backdropFilter: open ? "blur(6px)" : "blur(0px)",
        WebkitBackdropFilter: open ? "blur(6px)" : "blur(0px)",
        transition: "all 0.35s ease",
        pointerEvents: open ? "auto" : "none",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          inset: 0,
          overflowY: "auto",
          transform: open ? "translateY(0)" : "translateY(-18px)",
          opacity: open ? 1 : 0,
          transition: "all 0.35s ease",
          background: "#dce8bf",
          color: "#082b3a",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "26px 16px 44px",
          }}
        >
          {/* 上部 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "34px",
            }}
          >
            <button
              style={{
                border: "1px solid rgba(8,43,58,0.14)",
                background: "rgba(255,255,255,0.35)",
                color: "#082b3a",
                borderRadius: "999px",
                padding: "14px 24px",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              ⚙︎ Settings
            </button>

            <button
              onClick={onClose}
              style={{
                width: "84px",
                height: "84px",
                borderRadius: "999px",
                border: "1px solid rgba(8,43,58,0.12)",
                background: "rgba(255,255,255,0.35)",
                color: "#082b3a",
                fontSize: "38px",
                fontWeight: 300,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: "52px",
              fontWeight: 500,
              lineHeight: 1.08,
              marginBottom: "34px",
              letterSpacing: "-0.03em",
            }}
          >
            Official Menu
          </div>

          {/* メインメニュー */}
          <div
            style={{
              background: "#a7db13",
              borderRadius: "34px",
              padding: "26px 22px 24px",
              marginBottom: "28px",
            }}
          >
            <MenuRow title="News" />
            <MenuRow title="Schedule" />
            <MenuRow title="Profile" />
            <MenuRow title="Past Concerts" />

            {pastConcerts.length > 0 ? (
              <div
                style={{
                  marginTop: "18px",
                  paddingTop: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    opacity: 0.7,
                    marginBottom: "12px",
                  }}
                >
                  Past Concerts
                </div>

                <div style={{ display: "grid", gap: "10px" }}>
                  {pastConcerts.map((concert) => (
                    <a
                      key={concert.id}
                      href={`/concerts/${concert.slug}/setlist`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "#082b3a",
                        padding: "12px 2px",
                        borderBottom: "1px solid rgba(8,43,58,0.12)",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: 700,
                            marginBottom: "4px",
                          }}
                        >
                          {concert.concertName}
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            opacity: 0.7,
                          }}
                        >
                          {concert.date}
                        </div>
                      </div>
                      <div style={{ fontSize: "34px", lineHeight: 1 }}>›</div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Media */}
          <div
            style={{
              background: "#a7db13",
              borderRadius: "34px",
              padding: "26px 22px 24px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                opacity: 0.72,
                marginBottom: "12px",
              }}
            >
              Media
            </div>

            <SocialRow label="YouTube" href="https://www.youtube.com/" />
            <SocialRow label="Instagram" href="https://www.instagram.com/" />
            <SocialRow label="X" href="https://x.com/" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuRow({ title }: { title: string }) {
  return (
    <button
      style={{
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: "1px solid rgba(8,43,58,0.12)",
        padding: "22px 2px",
        color: "#082b3a",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          fontWeight: 700,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "42px", lineHeight: 1 }}>›</div>
    </button>
  );
}

function SocialRow({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textDecoration: "none",
        color: "#082b3a",
        padding: "22px 2px",
        borderBottom: "1px solid rgba(8,43,58,0.12)",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: "38px", lineHeight: 1 }}>↗</div>
    </a>
  );
}