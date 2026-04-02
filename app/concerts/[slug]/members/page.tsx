import Link from "next/link";
import { fetchConcertDetail, fetchConcertMembers } from "@/lib/microcs/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const concert = await fetchConcertDetail(slug);
  const members = await fetchConcertMembers(slug);

  const bandMistress = members.find((m: any) => m.role === "Band Mistress");
  const bandMaster = members.find((m: any) => m.role === "Band Master");

  const normalMembers = members.filter(
    (m: any) => m.role !== "Band Mistress" && m.role !== "Band Master"
  );

  const instrumentOrder = ["Sax", "Tb", "Tp", "Rhythm"];

  const grouped = normalMembers.reduce((acc: any, m: any) => {
    const key = m.instrument || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  const orderedGroups = instrumentOrder
    .filter((key) => grouped[key]?.length)
    .map((key) => [key, grouped[key]] as const);

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(180deg, #081a5a 0%, #0d2cff 100%)",
        color: "white",
        padding: "20px 14px 120px",
      }}
    >
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
            flexWrap: "nowrap",
            marginBottom: "18px",
            overflowX: "auto",
            paddingBottom: "2px",
          }}
        >
          <Link href={`/concerts/${slug}/setlist`} style={chipBtn}>
            Setlist
          </Link>
          <Link href={`/concerts/${slug}/members`} style={activeChipBtn}>
            Members
          </Link>
          <Link href={`/concerts/${slug}/news`} style={chipBtn}>
            News
          </Link>
          <Link href={`/concerts/${slug}/media`} style={chipBtn}>
            Media
          </Link>
        </div>

        <h1
          style={{
            fontSize: "32px",
            fontWeight: 800,
            marginBottom: "18px",
            lineHeight: 1.1,
          }}
        >
          Members
        </h1>

        {(bandMistress || bandMaster) && (
          <section style={{ marginBottom: "28px" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 800,
                marginBottom: "14px",
                opacity: 0.95,
              }}
            >
              Leaders
            </div>

            <div style={gridStyle}>
              {bandMistress && <MemberCard member={bandMistress} />}
              {bandMaster && <MemberCard member={bandMaster} />}
            </div>
          </section>
        )}

        {orderedGroups.map(([instrument, list]: any) => (
          <section key={instrument} style={{ marginBottom: "28px" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 800,
                marginBottom: "14px",
                opacity: 0.95,
              }}
            >
              {instrument}
            </div>

            <div style={gridStyle}>
              {list.map((m: any) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function MemberCard({ member }: { member: any }) {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: "18px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          background: "rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {member.image?.url ? (
          <img
            src={member.image.url}
            alt={member.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <span
            style={{
              fontSize: "14px",
              opacity: 0.65,
            }}
          >
            No Image
          </span>
        )}
      </div>

      <div
        style={{
          padding: "12px 12px 14px",
          minHeight: "86px",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: "4px",
            wordBreak: "break-word",
          }}
        >
          {member.name}
        </div>

        <div
          style={{
            fontSize: "13px",
            opacity: 0.78,
            lineHeight: 1.3,
          }}
        >
          {member.instrument}
        </div>

        {member.role && (
          <div
            style={{
              marginTop: "5px",
              fontSize: "12px",
              fontWeight: 700,
              color: "#a5d8ff",
              lineHeight: 1.3,
            }}
          >
            {member.role}
          </div>
        )}
      </div>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "12px",
};

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
  whiteSpace: "nowrap" as const,
  flex: "0 0 auto",
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
  whiteSpace: "nowrap" as const,
  flex: "0 0 auto",
};