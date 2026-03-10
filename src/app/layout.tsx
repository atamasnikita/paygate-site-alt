import type { Metadata, Viewport } from "next";
import "./globals.css";
import { config } from "@/config";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CookieConsent } from "@/components/CookieConsent";

const YANDEX_METRIKA_ID = 107087152;

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: "Допуск — монетизация закрытых Telegram‑каналов",
    template: "%s — Допуск"
  },
  description:
    "Допуск автоматизирует платный доступ в Telegram: оплата, выдача доступа, статусы подписок и исключения по правилам. Управление — в удобном мини-приложении.",
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
    title: "Допуск — монетизация закрытых Telegram‑каналов",
    description:
      "Оплата подписчиков идёт напрямую в подключенный платежный провайдер. Допуск выдаёт доступ, показывает статусы подписок и автоматизирует исключение по правилам.",
    siteName: "Допуск"
  },
  twitter: {
    card: "summary_large_image",
    title: "Допуск — монетизация закрытых Telegram‑каналов",
    description:
      "Оплата подписчиков идёт напрямую в подключенный платежный провайдер. Допуск выдаёт доступ, показывает статусы подписок и автоматизирует исключение по правилам."
  }
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head />
      <body className="font-sans">
        <div className="min-h-dvh flex flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <CookieConsent metrikaId={YANDEX_METRIKA_ID} />
      </body>
    </html>
  );
}
