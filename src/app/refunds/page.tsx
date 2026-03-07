import type { Metadata } from "next";
import { config } from "@/config";
import { LegalDocPage } from "@/components/LegalDocPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Политика возвратов",
  description: "Политика возвратов «Допуска» по подписке «Безлимитный».",
  alternates: {
    canonical: `${config.siteUrl}/refunds/`
  }
};

export default function RefundsPage() {
  return <LegalDocPage doc="refunds" />;
}
