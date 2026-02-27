import type { Metadata } from "next";
import { config } from "@/config";
import { LandingV3Client } from "./LandingV3Client";

const title = "PayGate v3 — монетизация Telegram, которая выглядит как зрелый SaaS";
const description =
  "PayGate автоматизирует платный доступ в Telegram: оплата, выдача доступа, статусы подписок и исключения по правилам. Управление — в удобном мини-приложении.";
const pageUrl = `${config.siteUrl}/v3`;
const ogImage = `${config.siteUrl}/og-v3.png`;

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
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title,
    description,
    url: pageUrl,
    siteName: "PayGate",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "PayGate v3" }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage]
  }
};

export default function LandingV3Page() {
  return <LandingV3Client />;
}
