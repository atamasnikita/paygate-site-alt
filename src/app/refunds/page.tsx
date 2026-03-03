import type { Metadata } from "next";
import { LegalDocPage } from "@/components/LegalDocPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Политика возвратов",
  description: "Политика возвратов «Допуска» по Подписке Pro."
};

export default function RefundsPage() {
  return <LegalDocPage doc="refunds" />;
}
