import PromotionPageContent from './PromotionPageContent';
import { PROMOTIONS, PROMOTION_PAGES } from '@/lib/constants';
import { notFound } from 'next/navigation';

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

  const pageData = PROMOTION_PAGES.pages[slug];
  const heroContent =
    pageData?.hero
      ? { description: pageData.hero.description, cta: PROMOTION_PAGES.hero.cta }
      : {
          description: ['Описание акции появится позже.', 'Описание акции появится позже.'],
          cta: PROMOTION_PAGES.hero.cta,
        };

  const otherPromotions = PROMOTIONS.filter((p) => p.id !== slug);

  return (
    <PromotionPageContent
      promotion={promotion}
      slug={slug}
      heroContent={heroContent}
      otherPromotions={otherPromotions}
      promotionsHeading={PROMOTION_PAGES.promotions.heading}
      blogsHeading={PROMOTION_PAGES.blogs.heading}
    />
  );
}