import type { Metadata } from "next";
import { config } from "@/config";
import { LegalDocPage } from "@/components/LegalDocPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description: "Политика обработки персональных данных Допуск.",
  alternates: {
    canonical: `${config.siteUrl}/privacy/`
  }
};

export default function PrivacyPage() {
  return <LegalDocPage doc="privacy" />;
}
