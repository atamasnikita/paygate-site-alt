"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const CONSENT_STORAGE_KEY = "dopusk_cookie_consent";

type ConsentState = "accepted" | "rejected" | null;

function getStoredConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
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

  useEffect(() => {
    const saved = getStoredConsent();
    setConsent(saved);
    setResolved(true);
  }, []);

  useEffect(() => {
    if (consent === "accepted") {
      loadYandexMetrika(metrikaId);
    }
  }, [consent, metrikaId]);

  if (!resolved || consent) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label="Уведомление об аналитических cookie">
      <div className="cookie-consent__copy">
        <div className="cookie-consent__title">Мы используем cookie для аналитики</div>
        <p className="cookie-consent__text">
          На сайте используется Яндекс.Метрика. Она помогает понять, как работает лендинг, и улучшать его. Подробнее
          — в{" "}
          <a href="/privacy/" className="cookie-consent__link">
            политике конфиденциальности
          </a>
          .
        </p>
      </div>
      <div className="cookie-consent__actions">
        <button
          type="button"
          className="cookie-consent__button cookie-consent__button--ghost"
          onClick={() => {
            window.localStorage.setItem(CONSENT_STORAGE_KEY, "rejected");
            setConsent("rejected");
          }}
        >
          Только необходимые
        </button>
        <button
          type="button"
          className="cookie-consent__button cookie-consent__button--primary"
          onClick={() => {
            window.localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
            setConsent("accepted");
          }}
        >
          Принять
        </button>
      </div>
    </div>
  );
}
