"use client";

import { useState } from "react";
import { useInboxStore } from "@/stores/inbox-store";

export function BrainDumpInput() {
  const addItem = useInboxStore((state) => state.addItem);
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    addItem(trimmed);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/30"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
        오늘 머릿속 비우기
      </p>
      <p className="text-base text-white/80">
        오늘 할 일과 떠오르는 생각을 모두 적어두는 공간입니다.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="오늘 할 일 또는 생각을 입력하고 Enter를 누르세요"
          className="flex-1 rounded-2xl border border-white/20 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-2xl bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-50"
          disabled={!value.trim()}
        >
          추가
        </button>
      </div>
    </form>
  );
}
