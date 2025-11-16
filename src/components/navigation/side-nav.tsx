"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, secondaryNav } from "@/config/navigation";
import { clsx } from "clsx";

const baseClasses =
  "group relative flex flex-col rounded-xl border px-4 py-3 transition hover:border-white/30";

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col border-r border-white/10 bg-slate-950/95 p-6 text-sm lg:flex">
      <Link href="/dump" className="mb-6 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/20 text-lg text-emerald-300">
          ⏱️
        </div>
        <div>
          <p className="text-base font-semibold tracking-tight">Dumping</p>
          <p className="text-xs text-white/70">
            브레인덤프 → 타임블럭 → 리뷰
          </p>
        </div>
      </Link>

      <NavSection title="오늘 실행 흐름">
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(baseClasses, {
              "border-emerald-400/60 bg-emerald-400/10":
                pathname.startsWith(item.href),
              "border-white/10 bg-white/5": !pathname.startsWith(item.href),
            })}
          >
            <span className="font-medium">{item.label}</span>
            <span className="text-xs text-white/70">{item.description}</span>
          </Link>
        ))}
      </NavSection>

      <NavSection title="추후 확장">
        {secondaryNav.map((item) => (
          <div
            key={item.href}
            className="flex flex-col rounded-xl border border-dashed border-white/10 px-4 py-3 text-white/50"
          >
            <div className="flex items-center justify-between text-sm">
              <span>{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs">{item.description}</span>
          </div>
        ))}
      </NavSection>

      <div className="mt-auto space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold">Daily Check</p>
        <p className="text-xs text-white/70">
          좌측 탭에 맞춰 각 페이지의 체크리스트를 완료하면 하루 계획이 정리됩니다.
        </p>
      </div>
    </aside>
  );
}

function NavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2 pb-6">
      <p className="text-xs uppercase tracking-wide text-white/50">{title}</p>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
