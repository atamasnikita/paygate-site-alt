"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

type StorefrontAccent = "ocean" | "emerald" | "amber" | "rose" | "slate" | "indigo";

const ACCENT_STYLES: Record<
  StorefrontAccent,
  {
    backdrop: string;
    badgeBorder: string;
    badgeBg: string;
    badgeText: string;
    offerBorder: string;
    offerBg: string;
    dot: string;
    ctaDisabled: string;
  }
> = {
  ocean: {
    backdrop: "bg-gradient-to-b from-sky-100/80 via-white to-cyan-100/70",
    badgeBorder: "border-sky-200",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    offerBorder: "border-sky-200",
    offerBg: "bg-sky-50/70",
    dot: "bg-sky-500",
    ctaDisabled: "bg-sky-300 text-sky-700"
  },
  emerald: {
    backdrop: "bg-gradient-to-b from-emerald-100/80 via-white to-teal-100/70",
    badgeBorder: "border-emerald-200",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    offerBorder: "border-emerald-200",
    offerBg: "bg-emerald-50/70",
    dot: "bg-emerald-500",
    ctaDisabled: "bg-emerald-300 text-emerald-800"
  },
  amber: {
    backdrop: "bg-gradient-to-b from-amber-100/80 via-white to-orange-100/70",
    badgeBorder: "border-amber-200",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    offerBorder: "border-amber-200",
    offerBg: "bg-amber-50/70",
    dot: "bg-amber-500",
    ctaDisabled: "bg-amber-300 text-amber-800"
  },
  rose: {
    backdrop: "bg-gradient-to-b from-rose-100/80 via-white to-pink-100/70",
    badgeBorder: "border-rose-200",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    offerBorder: "border-rose-200",
    offerBg: "bg-rose-50/70",
    dot: "bg-rose-500",
    ctaDisabled: "bg-rose-300 text-rose-800"
  },
  slate: {
    backdrop: "bg-gradient-to-b from-slate-200/80 via-white to-slate-100/80",
    badgeBorder: "border-slate-300",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-700",
    offerBorder: "border-slate-300",
    offerBg: "bg-slate-100/70",
    dot: "bg-slate-500",
    ctaDisabled: "bg-slate-300 text-slate-700"
  },
  indigo: {
    backdrop: "bg-gradient-to-b from-indigo-100/80 via-white to-violet-100/70",
    badgeBorder: "border-indigo-200",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    offerBorder: "border-indigo-200",
    offerBg: "bg-indigo-50/70",
    dot: "bg-indigo-500",
    ctaDisabled: "bg-indigo-300 text-indigo-800"
  }
};

function resolveAccent(value: string | null): StorefrontAccent {
  if (!value) return "ocean";
  return Object.hasOwn(ACCENT_STYLES, value) ? (value as StorefrontAccent) : "ocean";
}

export function DemoStorefrontClient() {
  const [accent, setAccent] = useState<StorefrontAccent>(() => {
    if (typeof window === "undefined") return "ocean";
    const query = new URLSearchParams(window.location.search);
    return resolveAccent(query.get("accent"));
  });

  useLayoutEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const accentFromUrl = resolveAccent(query.get("accent"));
    setAccent((prev) => (prev === accentFromUrl ? prev : accentFromUrl));
  }, []);

  const tone = ACCENT_STYLES[accent];

  return (
    <section className="relative min-h-dvh overflow-hidden">
      <div className={`absolute inset-0 ${tone.backdrop}`} aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <article className="rounded-3xl border border-slate-200/90 bg-white/95 p-5 shadow-xl backdrop-blur sm:p-8">
          <header className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-slate-700">
              <Image src="/storefront-travel.webp" alt="Логотип канала о путешествиях" width={56} height={56} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Вокруг света</h1>
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${tone.badgeBorder} ${tone.badgeBg} ${tone.badgeText}`}>
                  Путешествия
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                  Демо-страница
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
                Формат реальной витрины PayGate: описание, тариф, условия и поддержка в одном месте. Показаны данные демо-канала о путешествиях.
              </p>
            </div>
          </header>

          <div className={`mt-6 rounded-2xl border p-4 sm:p-5 ${tone.offerBorder} ${tone.offerBg}`}>
            <div className="text-sm font-medium text-slate-700">Подписка</div>
            <div className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">Премиум доступ</div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-700">
              <span className="rounded-full bg-white/90 px-3 py-1 font-semibold">499 ₽</span>
              <span>·</span>
              <span>30 дней доступа</span>
              <span>·</span>
              <span>Клуб путешествий в Telegram</span>
            </div>

            <ul className="mt-4 grid gap-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className={`mt-[7px] h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                <span>Маршруты по странам и городам</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-[7px] h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                <span>Чек-листы для сборов и переездов</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-[7px] h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                <span>Закрытый чат путешественников</span>
              </li>
            </ul>

            <button type="button" disabled className={`mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold ${tone.ctaDisabled}`}>
              Открыть в Telegram
            </button>
            <p className="mt-2 text-center text-xs text-slate-500">В демо покупка и выдача доступа отключены.</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-medium text-slate-900">Продавец и условия</div>
              <p className="mt-2 text-sm text-slate-600">ООО «Демо Клуб» · ИНН 0000000000</p>
              <p className="mt-2 text-sm text-slate-600">Возврат по обращению в поддержку</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-medium text-slate-900">Поддержка</div>
              <div className="mt-2 space-y-1 text-sm text-slate-600">
                <p>Email: demo@paygt.ru</p>
                <p>Telegram: @paygate_demo</p>
              </div>
            </div>
          </div>

          <footer className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">
            Используя эту витрину, вы соглашаетесь с условиями продавца. По сервису PayGate:
            {" "}
            <Link href="/oferta" className="text-brand-700 hover:text-brand-800">
              оферта
            </Link>
            {", "}
            <Link href="/privacy" className="text-brand-700 hover:text-brand-800">
              политика ПДн
            </Link>
            {", "}
            <Link href="/refunds" className="text-brand-700 hover:text-brand-800">
              политика возвратов
            </Link>
            .
          </footer>
        </article>

        <div className="mt-6">
          <Link
            href={`/?accent=${accent}#storefront-demo`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Вернуться на лендинг
          </Link>
        </div>
      </div>
    </section>
  );
}
