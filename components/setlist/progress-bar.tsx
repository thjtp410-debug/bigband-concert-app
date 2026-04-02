type ProgressBarProps = {
  currentSongOrder: number;
  totalSongs: number;
};

export function ProgressBar({ currentSongOrder, totalSongs }: ProgressBarProps) {
  const percentage =
    totalSongs === 0 ? 0 : Math.min((currentSongOrder / totalSongs) * 100, 100);

  return (
    <section
      className="rounded-3xl border p-4"
      style={{
        background: "var(--theme-surface)",
        borderColor: "var(--theme-border)",
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm" style={{ color: "var(--theme-text-sub)" }}>
          進行状況
        </p>
        <p className="text-sm font-semibold">
          {currentSongOrder} / {totalSongs}
        </p>
      </div>

      <div className="h-3 w-full rounded-full overflow-hidden bg-white/20">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, var(--theme-accent), var(--theme-primary))`,
          }}
        />
      </div>
    </section>
  );
}