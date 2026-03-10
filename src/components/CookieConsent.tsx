"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const CONSENT_STORAGE_KEY = "dopusk_cookie_consent";

type ConsentState = "dismissed" | null;

function getStoredConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "dismissed" ? value : null;
}

function loadYandexMetrika(counterId: number) {
  if (typeof window === "undefined") return;
  if (document.getElementById("yandex-metrika-script")) return;

  window.dataLayer = window.dataLayer || [];

  (function initMetrika(m: Window & typeof globalThis, e: Document, t: string, r: string, i: string) {
    const globalScope = m as unknown as Record<string, unknown>;
    globalScope[i] =
      globalScope[i] ||
      function (...args: unknown[]) {
        const ym = globalScope[i] as { a?: unknown[]; l?: number };
        ym.a = ym.a || [];
        ym.a.push(args);
      };

    const currentYm = globalScope[i] as { l?: number };
    currentYm.l = Number(new Date());

    for (let j = 0; j < document.scripts.length; j += 1) {
      if (document.scripts[j]?.src === r) return;
    }

    const script = e.createElement(t) as HTMLScriptElement;
    script.async = true;
    script.src = r;
    script.id = "yandex-metrika-script";
    const firstScript = e.getElementsByTagName(t)[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  })(window, document, "script", `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`, "ym");

  window.ym?.(counterId, "init", {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: window.location.href,
    accurateTrackBounce: true,
    trackLinks: true
  });
}

export function CookieConsent({ metrikaId }: { metrikaId: number }) {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [resolved, setResolved] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadYandexMetrika(metrikaId);
  }, [metrikaId]);

  useEffect(() => {
    const saved = getStoredConsent();
    setConsent(saved);
    setResolved(true);
  }, []);

  useEffect(() => {
    if (!resolved || consent) return;
    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [resolved, consent]);

  if (!resolved || consent) return null;

  return (
    <div
      className={`cookie-consent${isVisible ? " cookie-consent--visible" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Уведомление об использовании cookie"
    >
      <div className="cookie-consent__icon" aria-hidden="true">
        <svg viewBox="0 0 40 40" className="cookie-consent__icon-svg">
          <circle cx="20" cy="20" r="18" fill="#f4dcc1" />
          <circle cx="14" cy="14" r="2.3" fill="#8b5e3c" />
          <circle cx="24.5" cy="12.5" r="2.1" fill="#8b5e3c" />
          <circle cx="27" cy="21" r="2.5" fill="#8b5e3c" />
          <circle cx="17" cy="24" r="2.2" fill="#8b5e3c" />
          <circle cx="12.5" cy="28" r="1.9" fill="#8b5e3c" />
          <path d="M27 5.5a7 7 0 0 1 7 7 8.5 8.5 0 0 0-8.5 8.5A8.5 8.5 0 0 1 17 29.5 7.5 7.5 0 0 0 9.5 37 18 18 0 1 1 27 5.5Z" fill="#f0cfac" opacity="0.65" />
        </svg>
      </div>
      <div className="cookie-consent__copy">
        <p className="cookie-consent__text">
          Мы используем cookie и Яндекс.Метрику. Продолжая пользоваться сайтом, вы соглашаетесь на обработку
          cookie-файлов.
        </p>
        <p className="cookie-consent__more">
          Подробнее — в{" "}
          <a href="/privacy/" className="cookie-consent__link">
            политике конфиденциальности
          </a>
          .
        </p>
      </div>
      <div className="cookie-consent__actions">
        <button
          type="button"
          className="cookie-consent__button cookie-consent__button--primary"
          onClick={() => {
            setIsVisible(false);
            window.setTimeout(() => {
              window.localStorage.setItem(CONSENT_STORAGE_KEY, "dismissed");
              setConsent("dismissed");
            }, 240);
          }}
        >
          Принять
        </button>
      </div>
    </div>
  );
}
