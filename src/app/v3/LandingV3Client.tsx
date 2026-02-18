"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { config } from "@/config";
import { FaqAccordion } from "@/components/FaqAccordion";
import styles from "./v3.module.css";

type JourneyStatus = "ready" | "needs_action" | "done";
type JourneyConnectorStatus = "ready" | "active" | "done";
type DemoMode = "before" | "after";
type DemoTab = "status" | "chats" | "storefront" | "provider" | "logs";
type DemoTransitionDirection = "none" | "forward" | "backward";

const EVENT_ENDPOINT = process.env.NEXT_PUBLIC_EVENTS_ENDPOINT?.trim() || "";

const HERO_BADGES = [
  { label: "Онбординг", value: "~10 минут" },
  { label: "Авто-исключение", value: "grace + правила" },
  { label: "Free", value: "до 5 000 ₽/мес" },
  { label: "Pro", value: "490 ₽ / 30 дней" }
] as const;

const MINIAPP_SECTIONS = ["Сводка", "Чаты", "Витрина", "Провайдер", "Журнал", "Поддержка"] as const;

const FEATURES = [
  {
    title: "Авто-исключение + грейс-период",
    text: "Настраиваемые правила: грейс, уведомления и действия при просрочке."
  },
  {
    title: "Витрина продавца на paygt.ru",
    text: "Без сайта: публичная страница продавца с описанием, условиями и контактами."
  },
  {
    title: "Оферта + PDF одним кликом",
    text: "HTML-оферта плюс скачивание PDF для проверок и модерации."
  },
  {
    title: "Статусы подписок",
    text: "Active / Grace / Expired видны сразу, без ручных таблиц."
  },
  {
    title: "Деньги напрямую в Robokassa",
    text: "Вы не зависите от PayGate как от кошелька: деньги идут в кассу владельца канала."
  },
  {
    title: "Оплатил, но доступ не выдан",
    text: "Понятные статусы и возможность повторной выдачи доступа без хаоса."
  }
] as const;

const DEMO_TABS: Array<{ id: DemoTab; label: string; subtitle: string }> = [
  { id: "status", label: "Сводка", subtitle: "Оборот и статусы" },
  { id: "chats", label: "Чаты", subtitle: "Подписчики и тарифы" },
  { id: "storefront", label: "Витрина", subtitle: "Публикация и оффер" },
  { id: "provider", label: "Провайдер", subtitle: "Robokassa и webhook" },
  { id: "logs", label: "Журнал", subtitle: "События и действия" }
] as const;

const DEMO_DATA = {
  overview: {
    active: "1 284",
    grace: "96",
    expired: "14",
    chats: "5",
    monthTurnover: "84 900 ₽"
  },
  status: {
    periodLabel: "30 дней",
    turnover: "84 900 ₽",
    payments: "284",
    todayTurnover: "4 200 ₽",
    bars: [34, 46, 28, 55, 72, 49, 62] as const,
    subscriptions: [
      { tone: "active", label: "Активные", hint: "Подписка действует", value: "1 284" },
      { tone: "grace", label: "В грейсе", hint: "Льготный период", value: "96" },
      { tone: "expired", label: "Просроченные", hint: "Нужно продлить", value: "14" }
    ] as const
  },
  chats: {
    totalLabel: "3 из 3 подключено",
    needsAttention: "1",
    rows: [
      {
        title: "Crypto Club",
        adminOk: true,
        rules: "грейс 24ч · исключение включено",
        subscribers: "520",
        tariffs: "3 активн.",
        turnover: "39 400 ₽"
      },
      {
        title: "Premium News",
        adminOk: true,
        rules: "грейс 24ч · исключение включено",
        subscribers: "310",
        tariffs: "2 активн.",
        turnover: "28 900 ₽"
      },
      {
        title: "AI Digest",
        adminOk: false,
        rules: "нужно выдать права боту",
        subscribers: "74",
        tariffs: "1 активн.",
        turnover: "6 600 ₽"
      }
    ] as const
  },
  storefront: {
    status: "published",
    draftUrl: "m.paygt.ru/crypto-club?draft=1",
    publicUrl: "m.paygt.ru/crypto-club",
    offerTitle: "VIP 30 дней",
    offerPrice: "499 ₽ / 30 дн."
  },
  provider: {
    status: "connected",
    summary: "Статус: подключено • режим: тестовый",
    webhookLabel: "Result URL",
    webhookValue: "api.paygt.ru/webhooks/robokassa/subscriber",
    merchantLogin: "crypto_club"
  },
  logs: {
    total: "1 248",
    rangeLabel: "30 дней",
    rows: [
      { name: "Платёж подтвержден", status: "payment.paid", note: "Сегодня, 14:22 • @ivan" },
      { name: "Подписка активирована", status: "subscription.activated", note: "Сегодня, 14:22 • @ivan" },
      { name: "Витрина опубликована", status: "storefront.published", note: "Сегодня, 09:14 • владелец" }
    ] as const
  }
} as const;

const FAQ = [
  { q: "Нужен ли сайт для запуска?", a: "Нет. Витрина, оферта и возвраты публикуются на paygt.ru, этого достаточно для старта." },
  { q: "Куда идут деньги подписчиков?", a: "Деньги идут напрямую в Robokassa владельца канала. PayGate не принимает платежи на свою сторону." },
  {
    q: "Что если оплатили, но доступ не выдан?",
    a: "Видны статусы и причина ошибки. Можно быстро повторить выдачу доступа через рабочие инструменты."
  },
  {
    q: "Кто отвечает за контент и возвраты?",
    a: "Ответственность за контент и политику возвратов несет продавец, PayGate дает техническую инфраструктуру."
  },
  { q: "Можно ли подключить несколько чатов на одного продавца?", a: "Да. Один владелец канала может управлять несколькими чатами и тарифами." },
  {
    q: "Что будет при превышении лимита Free?",
    a: "Сервис предупредит заранее. Новые оплаты можно временно ограничить до активации Pro, текущих подписчиков не отключаем из-за тарифа."
  }
] as const;

const JOURNEY_NODES = [
  { id: "channel", title: "Создай закрытый канал", subtitle: "Chat / Channel", actionLabel: "Создаем" },
  { id: "telegram", title: "Добавь бота админом", subtitle: "Telegram / Bot Admin", actionLabel: "Добавляем" },
  { id: "storefront", title: "Создай витрину в mini app", subtitle: "PayGate Mini App", actionLabel: "Создаем" },
  { id: "provider", title: "Подключи Robokassa", subtitle: "Payment Provider", actionLabel: "Подключаем" },
  { id: "link", title: "Опубликуй ссылку на оплату", subtitle: "Public Pay Link", actionLabel: "Публикуем" },
  { id: "result", title: "Первая оплата и доступ", subtitle: "Paid -> Access Granted", actionLabel: "Получаем" }
] as const;

const JOURNEY_STATUS_META: Record<
  JourneyStatus,
  { label: string; pillClass: string; nodeClass: string }
> = {
  ready: {
    label: "Следующий шаг",
    pillClass: styles.journeyStatusReady,
    nodeClass: styles.journeyNodeReady
  },
  needs_action: {
    label: "В процессе",
    pillClass: styles.journeyStatusNeedsAction,
    nodeClass: styles.journeyNodeNeedsAction
  },
  done: {
    label: "Сделано",
    pillClass: styles.journeyStatusDone,
    nodeClass: styles.journeyNodeDone
  }
};

function getJourneyNodeStatus(step: number, index: number): JourneyStatus {
  if (step >= JOURNEY_NODES.length) return "done";
  if (index < step) return "done";
  if (index === step) return "needs_action";
  return "ready";
}

function getJourneyConnectorStatus(step: number, index: number): JourneyConnectorStatus {
  if (step >= JOURNEY_NODES.length) return "done";
  if (index < step) return "done";
  if (index === step && step < JOURNEY_NODES.length - 1) return "active";
  return "ready";
}

function trackEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const data = {
    event,
    payload: payload ?? {},
    path: window.location.pathname,
    ts: new Date().toISOString()
  };

  console.info("[paygate-v3]", data);

  if (!EVENT_ENDPOINT) return;

  const body = JSON.stringify(data);
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(EVENT_ENDPOINT, new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch(EVENT_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true
    });
  } catch {
    // noop
  }
}

export function LandingV3Client() {
  const [journeyStep, setJourneyStep] = useState(0);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [demoMode, setDemoMode] = useState<DemoMode>("after");
  const [demoTab, setDemoTab] = useState<DemoTab>("status");
  const [demoTransition, setDemoTransition] = useState<DemoTransitionDirection>("none");
  const pricingRef = useRef<HTMLElement | null>(null);
  const journeyRef = useRef<HTMLElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const completeTrackedRef = useRef(false);

  useEffect(() => {
    const node = pricingRef.current;
    if (!node) return;

    let sent = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (sent) return;
        if (!entries.some((entry) => entry.isIntersecting)) return;
        sent = true;
        trackEvent("scroll_depth_pricing", { section: "pricing" });
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || window.innerWidth <= 768) return;

    let raf = 0;
    let prevOffset = -1;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const offset = Math.min(window.scrollY * 0.06, 84);
        if (Math.abs(offset - prevOffset) < 0.35) return;
        prevOffset = offset;
        root.style.setProperty("--parallax-offset", `${offset.toFixed(1)}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const node = journeyRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setJourneyStarted(true);
        observer.disconnect();
      },
      { threshold: 0.28 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!journeyStarted) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setJourneyStep(JOURNEY_NODES.length);
      return;
    }

    setJourneyStep(0);
  }, [journeyStarted]);

  useEffect(() => {
    if (!journeyStarted) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (journeyStep >= JOURNEY_NODES.length) return;

    const timer = window.setTimeout(() => {
      setJourneyStep((prev) => Math.min(JOURNEY_NODES.length, prev + 1));
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [journeyStarted, journeyStep]);

  useEffect(() => {
    if (journeyStep < JOURNEY_NODES.length) return;
    if (completeTrackedRef.current) return;
    completeTrackedRef.current = true;
    trackEvent("journey_complete_view");
  }, [journeyStep]);

  const handleJourneyNodeClick = (nodeId: string, index: number) => {
    const status = getJourneyNodeStatus(journeyStep, index);
    trackEvent("journey_step_click", { step: nodeId, status });
  };

  const handleDemoMode = (mode: DemoMode) => {
    setDemoMode(mode);
    trackEvent("before_after_toggle", { mode });
  };

  const handleDemoTab = (tab: DemoTab) => {
    if (tab === demoTab) return;

    const currentIndex = DEMO_TABS.findIndex((item) => item.id === demoTab);
    const nextIndex = DEMO_TABS.findIndex((item) => item.id === tab);
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const direction: DemoTransitionDirection =
      prefersReducedMotion || currentIndex === -1 || nextIndex === -1
        ? "none"
        : nextIndex > currentIndex
        ? "forward"
        : "backward";

    setDemoTransition(direction);
    setDemoTab(tab);
    trackEvent("demo_tab_click", { tab });
  };

  return (
    <div ref={pageRef} className={styles.page}>
      <div className={styles.pageBackdrop} aria-hidden="true">
        <div className={styles.pageGlowA} />
        <div className={styles.pageGlowB} />
        <div className={styles.pageGlowC} />
      </div>

      <div className={styles.pageContent}>
      <section className={styles.hero}>
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-14 sm:pt-20 sm:pb-16">
          <div className="grid grid-cols-1 gap-9 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12">
            <div>
              <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
                Сервис для организации платной подписки в Telegram
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                Монетизация контента в Telegram без сайта и лишней рутины. Подписчик платит, бот выдает доступ и следит за исключениями. Витрина
                продавца, оферта и возвраты публикуются на paygt.ru. Деньги поступают напрямую к вам через Robokassa.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={config.botUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/25 ${styles.primaryCta}`}
                  onClick={() => trackEvent("hero_primary_cta_click", { placement: "hero" })}
                >
                  Попробовать в Telegram
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  onClick={() => trackEvent("hero_secondary_cta_click", { target: "#how-it-works" })}
                >
                  Как это работает
                </a>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {HERO_BADGES.map((item) => (
                  <Reveal key={item.label} className="h-full">
                    <div className={styles.badgeCard}>
                      <div className="text-[11px] uppercase tracking-wide text-slate-500">{item.label}</div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">{item.value}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal className={styles.controlCard}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">PayGate Control Center</div>
                  <div className="text-xs text-slate-500">Realtime overview</div>
                </div>
                <span className={styles.liveBadge}>LIVE</span>
              </div>

              <div className="mt-4 space-y-2.5">
                <ControlRow label="Активные" value={DEMO_DATA.overview.active} tone="ok" />
                <ControlRow label="В грейсе" value={DEMO_DATA.overview.grace} tone="warn" />
                <ControlRow label="Просроченные" value={DEMO_DATA.overview.expired} tone="danger" />
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
                <div className="text-xs text-slate-500">Поток событий</div>
                <div className={`mt-2 rounded-xl border border-brand-200/70 bg-brand-50/70 px-3 py-2 text-sm font-medium text-brand-900 ${styles.signalTicker}`}>
                  Оплата подтверждена — доступ выдан, оборот обновлен
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniKpi title="Чатов" value={DEMO_DATA.overview.chats} />
                <MiniKpi title="Оборот за месяц" value={DEMO_DATA.overview.monthTurnover} />
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
                <div className="text-xs text-slate-500">Разделы mini app</div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-slate-700">
                  {MINIAPP_SECTIONS.map((section) => (
                    <span key={section} className="rounded-lg border border-slate-200 px-2 py-1 text-center">
                      {section}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className={styles.trustLine}>Robokassa-ready • Telegram-first • Без данных карт</div>
      </section>

      <section id="how-it-works" ref={journeyRef} className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <SectionHead
          eyebrow="Как это работает"
          title="Несколько шагов до первых денег в Telegram"
          text="Путь владельца канала: закрытый канал, бот, витрина, провайдер и ссылка на оплату. После первого платежа PayGate сам держит под контролем доступ и статусы."
        />

        <Reveal>
          <div className={styles.journeyLayout}>
            <div className={styles.journeyTrack}>
              <div className={styles.journeyDesktop}>
                {JOURNEY_NODES.map((node, index) => {
                  const nodeStatus = getJourneyNodeStatus(journeyStep, index);
                  return (
                    <JourneyNodeCard
                      key={node.id}
                      node={node}
                      status={nodeStatus}
                      onClick={() => handleJourneyNodeClick(node.id, index)}
                    />
                  );
                })}
              </div>

              <div
                className={styles.journeyConnectors}
                style={{ gridTemplateColumns: `repeat(${JOURNEY_NODES.length - 1}, minmax(0, 1fr))` }}
                aria-hidden="true"
              >
                {JOURNEY_NODES.slice(0, -1).map((node, index) => {
                  const connectorStatus = getJourneyConnectorStatus(journeyStep, index);
                  return (
                    <span
                      key={`${node.id}-connector`}
                      className={`${styles.journeyConnector} ${
                        connectorStatus === "active"
                          ? styles.journeyConnectorActive
                          : connectorStatus === "done"
                          ? styles.journeyConnectorDone
                          : styles.journeyConnectorReady
                      }`}
                    />
                  );
                })}
              </div>

              <div className={styles.journeyMobile}>
                {JOURNEY_NODES.map((node, index) => {
                  const nodeStatus = getJourneyNodeStatus(journeyStep, index);
                  return (
                    <JourneyMobileCard
                      key={`${node.id}-mobile`}
                      node={node}
                      status={nodeStatus}
                      onClick={() => handleJourneyNodeClick(node.id, index)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.journeyStorefrontHint}>
            Витрину, которую вы создаете в mini app, можно использовать в Robokassa как публичную ссылку продавца с офертой и правилами возврата.
          </div>
        </Reveal>

        <p className="mt-5 text-sm leading-6 text-slate-600 sm:text-base">
          После запуска процесс работает автоматически: оплата, выдача доступа, статусы Active / Grace / Expired и исключение по вашим правилам.
        </p>

        <div className={styles.journeyAfterLine}>
          <span>После подключения всё управление — в mini app.</span>
          <a
            href="#miniapp-demo"
            className={styles.journeyAfterCta}
            onClick={() => trackEvent("miniapp_demo_cta_click", { placement: "after_journey" })}
          >
            Посмотреть mini app
          </a>
        </div>
      </section>

      <section id="miniapp-demo" className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <SectionHead
          eyebrow="Демо mini app"
          title="Удобная mini app вместо кнопок в боте"
          text="Статусы, оборот, чаты, витрина, провайдер — всё в одном месте."
        />

        <div className={styles.demoModeToggle}>
          <button
            type="button"
            className={`${styles.demoModeBtn} ${demoMode === "before" ? styles.demoModeBtnActive : ""}`}
            onClick={() => handleDemoMode("before")}
          >
            До PayGate
          </button>
          <button
            type="button"
            className={`${styles.demoModeBtn} ${demoMode === "after" ? styles.demoModeBtnActive : ""}`}
            onClick={() => handleDemoMode("after")}
          >
            После PayGate
          </button>
        </div>

        <Reveal>
          {demoMode === "before" ? (
            <BeforePaygateCard />
          ) : (
            <div className={styles.demoLayout}>
              <div className={styles.demoNav}>
                {DEMO_TABS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.demoNavBtn} ${demoTab === item.id ? styles.demoNavBtnActive : ""}`}
                    onClick={() => handleDemoTab(item.id)}
                  >
                    <span className="text-sm font-semibold text-slate-900">{item.label}</span>
                    <span className="text-xs text-slate-500">{item.subtitle}</span>
                  </button>
                ))}
              </div>

              <div className={styles.demoPhone}>
                <div className={styles.demoPhoneTop}>
                  <span className={styles.demoLiveDot} />
                  <span className="text-xs font-semibold tracking-wide text-slate-600">mini app live demo</span>
                </div>
                <DemoPhoneScreen tab={demoTab} onTabChange={handleDemoTab} direction={demoTransition} />
              </div>
            </div>
          )}
        </Reveal>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <SectionHead eyebrow="Возможности" title="Инструменты для владельца канала, которые реально работают в бою" />
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <Reveal key={feature.title} delay={idx * 50}>
              <article className={styles.featureCard}>
                <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="pricing" ref={pricingRef} className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <SectionHead eyebrow="Тарифы" title="Прозрачный тариф без скрытых условий" />
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Reveal>
            <article className={styles.pricingCard}>
              <div className="flex items-center justify-between gap-4">
                <div className="text-lg font-semibold text-slate-900">Free</div>
                <div className="text-sm text-slate-600">до 5 000 ₽/мес</div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Бесплатно, пока оборот в текущем месяце не превышает лимит. Подходит для теста и первых продаж.
              </p>
            </article>
          </Reveal>

          <Reveal delay={80}>
            <article className={styles.pricingCardPro}>
              <div className="flex items-center justify-between gap-4">
                <div className="text-lg font-semibold text-slate-900">Pro</div>
                <div className="text-sm text-slate-700">490 ₽ / 30 дней</div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Для стабильной монетизации без ограничений по обороту.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={config.botUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                  onClick={() => trackEvent("pricing_primary_cta_click", { placement: "pricing" })}
                >
                  Подключить бота
                </a>
                <a
                  href={`mailto:${config.supportEmail}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  onClick={() => trackEvent("pricing_secondary_cta_click", { placement: "pricing", type: "mailto" })}
                >
                  Задать вопрос
                </a>
              </div>
            </article>
          </Reveal>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-600">
          Если оборот превысил 5 000 ₽/мес, мы предупредим. Новые оплаты можно временно приостановить до оплаты Pro. Текущих подписчиков не исключаем
          автоматически только из-за тарифа.
        </p>
      </section>

      <section id="faq" className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <SectionHead eyebrow="Вопросы" title="Закрываем ключевые вопросы перед запуском" />
        <div className="mt-8">
          <FaqAccordion
            items={[...FAQ]}
            onToggle={({ question, open }) => {
              if (!open) return;
              trackEvent("faq_open", { question });
            }}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
        <div className={styles.bottomCta}>
          <div className="max-w-3xl">
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Запускай платный Telegram без лишней инфраструктуры</h2>
            <p className="mt-3 text-sm leading-6 text-white/90 sm:text-base">
              Подключи бота, настрой чат и начни продажи. Дальше PayGate держит процесс под контролем: платежи, доступ, статусы и исключения.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={config.botUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-slate-100"
                onClick={() => trackEvent("final_cta_click", { placement: "footer_cta" })}
              >
                Подключить бота
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.17em] text-brand-700">{eyebrow}</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {text ? <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">{text}</p> : null}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.revealVisible : ""} ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ControlRow({ label, value, tone }: { label: string; value: string; tone: "ok" | "warn" | "danger" }) {
  const toneClass =
    tone === "ok"
      ? "bg-emerald-100 text-emerald-700"
      : tone === "warn"
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5">
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

function JourneyNodeCard({
  node,
  status,
  onClick
}: {
  node: (typeof JOURNEY_NODES)[number];
  status: JourneyStatus;
  onClick: () => void;
}) {
  const meta = JOURNEY_STATUS_META[status];
  const label = status === "needs_action" ? node.actionLabel : meta.label;

  return (
    <article
      className={`${styles.journeyNode} ${meta.nodeClass}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        onClick();
      }}
    >
      <div className="text-[11px] uppercase tracking-[0.1em] text-slate-500">{node.subtitle}</div>
      <h3 className="text-sm font-semibold leading-5 text-slate-900">{node.title}</h3>
      <div className={styles.journeyStatusWrap}>
        <span key={`${node.id}-${label}`} className={`${styles.journeyStatusPill} ${meta.pillClass}`}>
          <span className={styles.journeyStatusText}>{label}</span>
        </span>
        {status === "needs_action" ? <span className={styles.journeyLoader} aria-hidden="true" /> : null}
      </div>
    </article>
  );
}

function JourneyMobileCard({
  node,
  status,
  onClick
}: {
  node: (typeof JOURNEY_NODES)[number];
  status: JourneyStatus;
  onClick: () => void;
}) {
  const meta = JOURNEY_STATUS_META[status];
  const label = status === "needs_action" ? node.actionLabel : meta.label;

  return (
    <article
      className={`${styles.journeyMobileCard} ${meta.nodeClass}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        onClick();
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.1em] text-slate-500">{node.subtitle}</div>
          <h3 className="mt-1 text-sm font-semibold leading-5 text-slate-900">{node.title}</h3>
        </div>
        <div className={styles.journeyStatusWrap}>
          <span key={`${node.id}-${label}`} className={`${styles.journeyStatusPill} ${meta.pillClass}`}>
            <span className={styles.journeyStatusText}>{label}</span>
          </span>
          {status === "needs_action" ? <span className={styles.journeyLoader} aria-hidden="true" /> : null}
        </div>
      </div>
    </article>
  );
}

function BeforePaygateCard() {
  return (
    <div className={styles.beforeCard}>
      <div className="text-sm font-semibold text-slate-900">До PayGate</div>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Управление через кнопки в боте и ручные списки: сложно увидеть, кто оплатил, кто в грейсе и кому уже нужно закрыть доступ.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className={styles.beforePainItem}>Ручная проверка оплат</div>
        <div className={styles.beforePainItem}>Разрозненные статусы</div>
        <div className={styles.beforePainItem}>Нет единого экрана</div>
      </div>
    </div>
  );
}

function DemoPhoneScreen({
  tab,
  onTabChange,
  direction
}: {
  tab: DemoTab;
  onTabChange: (tab: DemoTab) => void;
  direction: DemoTransitionDirection;
}) {
  const motionClass =
    direction === "forward" ? styles.demoScreenForward : direction === "backward" ? styles.demoScreenBackward : "";

  return (
    <div className={styles.demoApp}>
      <div className={styles.demoAppHeader}>
        <div>
          <div className={styles.demoAppTitle}>PayGate</div>
          <div className={styles.demoMuted}>Управление mini app</div>
        </div>
        <span className={styles.demoAppBadge}>PRO</span>
      </div>

      <div key={tab} className={`${styles.demoScreen} ${motionClass}`}>
        {tab === "status" ? <DemoStatusTab /> : null}
        {tab === "chats" ? <DemoChatsTab /> : null}
        {tab === "storefront" ? <DemoStorefrontTab /> : null}
        {tab === "provider" ? <DemoProviderTab /> : null}
        {tab === "logs" ? <DemoLogsTab /> : null}
      </div>

      <div className={styles.demoTabbar} role="tablist" aria-label="Разделы mini app">
        {DEMO_TABS.map((item) => (
          <button
            key={`phone-${item.id}`}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`${styles.demoTabbarBtn} ${tab === item.id ? styles.demoTabbarBtnActive : ""}`}
            onClick={() => onTabChange(item.id)}
          >
            <span className={styles.demoTabbarIcon} aria-hidden="true">
              <DemoTabIcon tab={item.id} />
            </span>
            <span className={styles.demoTabbarLabel}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DemoTabIcon({ tab }: { tab: DemoTab }) {
  if (tab === "status") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.4 10.1C5.1 10.7 5.1 11.3 5.1 12.7v4.3c0 1.8 0 2.7.6 3.2.5.6 1.3.6 2.8.6v-4.9c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v4.9c1.5 0 2.3 0 2.8-.6.6-.5.6-1.4.6-3.2v-4.3c0-1.4 0-2-.3-2.6-.3-.6-.8-1-1.8-1.9l-1-.8c-1.9-1.6-2.8-2.4-3.9-2.4-1.1 0-2 .8-3.9 2.4l-1 .8c-1 .9-1.5 1.3-1.8 1.9Zm8.1 10.7v-4.9h-3v4.9h3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (tab === "chats") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 18h2v4.1L11.1 18H16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2z" fill="currentColor" />
        <path d="M20 2H8c-1.1 0-2 .9-2 2h12c1.1 0 2 .9 2 2v8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor" />
      </svg>
    );
  }
  if (tab === "storefront") {
    return (
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M18 9.9V20H2V9.9a4.2 4.2 0 0 0 3-.4V14h10V9.5a4.3 4.3 0 0 0 3 .4zM3 0h4l-.7 6A3.4 3.4 0 0 1 3 9C1.3 9 .4 7.7 1 6.1L3 0zm5 0h4l.7 6.3c.2 1.5-.9 2.7-2.4 2.7h-.6A2.4 2.4 0 0 1 7.3 6.3L8 0zm5 0h4l2 6.1c.6 1.6-.3 2.9-1.9 2.9a3.4 3.4 0 0 1-3.3-3L13 0z" fill="currentColor" />
      </svg>
    );
  }
  if (tab === "provider") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 10H20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M84 0H12a6 6 0 0 0-6 6v84a6 6 0 0 0 6 6h72a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6Zm-6 84H18V12h60v72Z" fill="currentColor" />
      <path d="M36 36h24a6 6 0 0 0 0-12H36a6 6 0 0 0 0 12Zm0 24h24a6 6 0 0 0 0-12H36a6 6 0 0 0 0 12Z" fill="currentColor" />
    </svg>
  );
}

function DemoStatusTab() {
  const activeCount = Number(DEMO_DATA.overview.active.replace(/\s/gu, "")) || 0;
  const graceCount = Number(DEMO_DATA.overview.grace.replace(/\s/gu, "")) || 0;
  const expiredCount = Number(DEMO_DATA.overview.expired.replace(/\s/gu, "")) || 0;
  const totalCount = activeCount + graceCount + expiredCount;
  const activeWidth = totalCount ? `${(activeCount / totalCount) * 100}%` : "0%";
  const graceWidth = totalCount ? `${(graceCount / totalCount) * 100}%` : "0%";
  const expiredWidth = totalCount ? `${(expiredCount / totalCount) * 100}%` : "0%";

  return (
    <div className={`${styles.demoPanel} ${styles.demoPanelStack}`}>
      <div className={styles.demoCardLike}>
        <div className={styles.demoPanelHeadRow}>
          <div>
            <div className={styles.demoPanelTitle}>Оборот</div>
            <div className={styles.demoMuted}>Период: {DEMO_DATA.status.periodLabel}</div>
          </div>
          <div className={styles.demoSegmented}>
            <span className={styles.demoSegmentedItem}>День</span>
            <span className={styles.demoSegmentedItem}>7 дн</span>
            <span className={`${styles.demoSegmentedItem} ${styles.demoSegmentedItemActive}`}>Месяц</span>
          </div>
        </div>

        <div className={styles.demoMetricGrid}>
          <DemoMetric label="Оборот" value={DEMO_DATA.status.turnover} />
          <DemoMetric label="Оплат" value={DEMO_DATA.status.payments} />
          <DemoMetric label="Сегодня" value={DEMO_DATA.status.todayTurnover} />
        </div>

        <div className={styles.demoBars}>
          {DEMO_DATA.status.bars.map((height, idx) => (
            <span key={`bar-${idx}`} style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>

      <div className={styles.demoCardLike}>
        <div className={styles.demoPanelTitle}>Статус подписок</div>
        <div className={styles.demoMuted}>В моменте по всем чатам</div>

        <div className={styles.demoSubstatusBar} aria-hidden="true">
          <span className={`${styles.demoSubstatusSeg} ${styles.demoSubstatusSegActive}`} style={{ width: activeWidth }} />
          <span className={`${styles.demoSubstatusSeg} ${styles.demoSubstatusSegGrace}`} style={{ width: graceWidth }} />
          <span className={`${styles.demoSubstatusSeg} ${styles.demoSubstatusSegExpired}`} style={{ width: expiredWidth }} />
        </div>

        <div className={styles.demoSubstatusList}>
          {DEMO_DATA.status.subscriptions.map((item) => (
            <DemoSubstatusRow key={item.label} tone={item.tone} label={item.label} hint={item.hint} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoSubstatusRow({
  tone,
  label,
  hint,
  value
}: {
  tone: "active" | "grace" | "expired";
  label: string;
  hint: string;
  value: string;
}) {
  return (
    <div className={styles.demoSubstatusRow}>
      <div className={styles.demoSubstatusLeft}>
        <span className={`${styles.demoSubstatusDot} ${tone === "active" ? styles.demoSubstatusDotActive : tone === "grace" ? styles.demoSubstatusDotGrace : styles.demoSubstatusDotExpired}`} />
        <div>
          <div className={styles.demoSubstatusLabel}>{label}</div>
          <div className={styles.demoMuted}>{hint}</div>
        </div>
      </div>
      <div className={styles.demoSubstatusValue}>{value}</div>
    </div>
  );
}

function DemoChatsTab() {
  return (
    <div className={styles.demoPanel}>
      <div className={styles.demoCardLike}>
        <div className={styles.demoPanelHeadRow}>
          <div>
            <div className={styles.demoPanelTitle}>Чаты</div>
            <div className={styles.demoMuted}>{DEMO_DATA.chats.totalLabel}</div>
          </div>
          <span className={`${styles.demoStatus} ${styles.demoStatusWarn}`}>Требует внимания: {DEMO_DATA.chats.needsAttention}</span>
        </div>

        <div className={styles.demoFilterRow}>
          <span className={`${styles.demoChip} ${styles.demoChipActive}`}>Подписчики</span>
          <span className={styles.demoChip}>Тарифы</span>
          <span className={styles.demoChip}>Исключения</span>
        </div>

        <div className={styles.demoList}>
          {DEMO_DATA.chats.rows.map((row) => (
            <DemoChatRow
              key={row.title}
              title={row.title}
              adminOk={row.adminOk}
              rules={row.rules}
              subscribers={row.subscribers}
              tariffs={row.tariffs}
              turnover={row.turnover}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoStorefrontTab() {
  return (
    <div className={styles.demoPanel}>
      <div className={styles.demoCardLike}>
        <div className={styles.demoPanelHeadRow}>
          <div>
            <div className={styles.demoPanelTitle}>Витрина владельца канала</div>
            <div className={styles.demoMuted}>Публичная страница для Robokassa</div>
          </div>
          <span className={`${styles.demoStatus} ${styles.demoStatusOk}`}>{DEMO_DATA.storefront.status}</span>
        </div>

        <div className={styles.demoStorefrontLinks}>
          <div className={styles.demoStorefrontLinkRow}>
            <span className={styles.demoMuted}>Черновик URL</span>
            <span className={styles.demoUrl}>{DEMO_DATA.storefront.draftUrl}</span>
          </div>
          <div className={styles.demoStorefrontLinkRow}>
            <span className={styles.demoMuted}>Публичный URL</span>
            <span className={styles.demoUrl}>{DEMO_DATA.storefront.publicUrl}</span>
          </div>
        </div>

        <div className={styles.demoActionCard}>
          <div className={styles.demoMuted}>Текущий оффер на публикации</div>
          <div className={styles.demoOfferTitle}>{DEMO_DATA.storefront.offerTitle}</div>
          <div className={styles.demoMuted}>{DEMO_DATA.storefront.offerPrice}</div>
        </div>
      </div>
    </div>
  );
}

function DemoProviderTab() {
  return (
    <div className={styles.demoPanel}>
      <div className={styles.demoCardLike}>
        <div className={styles.demoPanelHeadRow}>
          <div>
            <div className={styles.demoPanelTitle}>Robokassa</div>
            <div className={styles.demoMuted}>{DEMO_DATA.provider.summary}</div>
          </div>
          <span className={`${styles.demoStatus} ${styles.demoStatusOk}`}>{DEMO_DATA.provider.status}</span>
        </div>

        <DemoListRow
          name={DEMO_DATA.provider.webhookLabel}
          status="скопирован"
          ok
          note={DEMO_DATA.provider.webhookValue}
        />
      </div>

      <div className={styles.demoCardLike}>
        <div className={styles.demoPanelTitle}>Данные магазина</div>
        <div className={styles.demoMuted}>Касса подключена. Секреты скрыты.</div>
        <div className={styles.demoFilterRow}>
          <span className={`${styles.demoChip} ${styles.demoChipActive}`}>MerchantLogin: {DEMO_DATA.provider.merchantLogin}</span>
          <span className={styles.demoChip}>Pass1 сохранён</span>
          <span className={styles.demoChip}>Pass2 сохранён</span>
        </div>
      </div>
    </div>
  );
}

function DemoLogsTab() {
  return (
    <div className={styles.demoPanel}>
      <div className={styles.demoCardLike}>
        <div className={styles.demoPanelHeadRow}>
          <div>
            <div className={styles.demoPanelTitle}>Журнал действий</div>
            <div className={styles.demoMuted}>{DEMO_DATA.logs.total} событий</div>
          </div>
          <span className={styles.demoChip}>{DEMO_DATA.logs.rangeLabel}</span>
        </div>

        <div className={styles.demoList}>
          {DEMO_DATA.logs.rows.map((row, index) => (
            <DemoListRow key={`${row.status}-${index}`} name={row.name} status={row.status} ok note={row.note} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.demoMetric}>
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function DemoListRow({ name, status, ok = false, note }: { name: string; status: string; ok?: boolean; note?: string }) {
  return (
    <div className={styles.demoListRow}>
      <div className={styles.demoListRowMain}>
        <span className="text-sm text-slate-700">{name}</span>
        {note ? <span className={styles.demoMuted}>{note}</span> : null}
      </div>
      <span className={`${styles.demoStatus} ${ok ? styles.demoStatusOk : ""}`}>{status}</span>
    </div>
  );
}

function DemoChatRow({
  title,
  adminOk,
  rules,
  subscribers,
  tariffs,
  turnover
}: {
  title: string;
  adminOk: boolean;
  rules: string;
  subscribers: string;
  tariffs: string;
  turnover: string;
}) {
  return (
    <div className={styles.demoChatRow}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-slate-800">{title}</span>
        <span className={`${styles.demoStatus} ${adminOk ? styles.demoStatusOk : styles.demoStatusWarn}`}>
          бот админ {adminOk ? "ok" : "внимание"}
        </span>
      </div>
      <div className="mt-1 text-xs text-slate-500">{rules}</div>
      <div className={styles.demoChatKpis}>
        <span>{tariffs}</span>
        <span>{subscribers} в доступе</span>
        <span>{turnover}</span>
      </div>
    </div>
  );
}
