import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { config } from "@/config";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const YANDEX_METRIKA_ID = 106914675;

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: "PayGate — монетизация закрытых Telegram‑каналов",
    template: "%s — PayGate"
  },
  description:
    "PayGate помогает монетизировать закрытые Telegram‑каналы и чаты: подписчики платят через ваш платежный провайдер (Robokassa / YooKassa), а PayGate управляет доступом.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: config.siteUrl,
    title: "PayGate — монетизация закрытых Telegram‑каналов",
    description:
      "Оплата подписчиков идёт напрямую в ваш платежный провайдер (Robokassa / YooKassa). PayGate выдаёт доступ и исключает пользователей с просроченной подпиской.",
    siteName: "PayGate"
  },
  twitter: {
    card: "summary_large_image",
    title: "PayGate — монетизация закрытых Telegram‑каналов",
    description:
      "Оплата подписчиков идёт напрямую в ваш платежный провайдер (Robokassa / YooKassa). PayGate выдаёт доступ и исключает пользователей с просроченной подпиской."
  }
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <Script id="yandex-metrika" strategy="beforeInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');
            window.dataLayer = window.dataLayer || [];

            ym(${YANDEX_METRIKA_ID}, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: 'dataLayer',
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
      </head>
      <body className="font-sans">
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <div className="min-h-dvh flex flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
