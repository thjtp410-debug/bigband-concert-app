import type { Concert, SetlistSong } from "@/types/microcms";

type NowPlayingCardProps = {
  concert: Concert;
  currentSong: SetlistSong | null;
};

function getStatusLabel(status: Concert["setlistStatus"]["concertStatus"]) {
  switch (status) {
    case "before":
      return "開演前";
    case "playing":
      return "演奏中";
    case "break":
      return "休憩中";
    case "ended":
      return "終演";
    default:
      return "";
  }
}

export function NowPlayingCard({ concert, currentSong }: NowPlayingCardProps) {
  return (
    <section
      className="rounded-3xl border p-5 shadow-2xl backdrop-blur-md"
      style={{
        background: `linear-gradient(135deg, ${concert.theme.background}, ${concert.theme.primary})`,
        borderColor: "var(--theme-border)",
        boxShadow: `0 20px 40px ${concert.theme.primary}55`,
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: "var(--theme-surface-strong)",
            color: "var(--theme-text-main)",
          }}
        >
          {getStatusLabel(concert.setlistStatus.concertStatus)}
        </span>

        <span
          className="text-xs"
          style={{ color: "var(--theme-text-sub)" }}
        >
          {concert.date}
        </span>
      </div>

      <p
        className="text-sm"
        style={{ color: "var(--theme-text-sub)" }}
      >
        Now Playing
      </p>

      {currentSong ? (
        <>
          <h2 className="mt-2 text-3xl font-bold">
            {currentSong.title}
          </h2>

          {currentSong.composer && (
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--theme-text-sub)" }}
            >
              Composer: {currentSong.composer}
            </p>
          )}
        </>
      ) : (
        <h2 className="mt-2 text-2xl font-bold">未設定</h2>
      )}
    </section>
  );
}