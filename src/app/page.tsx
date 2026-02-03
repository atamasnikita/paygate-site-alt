import Link from "next/link";
import { config } from "@/config";
import { FaqAccordion } from "@/components/FaqAccordion";

const HOW_IT_WORKS = [
  { title: "Добавьте бота в чат админом", text: "PayGate получает права управлять доступом и может кикать пользователей с просроченной подпиской." },
  { title: "Подключите Robokassa", text: "Платежи подписчиков идут напрямую на вашу Robokassa — мы не храним данные карт." },
  { title: "Сгенерируйте ссылку и монетизируйте", text: "Раздавайте ссылку на оплату: после платежа подписчик получает ссылку‑инвайт в боте." }
] as const;

const FEATURES = [
  "Несколько чатов на одного мерчанта",
  "Подписка 30 дней + грейс 24 часа",
  "Журнал событий (платёж → доступ)",
  "Список подписчиков и статусы подписок",
  "Кабинет мерчанта в Telegram Mini App",
  "Без хранения данных карт (платежи у провайдера)",
  "Быстрый онбординг через Telegram"
] as const;

const FAQ = [
  {
    q: "Почему платежи идут через Robokassa мерчанта?",
    a: "Так деньги поступают напрямую вам и вы используете свой договор с провайдером. PayGate отвечает за автоматизацию доступа в Telegram."
  },
  {
    q: "Что происходит, если Pro не оплачен?",
    a: "Если оборот в текущем месяце превысил 5 000 ₽ и Pro не активен — создание новых оплат блокируется. Действующие подписчики остаются активными."
  },
  { q: "Кого кикает бот?", a: "Только тех пользователей, у которых закончилась подписка и истёк грейс‑период (24 часа)." },
  {
    q: "Нужна ли касса/чеки?",
    a: "Чеки и фискализация зависят от вашей схемы работы и настроек платёжного провайдера. PayGate не хранит данные карт и не принимает платежи на своей стороне."
  },
  {
    q: "Что если пользователь оплатил, но не вступил?",
    a: "Оплата подтверждается — в боте появится кнопка «Вступить», и пользователь сможет зайти в чат/канал в удобный момент."
  },
  {
    q: "Какие данные вы храните?",
    a: "Только минимальные данные для работы сервиса: Telegram ID/username, идентификаторы чатов и события оплат/доступа. Подробности — в Политике ПДн."
  }
] as const;

export default function HomePage() {
  const schemaOrg = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "PayGate",
      url: config.siteUrl,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: config.supportEmail
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "PayGate",
      url: config.siteUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "490",
        priceCurrency: "RUB"
      }
    }
  ];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-14 sm:pt-20 sm:pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Robokassa‑ready • Telegram‑first • Без данных карт
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl md:text-[52px] md:leading-[1.05] font-semibold tracking-tight text-slate-900">
            PayGate — монетизация закрытых Telegram‑каналов: оплата → ссылка на вступление → автоматическое отключение доступа
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl">
            Оплата подписчиков идёт напрямую в вашу Robokassa. PayGate выдаёт доступ и кикает пользователей с просроченной подпиской.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={config.botUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-white font-medium shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 min-h-12"
            >
              Подключить бота
            </a>
            {config.panelUrl ? (
              <a
                href={config.panelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-900 font-medium shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 min-h-12"
              >
                Открыть панель
              </a>
            ) : null}
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <HeroStat title="Free" value="до 5 000 ₽/мес" />
            <HeroStat title="Pro" value="490 ₽ / 30 дней" />
            <HeroStat title="Онбординг" value="через Telegram" />
          </div>
        </div>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
        <SectionHeading eyebrow="Как это работает" title="Три шага до монетизации" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {HOW_IT_WORKS.map((s, idx) => (
            <Card key={s.title} badge={`${idx + 1}`} title={s.title} text={s.text} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
        <SectionHeading eyebrow="Фичи" title="Ровно то, что нужно мерчанту" />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-9 w-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700">
                  <CheckIcon className="h-5 w-5" />
                </div>
                <div className="font-medium text-slate-900">{f}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
        <SectionHeading eyebrow="Тариф" title="Прозрачно и без сюрпризов" />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="text-lg font-semibold">Free</div>
              <div className="text-sm text-slate-600">до 5 000 ₽ оборота/мес</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <DotIcon className="mt-2 h-3 w-3 text-slate-400" /> Бесплатно, пока оборот ≤ 5 000 ₽ в текущем месяце
              </li>
              <li className="flex gap-2">
                <DotIcon className="mt-2 h-3 w-3 text-slate-400" /> При превышении лимита без Pro — блокируем создание новых оплат
              </li>
              <li className="flex gap-2">
                <DotIcon className="mt-2 h-3 w-3 text-slate-400" /> Существующие подписчики не кикаются
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-brand-200 bg-gradient-to-b from-brand-50 to-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="text-lg font-semibold">Pro</div>
              <div className="text-sm text-slate-700">490 ₽ / 30 дней</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <DotIcon className="mt-2 h-3 w-3 text-brand-400" /> Снятие ограничения по обороту
              </li>
              <li className="flex gap-2">
                <DotIcon className="mt-2 h-3 w-3 text-brand-400" /> Приоритетные обновления и поддержка
              </li>
            </ul>

            <div className="mt-6">
              <a
                href={config.botUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-white font-medium shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 min-h-12"
              >
                Подключить PayGate
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
        <SectionHeading eyebrow="FAQ" title="Частые вопросы" />
        <div className="mt-8">
          <FaqAccordion items={[...FAQ]} />
        </div>
        <div className="mt-8 text-sm text-slate-600">
          Нужны контакты и реквизиты? Они на странице{" "}
          <Link href="/contacts" className="text-brand-700 hover:text-brand-800">
            Контакты
          </Link>{" "}
          и в футере.
        </div>
      </section>
    </>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="text-xs font-medium tracking-wide text-brand-700">{eyebrow}</div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function Card({ badge, title, text }: { badge: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700 font-semibold">
          {badge}
        </div>
        <div className="font-medium">{title}</div>
      </div>
      <p className="mt-3 text-sm text-slate-600">{text}</p>
    </div>
  );
}

function HeroStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs text-slate-500">{title}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 0 1.415l-7.1 7.1a1 1 0 0 1-1.415 0l-3.393-3.394a1 1 0 1 1 1.415-1.414l2.686 2.687 6.392-6.393a1 1 0 0 1 1.415 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <circle cx="10" cy="10" r="4" />
    </svg>
  );
}
