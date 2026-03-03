# Допуск — Landing

Публичный сайт проекта Допуск (лендинг + страницы оферты/ПДн/возвратов).

## Локальный запуск

```bash
npm install
npm run dev
```

## Деплой на Cloudflare Pages

Проект собирается через `next-on-pages`.

- Root directory: `/`
- Build command: `npm run pages:build`
- Build output directory: `.vercel/output/static`

## Переменные окружения (Cloudflare Pages)

Все переменные публичные, без секретов:

- `NEXT_PUBLIC_SITE_URL` (например `https://mydopusk.ru`)
- `NEXT_PUBLIC_BOT_URL` (например `https://t.me/your_bot_username`)
- `NEXT_PUBLIC_PANEL_URL` (опционально, ссылка на панель мерчанта)
- `NEXT_PUBLIC_SUPPORT_EMAIL`
- `NEXT_PUBLIC_SUPPORT_TG` (ссылка вида `https://t.me/...`)
- `NEXT_PUBLIC_OWNER_NAME` / `NEXT_PUBLIC_OWNER_INN` / `NEXT_PUBLIC_OWNER_STATUS` (для страницы Контакты)

## Юридические тексты

Markdown лежит в `content/legal/` и рендерится на страницах:

- `/oferta`
- `/privacy`
- `/refunds`
