"use client";

import { format } from "date-fns";
import { clsx } from "clsx";
import { useInboxStore, statusLabels } from "@/stores/inbox-store";

export function InboxList() {
  const { items, filter, toggleDone, markScheduled } = useInboxStore(
    (state) => ({
      items: state.items,
      filter: state.filter,
      toggleDone: state.toggleDone,
      markScheduled: state.markScheduled,
    }),
  );

  const filtered = items.filter((item) =>
    filter === "all" ? true : item.status === filter,
  );

  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-white/60">
        아직 입력된 항목이 없습니다. 할 일을 입력하고 `추가` 버튼을 눌러보세요.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {filtered.map((item) => (
        <li
          key={item.id}
          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/30 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-1 items-start gap-3">
            <input
              type="checkbox"
              checked={item.status === "done"}
              onChange={() => toggleDone(item.id)}
              className="mt-1 size-5 rounded border-white/40 bg-transparent accent-emerald-400"
            />
            <div className="space-y-1">
              <p
                className={clsx("text-base font-medium text-white", {
                  "text-white/60 line-through": item.status === "done",
                })}
              >
                {item.content}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                <span className="rounded-full bg-white/10 px-2 py-0.5">
                  {statusLabels[item.status]}
                </span>
                <span>
                  입력: {format(new Date(item.createdAt), "HH:mm")}
                </span>
                {item.carriedOverAt && (
                  <span className="text-amber-300">
                    {format(new Date(item.carriedOverAt), "HH:mm")}에 내일로 이동
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            {item.status === "pending" && (
              <button
                onClick={() => markScheduled(item.id)}
                className="rounded-lg border border-emerald-400/50 px-3 py-1 text-sm text-emerald-200 transition hover:bg-emerald-400/10"
              >
                캘린더에 배치하기
              </button>
            )}
            {item.status === "scheduled" && (
              <p className="text-xs text-white/70">캘린더에 연결됨</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
