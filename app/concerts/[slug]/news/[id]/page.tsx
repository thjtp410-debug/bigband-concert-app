import { client } from "@/lib/microcms/client";

type News = {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
};

async function getNewsDetail(id: string): Promise<News> {
  return await client.get({
    endpoint: "news",
    contentId: id,
  });
}

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const news = await getNewsDetail(params.id);

  return (
    <main style={{ padding: "40px", color: "white" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>
        {news.title}
      </h1>

      <div style={{ opacity: 0.6, marginBottom: "24px" }}>
        {new Date(news.publishedAt).toLocaleDateString()}
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: news.body }}
        style={{ lineHeight: 1.8 }}
      />
    </main>
  );
}