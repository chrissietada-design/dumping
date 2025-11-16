"use client";

import type { InboxFilter } from "@/types/inbox";
import { clsx } from "clsx";

const FILTERS: { label: string; value: InboxFilter }[] = [
  { label: "전체", value: "all" },
  { label: "미배치", value: "pending" },
  { label: "일정 연결됨", value: "scheduled" },
  { label: "완료", value: "done" },
];

type Props = {
  filter: InboxFilter;
  onChange: (filter: InboxFilter) => void;
};

export function InboxFilters({ filter, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={clsx(
            "rounded-full border px-4 py-2 text-sm transition",
            filter === item.value
              ? "border-emerald-400 bg-emerald-400/20 text-white"
              : "border-white/20 text-white/70 hover:border-white/40",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
