"use client";

import { useRouter } from "next/navigation";

type Props = {
  slug: string;
  currentSongOrder: number;
  totalSongs: number;
  currentPhase: string;
};

export function ConcertControlPanel({
  slug,
  currentSongOrder,
  totalSongs,
  currentPhase,
}: Props) {
  const router = useRouter();

  function update(order: number, phase: string) {
    const url = `/concerts/${slug}/setlist?order=${order}&phase=${phase}`;
    router.push(url);
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <h2 className="mb-2 font-bold text-white">操作パネル</h2>

      <p className="mb-3 text-xs text-white/60">
        currentSongOrder と phase を更新
      </p>

      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            onClick={() => update(Math.max(0, currentSongOrder - 1), currentPhase)}
            className="flex-1 rounded-xl bg-white/10 p-2 text-white active:scale-95 transition"
          >
            1曲戻す
          </button>

          <button
            onClick={() => update(Math.min(totalSongs, currentSongOrder + 1), currentPhase)}
            className="flex-1 rounded-xl bg-blue-500 p-2 text-white active:scale-95 transition"
          >
            1曲進める
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => update(currentSongOrder, "before")}
            className="rounded-xl bg-white/10 p-2 text-white active:scale-95 transition"
          >
            開演前
          </button>

          <button
            onClick={() => update(currentSongOrder, "playing")}
            className="rounded-xl bg-blue-500 p-2 text-white active:scale-95 transition"
          >
            演奏中
          </button>

          <button
            onClick={() => update(currentSongOrder, "break")}
            className="rounded-xl bg-white/10 p-2 text-white active:scale-95 transition"
          >
            休憩中
          </button>

          <button
            onClick={() => update(currentSongOrder, "ended")}
            className="rounded-xl bg-white/10 p-2 text-white active:scale-95 transition"
          >
            終演
          </button>
        </div>
      </div>
    </section>
  );
}