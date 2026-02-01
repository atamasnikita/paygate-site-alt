function env(name: string): string | undefined {
  const value = process.env[name];
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

const isProd = process.env.NODE_ENV === "production";

const botUsername = env("BOT_USERNAME")?.replace(/^@/u, "");
const botUrlFromUsername = botUsername ? `https://t.me/${botUsername}` : undefined;

function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  const withScheme = /^https?:\/\//iu.test(trimmed) ? trimmed : `https://${trimmed}`;
  return withScheme.replace(/\/+$/u, "");
}

function normalizeTelegram(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//iu.test(trimmed)) return trimmed;
  const handle = trimmed.replace(/^@/u, "");
  return `https://t.me/${handle}`;
}

export const config = {
  siteUrl: normalizeUrl(env("NEXT_PUBLIC_SITE_URL") ?? "https://paygt.ru"),
  botUrl: normalizeTelegram(env("NEXT_PUBLIC_BOT_URL") ?? botUrlFromUsername ?? "https://t.me/PayGateAccessBot"),
  panelUrl: env("NEXT_PUBLIC_PANEL_URL") ? normalizeUrl(env("NEXT_PUBLIC_PANEL_URL")!) : undefined,
  supportEmail: env("NEXT_PUBLIC_SUPPORT_EMAIL") ?? (isProd ? "support@paygt.ru" : "support@example.com"),
  supportTg: normalizeTelegram(
    env("NEXT_PUBLIC_SUPPORT_TG") ?? (isProd ? "https://t.me/paygt_support" : "https://t.me/your_support")
  ),
  ownerName: env("NEXT_PUBLIC_OWNER_NAME") ?? (isProd ? "" : "Заполните позже"),
  ownerInn: env("NEXT_PUBLIC_OWNER_INN") ?? (isProd ? "" : "Заполните позже"),
  ownerStatus: env("NEXT_PUBLIC_OWNER_STATUS") ?? (isProd ? "Оформляется" : "Самозанятый (НПД)")
} as const;
