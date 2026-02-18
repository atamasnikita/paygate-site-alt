"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isV3 = pathname === "/" || pathname?.startsWith("/v3");

  return (
    <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          PayGate
        </Link>
        <nav className="flex items-center gap-3 text-sm text-slate-600">
          {isV3 ? (
            <>
              <a href="#how-it-works" className="hover:text-slate-900">
                Как это работает
              </a>
              <a href="#features" className="hover:text-slate-900">
                Возможности
              </a>
              <a href="#pricing" className="hover:text-slate-900">
                Тарифы
              </a>
              <a href="#faq" className="hover:text-slate-900">
                Вопросы
              </a>
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
