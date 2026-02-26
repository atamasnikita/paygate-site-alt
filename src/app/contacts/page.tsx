import type { Metadata } from "next";
import Link from "next/link";
import { config } from "@/config";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты PayGate, реквизиты и ссылки на юридические документы."
};

export default function ContactsPage() {
  const requisites = [
    config.ownerName ? { label: "Исполнитель", value: config.ownerName } : null,
    config.ownerStatus ? { label: "Статус", value: config.ownerStatus } : null,
    config.ownerInn ? { label: "ИНН", value: config.ownerInn } : null,
    { label: "Телефон", value: "+7(916)990-94-27" },
    config.supportEmail ? { label: "Email", value: config.supportEmail } : null,
    config.ownerAddress ? { label: "Адрес для корреспонденции", value: config.ownerAddress } : null
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Контакты</h1>
      <p className="mt-3 text-slate-600 max-w-2xl">
        Если нужна помощь с подключением Robokassa или настройкой доступа — напишите или позвоните нам.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium">Реквизиты</div>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            {requisites.length ? (
              requisites.map((r) => (
                <div key={r.label}>
                  {r.label}: {r.value}
                </div>
              ))
            ) : (
              <div>{process.env.NODE_ENV === "production" ? "Оформляется" : "Заполните позже"}</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-medium">Юридические документы</div>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link href="/oferta" className="text-brand-700 hover:text-brand-800">
            Оферта
          </Link>
          <Link href="/privacy" className="text-brand-700 hover:text-brand-800">
            Политика ПДн
          </Link>
          <Link href="/refunds" className="text-brand-700 hover:text-brand-800">
            Политика возвратов
          </Link>
        </div>
      </div>
    </div>
  );
}
