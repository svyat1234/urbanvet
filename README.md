This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on GitHub Pages

Проект настроен для автоматического деплоя на GitHub Pages.

### Автоматический деплой (рекомендуется)

1. Перейди в настройки репозитория на GitHub: `Settings` → `Pages`
2. В разделе `Source` выбери `GitHub Actions`
3. При каждом push в ветку `main` сайт автоматически соберётся и задеплоится
4. Ссылка на сайт будет: `https://<username>.github.io/urbanvet` (или без `/urbanvet` если репозиторий в корне)

### Ручной деплой

Если нужно задеплоить вручную:

```bash
npm run export
```

Затем закоммить папку `out/` и запушить в ветку `gh-pages`.

### Настройка basePath

Если репозиторий находится в подпапке (не `username.github.io`), нужно раскомментировать в `next.config.ts`:

```typescript
basePath: '/urbanvet',
assetPrefix: '/urbanvet',
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
