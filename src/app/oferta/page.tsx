import type { Metadata } from "next";
import { config } from "@/config";
import { LegalDocPage } from "@/components/LegalDocPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Публичная оферта",
  description: "Публичная оферта «Допуска» о заключении договора оказания услуг (доступ к SaaS‑сервису).",
  alternates: {
    canonical: `${config.siteUrl}/oferta/`
  }
};

export default function OfertaPage() {
  return <LegalDocPage doc="oferta" />;
}
