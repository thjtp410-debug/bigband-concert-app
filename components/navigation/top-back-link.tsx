import Link from "next/link";

export default function TopBackLink({
  href = "/",
  label = "公演一覧へ",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "16px",
      }}
    >
      <Link
        href={href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 14px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.16)",
          color: "white",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: 700,
          boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            width: "22px",
            height: "22px",
            borderRadius: "999px",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.14)",
            fontSize: "12px",
            lineHeight: 1,
          }}
        >
          ←
        </span>
        <span>{label}</span>
      </Link>
    </div>
  );
}