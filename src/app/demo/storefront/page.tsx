import type { Metadata } from "next";
import { DemoStorefrontClient } from "./DemoStorefrontClient";

export const metadata: Metadata = {
  title: "Пример витрины",
  description: "Демо-витрина владельца канала в PayGate: без оплаты и без персональных данных.",
  robots: { index: false, follow: false }
};

export default function DemoStorefrontPage() {
  return <DemoStorefrontClient />;
}
