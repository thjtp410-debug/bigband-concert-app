import { fetchConcertDetail } from "@/lib/microcs/queries";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const concert = await fetchConcertDetail(params.slug);

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(180deg, #081a5a 0%, #0d2cff 100%)",
        color: "white",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "20px" }}>
          Media
        </h1>

        <div
          style={{
            padding: "20px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.08)",
          }}
        >
          メディアは準備中です
        </div>
      </div>
    </main>
  );
}