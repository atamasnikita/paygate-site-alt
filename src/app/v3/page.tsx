import type { Metadata } from "next";
import { config } from "@/config";
import { LandingV3Client } from "./LandingV3Client";

const title = "PayGate v3 — монетизация Telegram, которая выглядит как зрелый SaaS";
const description =
  "Платный доступ в Telegram без отдельного сайта: витрина, оферта и возвраты на paygt.ru. Деньги идут напрямую в Robokassa владельца канала.";
const pageUrl = `${config.siteUrl}/v3`;
const ogImage = `${config.siteUrl}/og-v3.png`;

export const metadata: Metadata = {
  title,
  description,
  keywords: ["монетизация Telegram канала", "платный доступ в Telegram", "пейвол для Telegram", "PayGate", "Robokassa"],
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
