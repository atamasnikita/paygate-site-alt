"use client";

import { useId, useState } from "react";

export type FaqItem = { q: string; a: string };

export function FaqAccordion({
  items,
  onToggle
}: {
  items: FaqItem[];
  onToggle?: (params: { index: number; question: string; open: boolean }) => void;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `${baseId}-btn-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;

        return (
          <div key={item.q} className="p-4 sm:p-5">
            <button
              id={buttonId}
              className="w-full flex items-start justify-between gap-4 text-left"
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() =>
                setOpenIndex((v) => {
                  const next = v === idx ? null : idx;
                  onToggle?.({ index: idx, question: item.q, open: next === idx });
                  return next;
                })
              }
            >
              <div className="font-medium text-slate-900">{item.q}</div>
              <div className="mt-0.5 text-slate-400" aria-hidden="true">
                <ChevronIcon className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
              </div>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`${isOpen ? "mt-3" : "mt-0"} text-sm text-slate-600 ${isOpen ? "block" : "hidden"}`}
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
