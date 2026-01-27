import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import PromotionHero from '@/blocks/PromotionHero';
import CardsSection from '@/blocks/CardsSection';
import BlogsCompact from '@/blocks/BlogsCompact';
import Card from '@/components/Card';
import { PROMOTIONS, PROMOTION_PAGES } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface PromotionPageProps {
  params: Promise<{ slug: string }>;
}

// BACKEND: для статического экспорта Next.js требует предгенерировать все возможные slug'и.
export async function generateStaticParams() {
  return PROMOTIONS.map((promotion) => ({
    slug: promotion.id,
  }));
}

export default async function PromotionPage({ params }: PromotionPageProps) {
  const { slug } = await params;

  // BACKEND:
  // Сейчас акция ищется в моках `constants.ts`.
  // Потом заменить на запрос к API, например:
  // const promotion = await fetch(`/api/promotions/${slug}`).then(r => r.json());
  const promotion = PROMOTIONS.find((p) => p.id === slug);

  if (!promotion) notFound();

  // BACKEND:
  // Сейчас контент страницы акции берём из мок-структуры `PROMOTION_PAGES`.
  // Заголовок/изображение/теги остаются в `PROMOTIONS`, чтобы не дублировать профиль.
  const pageData = PROMOTION_PAGES.pages[slug];

  // UI: если нет контента в моках — показываем базовый fallback, чтобы страница не ломалась.
  const heroContent =
    pageData?.hero
      ? { description: pageData.hero.description, cta: PROMOTION_PAGES.hero.cta }
      : {
          description: ['Описание акции появится позже.', 'Описание акции появится позже.'],
          cta: PROMOTION_PAGES.hero.cta,
        };

  // Фильтруем акции, исключая текущую
  const otherPromotions = PROMOTIONS.filter((p) => p.id !== slug);

  return (
    <>
      <Header />
      <Suspense fallback={<div className="h-[713px]" />}>
        <PromotionHero
          promotion={promotion}
          content={heroContent}
          // Передаем breadcrumbs для навигации: Акции / Название акции
          breadcrumbs={[
            { label: 'Акции', href: '/promotions' },
            { label: promotion.title, href: '#' }
          ]}
        />
      </Suspense>

      {/* Другие акции (исключая текущую) */}
      <CardsSection
        data={{
          heading: PROMOTION_PAGES.promotions.heading,
          items: otherPromotions,
        }}
        renderItem={(item) => <Card data={item as any} href={`/promotions/${item.id}?from=/promotions/${slug}&fromLabel=${promotion.title}`} />}
      />

      {/* Блог - Актуальное */}
      <BlogsCompact
        customTitle={PROMOTION_PAGES.blogs.heading.title}
        customSubtitle={PROMOTION_PAGES.blogs.heading.subtitle}
      />

      <Footer />
    </>
  );
}