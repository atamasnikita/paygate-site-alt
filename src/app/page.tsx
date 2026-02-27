import type { Metadata } from "next";
import { config } from "@/config";
import { LandingV3Client } from "./v3/LandingV3Client";

const title = "PayGate — сервис для организации платной подписки в Telegram";
const description =
  "PayGate автоматизирует платный доступ в Telegram: оплата, выдача доступа, статусы подписок и исключения по правилам. Управление — в удобном мини-приложении, а платежи поступают напрямую в подключенный провайдер.";
const pageUrl = `${config.siteUrl}/`;
const ogImage = `${config.siteUrl}/og-v3.png`;
const landingPages = [
  { name: "Главная", path: "/" },
  { name: "Контакты", path: "/contacts/" },
  { name: "Оферта", path: "/oferta/" },
  { name: "Политика конфиденциальности", path: "/privacy/" },
  { name: "Правила возвратов", path: "/refunds/" }
] as const;

const landingStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${config.siteUrl}/#website`,
      url: pageUrl,
      name: "PayGate",
      inLanguage: "ru-RU",
      description
    },
    {
      "@type": "SiteNavigationElement",
      name: landingPages.map((page) => page.name),
      url: landingPages.map((page) => `${config.siteUrl}${page.path}`)
    }
  ]
};

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "монетизация Telegram канала",
    "платный доступ в Telegram",
    "пейвол для Telegram",
    "бот для платной подписки Telegram",
    "мини-приложение Telegram для владельца канала",
    "PayGate"
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title,
    description,
    url: pageUrl,
    siteName: "PayGate",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "PayGate" }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage]
  }
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(landingStructuredData) }} />
      <LandingV3Client />
    </>
  );
}
