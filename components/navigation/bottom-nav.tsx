"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type BottomNavProps = {
  slug: string;
};

const items = [
  { key: "setlist", label: "Setlist", path: "setlist" },
  { key: "members", label: "Members", path: "members" },
  { key: "news", label: "News", path: "news" },
  { key: "media", label: "Media", path: "media" },
];

export function BottomNav({ slug }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-4 px-2 py-2">
        {items.map((item) => {
          const href = `/concerts/${slug}/${item.path}`;
          const active = pathname === href;

          return (
            <Link
              key={item.key}
              href={href}
              className={`flex flex-col items-center justify-center rounded-2xl px-2 py-3 text-xs font-medium transition ${
                active ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}