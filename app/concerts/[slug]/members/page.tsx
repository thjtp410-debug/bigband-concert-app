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
        minHeight: "100vh",
        background: "linear-gradient(180deg, #081a5a 0%, #0d2cff 100%)",
        color: "white",
        padding: "36px 20px 120px",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginBottom: "20px",
            fontSize: "15px",
            opacity: 0.85,
            textDecoration: "none",
          }}
        >
          ← 公演一覧へ
        </Link>

        <div
          style={{
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: 1.5,
          }}
        >
          {concert?.bandName ?? "Eagle Jazztech Orchestra"} / {concert?.venue ?? "Shibuya Public Hall"}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            marginBottom: "26px",
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
            fontSize: "44px",
            fontWeight: 800,
            marginBottom: "28px",
          }}
        >
          Members
        </h1>

        {(bandMistress || bandMaster) && (
          <section style={{ marginBottom: "42px" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                marginBottom: "16px",
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
          <section key={instrument} style={{ marginBottom: "42px" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                marginBottom: "16px",
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
        width: "240px",
        borderRadius: "22px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          width: "240px",
          height: "240px",
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
              width: "240px",
              height: "240px",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <span
            style={{
              fontSize: "18px",
              opacity: 0.65,
            }}
          >
            No Image
          </span>
        )}
      </div>

      <div
        style={{
          padding: "16px 16px 18px",
          minHeight: "92px",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: 800,
            lineHeight: 1.3,
            marginBottom: "6px",
          }}
        >
          {member.name}
        </div>

        <div
          style={{
            fontSize: "15px",
            opacity: 0.78,
          }}
        >
          {member.instrument}
        </div>

        {member.role && (
          <div
            style={{
              marginTop: "6px",
              fontSize: "14px",
              fontWeight: 700,
              color: "#a5d8ff",
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
  gridTemplateColumns: "repeat(auto-fill, 240px)",
  gap: "20px",
  justifyContent: "start",
};

const chipBtn = {
  padding: "10px 16px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.24)",
  textDecoration: "none",
  color: "white",
  fontWeight: 700,
  display: "inline-block",
};

const activeChipBtn = {
  padding: "10px 16px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.30)",
  border: "1px solid rgba(255,255,255,0.34)",
  textDecoration: "none",
  color: "white",
  fontWeight: 700,
  display: "inline-block",
  boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
};