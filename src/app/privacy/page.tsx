import type { Metadata } from "next";
import { LegalDocPage } from "@/components/LegalDocPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description: "Политика обработки персональных данных Допуск."
};

export default function PrivacyPage() {
  return <LegalDocPage doc="privacy" />;
}

