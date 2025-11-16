import { format } from "date-fns";

export function TopBar() {
  const today = format(new Date(), "yyyy.MM.dd (EEE)");

  return (
    <header className="flex items-center justify-between border-b border-white/10 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-sm uppercase tracking-wide text-white/60">
          오늘 날짜
        </p>
        <p className="text-xl font-semibold">{today}</p>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <button className="rounded-full border border-white/20 px-3 py-1 text-white/80 transition hover:border-white hover:text-white">
          ◀ 이전
        </button>
        <button className="rounded-full border border-emerald-400/60 px-4 py-1 font-medium text-emerald-300 transition hover:bg-emerald-400/10">
          오늘
        </button>
        <button className="rounded-full border border-white/20 px-3 py-1 text-white/80 transition hover:border-white hover:text-white">
          다음 ▶
        </button>
      </div>
    </header>
  );
}
