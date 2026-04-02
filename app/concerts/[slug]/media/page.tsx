import { BottomNav } from "@/components/navigation/bottom-nav";
import { fetchConcertDetail, fetchConcertMedia } from "@/lib/microcs/queries";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function MediaPage({ params }: Props) {
  const { slug } = await params;

  const concert = await fetchConcertDetail(slug);
  const media = await fetchConcertMedia(slug);

  if (!concert) return notFound();

  return (
    <main
      className="min-h-screen text-white"
      style={{ backgroundColor: concert.theme.background }}
    >
      <div className="mx-auto max-w-md px-5 pt-8 pb-28">
        <h1 className="text-2xl font-bold mb-6">Media</h1>

        <div className="space-y-4">
          {media.map((m) => (
            <div
              key={m.id}
              className="rounded-xl bg-white/5 border border-white/10 p-3"
            >
              <p className="font-semibold">{m.title}</p>

              {m.type === "video" && m.embedUrl && (
                <div className="mt-2 aspect-video">
                  <iframe
                    src={m.embedUrl}
                    className="w-full h-full rounded"
                  />
                </div>
              )}

              {m.caption && (
                <p className="text-sm text-white/70 mt-2">{m.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomNav slug={slug} />
    </main>
  );
}