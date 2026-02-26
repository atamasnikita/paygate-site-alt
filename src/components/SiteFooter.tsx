import Link from "next/link";
import { config } from "@/config";

export function SiteFooter() {
  const requisites = [
    config.ownerName ? { label: "Исполнитель", value: config.ownerName } : null,
    config.ownerStatus ? { label: "Статус", value: config.ownerStatus } : null,
    config.ownerInn ? { label: "ИНН", value: config.ownerInn } : null,
    { label: "Телефон", value: "+7(916)990-94-27" },
    config.supportEmail ? { label: "Email", value: config.supportEmail } : null,
    config.ownerAddressShort ? { label: "Адрес", value: config.ownerAddressShort } : null
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <footer className="relative z-20 border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="font-semibold">PayGate</div>
            <div className="text-sm text-slate-600 max-w-md">
              SaaS‑сервис для монетизации закрытых Telegram‑каналов и групп: подписчики платят через ваш платёжный
              провайдер, а PayGate управляет доступом.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-2">
              <div className="text-sm font-medium">Реквизиты</div>
              <div className="text-sm text-slate-600 space-y-1">
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
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
          <Link href="/oferta" className="hover:text-slate-900">
            Оферта
          </Link>
          <Link href="/privacy" className="hover:text-slate-900">
            Политика ПДн
          </Link>
          <Link href="/refunds" className="hover:text-slate-900">
            Возвраты
          </Link>
          <Link href="/contacts" className="hover:text-slate-900">
            Контакты
          </Link>
          <span className="ml-auto text-xs text-slate-500">© {new Date().getFullYear()} PayGate</span>
        </div>
      </div>
    </footer>
  );
}
