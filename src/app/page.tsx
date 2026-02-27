import type { Metadata } from "next";
import { config } from "@/config";
import { LandingV3Client } from "./v3/LandingV3Client";

const title = "PayGate — сервис для организации платной подписки в Telegram";
const description =
  "Монетизация Telegram без отдельного сайта: витрина, оферта и возвраты на paygt.ru. Деньги идут напрямую в платежный провайдер владельца канала (Robokassa / YooKassa).";
const pageUrl = `${config.siteUrl}/`;
const ogImage = `${config.siteUrl}/og-v3.png`;
const landingSections = [
  { name: "Как это работает", path: "#how-it-works" },
  { name: "Mini App", path: "#miniapp-demo" },
  { name: "Витрина", path: "#storefront-demo" },
  { name: "Возможности", path: "#features" },
  { name: "Тарифы", path: "#pricing" },
  { name: "Вопросы", path: "#faq" }
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
      name: landingSections.map((section) => section.name),
      url: landingSections.map((section) => `${config.siteUrl}/${section.path}`)
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
    "PayGate",
    "Robokassa",
    "YooKassa"
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
