import type { Metadata } from "next";
import "./globals.css";
import { config } from "@/config";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: "PayGate — монетизация закрытых Telegram‑каналов",
    template: "%s — PayGate"
  },
  description:
    "PayGate помогает монетизировать закрытые Telegram‑каналы и чаты: подписчики платят через вашу Robokassa, а PayGate управляет доступом.",
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
      "Оплата подписчиков идёт напрямую в вашу Robokassa. PayGate выдаёт доступ и исключает пользователей с просроченной подпиской.",
    siteName: "PayGate"
  },
  twitter: {
    card: "summary_large_image",
    title: "PayGate — монетизация закрытых Telegram‑каналов",
    description:
      "Оплата подписчиков идёт напрямую в вашу Robokassa. PayGate выдаёт доступ и исключает пользователей с просроченной подпиской."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="font-sans">
        <div className="min-h-dvh flex flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
