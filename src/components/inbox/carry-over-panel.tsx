"use client";

type Props = {
  pendingCount: number;
  autoCarryOver: boolean;
  onToggleAuto: (value: boolean) => void;
  onCarryOver: () => void;
  isProcessing?: boolean;
};

export function CarryOverPanel({
  pendingCount,
  autoCarryOver,
  onToggleAuto,
  onCarryOver,
  isProcessing = false,
}: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/70 to-slate-900/30 p-5">
      <p className="text-sm font-semibold text-white">자동 이월 설정</p>
      <p className="text-xs text-white/70">
        하루가 끝나면 미완료 · 미배치 항목을 다음날 브레인덤프로 자동 복사합니다.
      </p>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-white">자동 이월</p>
          <p className="text-xs text-white/60">
            {autoCarryOver ? "활성화됨" : "비활성화됨"}
          </p>
        </div>
        <button
          onClick={() => onToggleAuto(!autoCarryOver)}
          className={`relative h-8 w-16 rounded-full transition ${
            autoCarryOver ? "bg-emerald-400" : "bg-white/20"
          }`}
          aria-pressed={autoCarryOver}
        >
          <span
            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
              autoCarryOver ? "translate-x-8" : ""
            }`}
          />
        </button>
      </div>

      <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-white/80">
          오늘 미완료 항목 {pendingCount}개
        </p>
        <button
          onClick={onCarryOver}
          className="w-full rounded-2xl bg-white/20 py-2 text-sm font-semibold text-white transition hover:bg-white/30 disabled:opacity-50"
          disabled={pendingCount === 0 || isProcessing}
        >
          {isProcessing ? "이동 중..." : "선택 항목 내일로 보내기"}
        </button>
        <p className="text-xs text-white/60">
          수동 버튼을 누르면 즉시 내일 브레인덤프 리스트에 복사된 것으로 표시됩니다.
        </p>
      </div>
    </section>
  );
}
