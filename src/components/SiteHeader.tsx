"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isV3 = pathname === "/" || pathname?.startsWith("/v3");
  const landingLinks = [
    { href: "#how-it-works", label: "Как это работает" },
    { href: "#miniapp-demo", label: "Mini App" },
    { href: "#features", label: "Возможности" },
    { href: "#pricing", label: "Тарифы" },
    { href: "#faq", label: "Вопросы" }
  ] as const;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="font-semibold tracking-tight">
            PayGate
          </Link>

          {isV3 ? (
            <nav className="hidden items-center gap-4 text-sm text-slate-600 md:flex" aria-label="Разделы лендинга">
              {landingLinks.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-slate-900">
                  {item.label}
                </a>
              ))}
            </nav>
          ) : (
            <nav className="flex items-center gap-3 text-sm text-slate-600" aria-label="Документы">
              <Link href="/contacts" className="hover:text-slate-900">
                Контакты
              </Link>
              <Link href="/oferta" className="hover:text-slate-900">
                Оферта
              </Link>
              <Link href="/privacy" className="hover:text-slate-900">
                ПДн
              </Link>
              <Link href="/refunds" className="hover:text-slate-900">
                Возвраты
              </Link>
            </nav>
          )}
        </div>

        {isV3 ? (
          <nav
            className="mt-2 -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 text-xs text-slate-600 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Разделы лендинга (мобильная навигация)"
          >
            {landingLinks.map((item) => (
              <a
                key={`mobile-${item.href}`}
                href={item.href}
                className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
