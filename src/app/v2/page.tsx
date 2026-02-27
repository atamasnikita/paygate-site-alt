import type { Metadata } from "next";
import Link from "next/link";
import { config } from "@/config";
import { FaqAccordion } from "@/components/FaqAccordion";
import styles from "./page.module.css";

const PILLARS = [
  {
    title: "Control center в Mini App",
    text: "Чаты, подписчики, журналы, платежи и поддержка в одном интерфейсе. Не нужно управлять продуктом кнопками в переписке."
  },
  {
    title: "Оплата напрямую владельцу канала",
    text: "Платежный провайдер (Robokassa / YooKassa) подключается на стороне владельца канала. PayGate не хранит данные карт и не становится промежуточной кассой."
  },
  {
    title: "Управление доступом по правилам",
    text: "Грейс, очередь исключений, ручные действия, белый список и выдача временного доступа по invite-ссылкам."
  }
] as const;

const PRODUCT_BLOCKS = [
  {
    title: "Раздел Чаты",
    text: "Тарифы, лимиты, активность, исключения и статус доступа в одной рабочей зоне."
  },
  {
    title: "Раздел Провайдер",
    text: "Подключение кассы, режим тест/боевой, быстрый контроль параметров магазина."
  },
  {
    title: "Раздел Журнал",
    text: "Поток событий с фильтрами и периодами. Быстрый ответ на вопрос «что сломалось и когда»."
  },
  {
    title: "Раздел Поддержка",
    text: "Владелец канала пишет прямо из mini app, ты отвечаешь из админки. Статусы и история без ручной рутины."
  },
  {
    title: "Витрина владельца канала",
    text: "Публичная страница для модерации платежного провайдера с документами, условиями и PDF-оффертой."
  },
  {
    title: "Админка платформы",
    text: "Поиск, техинциденты, воронка и обращения. Нужные действия в 1-2 клика."
  }
] as const;

const COMPARE_ROWS = [
  {
    item: "Управление тарифами и чатами",
    oldWay: "Команды в боте и ручные проверки",
    paygate: "Визуальный кабинет с таблицами, статусами и фильтрами"
  },
  {
    item: "Работа с просроченными",
    oldWay: "Ручное исключение по спискам",
    paygate: "Автоматизация + ручной запуск + белый список"
  },
  {
    item: "Витрина и документы",
    oldWay: "Собирать страницу отдельно",
    paygate: "Готовая витрина с юридическими блоками и PDF-оффертой"
  },
  {
    item: "Поддержка владельца канала",
    oldWay: "Сообщения в личку без трекинга",
    paygate: "Тикеты из mini app в админку с историей статусов"
  }
] as const;

const FAQ = [
  {
    q: "Чем PayGate отличается от сервисов «только бот-кнопки»?",
    a: "Мы оставляем Telegram простым для подписчика, а владельцу канала даем полноценный интерфейс управления подписочной моделью в mini app."
  },
  {
    q: "Можно ли запуститься без кастомного сайта?",
    a: "Да. У владельца канала есть встроенная витрина и документы. Для старта достаточно подключить бота, чат и кассу."
  },
  {
    q: "Если подписчик оплатил, но не вошел в чат сразу?",
    a: "Доступ не теряется. Подписчик может вернуться в бота и снова получить путь на вступление."
  },
  {
    q: "Какая роль PayGate в оплате?",
    a: "PayGate технически оркестрирует сценарий оплаты и доступа. Деньги идут напрямую в кассу владельца канала."
  }
] as const;

export const metadata: Metadata = {
  title: "Landing v2 Preview",
  description: "Черновик новой версии лендинга PayGate",
  robots: { index: false, follow: false }
};

export default function LandingV2Page() {
  return (
    <div className={styles.page}>
      <section className={`relative ${styles.hero}`}>
        <div className={styles.orbA} aria-hidden="true" />
        <div className={styles.orbB} aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-12 sm:pt-20 sm:pb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3 py-1 text-xs text-slate-600 ${styles.mono}`}>
                Telegram Payments Stack · Merchant First
              </div>

              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Монетизация Telegram, которая выглядит как зрелый SaaS
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                PayGate превращает хаос кнопок в боте в понятную рабочую систему для владельца канала: управление чатами, подписками, доступом,
                логами и поддержкой в mini app.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={config.botUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
                >
                  Попробовать в Telegram
                </a>
                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Открыть текущий лендинг
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <MetricItem label="Онбординг" value="~3 минуты" />
                <MetricItem label="Модель" value="Bot + Mini App" />
                <MetricItem label="Тариф Pro" value="490 ₽ / 30 дн." />
              </div>
            </div>

            <div className={`rounded-3xl p-5 sm:p-6 ${styles.heroPanel}`}>
              <div className={styles.heroPanelHead}>
                <div>
                  <div className="text-sm font-semibold text-slate-900">PayGate Control Center</div>
                  <div className="text-xs text-slate-500">Realtime Snapshot</div>
                </div>
                <div className={`rounded-full bg-slate-900 px-3 py-1 text-[11px] text-white ${styles.mono}`}>LIVE</div>
              </div>

              <div className="mt-4 space-y-3">
                <PanelRow label="Активные подписки" value="1 284" tone="ok" />
                <PanelRow label="В грейсе" value="96" tone="warn" />
                <PanelRow label="Требуют действия" value="14" tone="danger" />
              </div>

              <div className={`mt-4 rounded-2xl border border-brand-200/60 bg-brand-50/70 p-3 ${styles.ticker}`}>
                <div className="text-xs text-brand-900/80">Последнее событие</div>
                <div className="mt-1 text-sm font-medium text-brand-900">support.request_created · merchant_782</div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniKpi title="Чаты" value="5" />
                <MiniKpi title="Платежи 24ч" value="73" />
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
                <div className="text-xs text-slate-500">Mini App разделы</div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-slate-700">
                  <span className="rounded-lg border border-slate-200 px-2 py-1 text-center">Сводка</span>
                  <span className="rounded-lg border border-slate-200 px-2 py-1 text-center">Чаты</span>
                  <span className="rounded-lg border border-slate-200 px-2 py-1 text-center">Витрина</span>
                  <span className="rounded-lg border border-slate-200 px-2 py-1 text-center">Провайдер</span>
                  <span className="rounded-lg border border-slate-200 px-2 py-1 text-center">Журнал</span>
                  <span className="rounded-lg border border-slate-200 px-2 py-1 text-center">Поддержка</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <SectionHead
          eyebrow="Почему это работает"
          title="Сделано как продукт для бизнеса, а не как набор команд"
          note="Один взгляд на состояние платки, одно место для действий, минимум ручных ошибок."
        />
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PILLARS.map((item) => (
            <div key={item.title} className={`rounded-2xl p-5 ${styles.premiumCard}`}>
              <div className="text-base font-semibold text-slate-900">{item.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <SectionHead
          eyebrow="Что уже в продукте"
          title="Сильные блоки, которые реально помогают владельцу канала каждый день"
          note="Тут только то, что уже внедрено и приносит пользу в текущем продукте."
        />
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_BLOCKS.map((item) => (
            <div key={item.title} className={`rounded-2xl p-5 ${styles.bentoCard}`}>
              <div className="inline-flex rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white">PayGate</div>
              <div className="mt-3 text-base font-semibold text-slate-900">{item.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <SectionHead
          eyebrow="Сравнение подходов"
          title="Когда владелец канала растет, интерфейс побеждает бот-кнопки"
          note="Твой ключевой дифференциатор: управление бизнесом не в чате, а в кабинете."
        />

        <div className={`mt-8 overflow-hidden rounded-2xl ${styles.compareWrap}`}>
          <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <div className="px-4 py-3 sm:px-5">Сценарий</div>
            <div className="px-4 py-3 sm:px-5">Классический SaaS</div>
            <div className="px-4 py-3 sm:px-5">PayGate</div>
          </div>
          {COMPARE_ROWS.map((row, index) => (
            <div
              key={row.item}
              className={`grid grid-cols-1 gap-2 px-4 py-4 sm:grid-cols-3 sm:gap-4 sm:px-5 ${index !== COMPARE_ROWS.length - 1 ? "border-b border-slate-200" : ""}`}
            >
              <div className={`text-sm font-semibold text-slate-900 ${styles.compareCell}`}>{row.item}</div>
              <div className={`text-sm text-slate-500 ${styles.compareCell}`}>{row.oldWay}</div>
              <div className={`text-sm font-medium text-brand-900 ${styles.compareCell}`}>{row.paygate}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <SectionHead eyebrow="FAQ" title="Частые вопросы перед запуском" />
        <div className="mt-8">
          <FaqAccordion items={[...FAQ]} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
        <div className={`rounded-3xl p-6 sm:p-8 ${styles.ctaPanel}`}>
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.22em] text-white/80">Ready to launch</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Сделаем лендинг уровнем выше и включим рост</h2>
            <p className="mt-3 text-sm leading-6 text-white/85 sm:text-base">
              Эта страница - черновик v2. Если нравится направление, можно перенести на главную, докрутить микродвижение блоков и добавить реальные
              скриншоты mini app.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={config.botUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-slate-100"
              >
                Запустить PayGate в Telegram
              </a>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Вернуться на текущую главную
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">{eyebrow}</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {note ? <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">{note}</p> : null}
    </div>
  );
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-3">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function PanelRow({ label, value, tone }: { label: string; value: string; tone: "ok" | "warn" | "danger" }) {
  const toneClass =
    tone === "ok"
      ? "bg-emerald-100 text-emerald-700"
      : tone === "warn"
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
      <div className="text-sm text-slate-600">{label}</div>
      <div className={`rounded-md px-2 py-1 text-sm font-semibold ${toneClass}`}>{value}</div>
    </div>
  );
}

function MiniKpi({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{title}</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}
