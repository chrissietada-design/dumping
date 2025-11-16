"use client";

import { useState } from "react";
import { clsx } from "clsx";

type Item = {
  label: string;
  hint?: string;
};

type Props = {
  title: string;
  items: Item[];
};

export function VerificationChecklist({ title, items }: Props) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-xs text-white/60">
          {Object.values(checked).filter(Boolean).length} / {items.length} 완료
        </span>
      </div>
      <ul className="mt-4 space-y-3 text-sm">
        {items.map((item, index) => {
          const isChecked = checked[index] ?? false;
          return (
            <li
              key={item.label}
              className={clsx(
                "flex items-start gap-3 rounded-xl border px-3 py-2 transition",
                isChecked
                  ? "border-emerald-400/70 bg-emerald-400/10"
                  : "border-white/10",
              )}
            >
              <label className="flex cursor-pointer gap-3">
                <input
                  type="checkbox"
                  className="mt-1 size-4 rounded border-white/40 bg-transparent accent-emerald-400"
                  checked={isChecked}
                  onChange={() =>
                    setChecked((prev) => ({ ...prev, [index]: !isChecked }))
                  }
                />
                <span>
                  <span className="font-medium text-white">{item.label}</span>
                  {item.hint && (
                    <p className="text-xs text-white/70">{item.hint}</p>
                  )}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
