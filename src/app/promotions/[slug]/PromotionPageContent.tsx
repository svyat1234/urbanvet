'use client';

import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import PromotionHero from '@/blocks/PromotionHero';
import CardsSection from '@/blocks/CardsSection';
import BlogsCompact from '@/blocks/BlogsCompact';
import Card from '@/components/Card';
import type { PromotionItem } from '@/lib/constants';

interface PromotionHeroContent {
  description: string[];
  cta: { href: string; label: string };
}

interface PromotionPageContentProps {
  promotion: PromotionItem;
  slug: string;
  heroContent: PromotionHeroContent;
  otherPromotions: PromotionItem[];
  promotionsHeading: { title: string; subtitle: string };
  blogsHeading: { title: string; subtitle: string };
}

export default function PromotionPageContent({
  promotion,
  slug,
  heroContent,
  otherPromotions,
  promotionsHeading,
  blogsHeading,
}: PromotionPageContentProps) {
  return (
    <>
      <Header />
      <PromotionHero
        promotion={promotion}
        content={heroContent}
        breadcrumbs={[
          { label: 'Акции', href: '/promotions' },
          { label: promotion.title, href: '#' },
        ]}
      />
      <CardsSection
        data={{ heading: promotionsHeading, items: otherPromotions }}
        renderItem={(item) => (
          <Card
            data={item as any}
            href={`/promotions/${item.id}?from=/promotions/${slug}&fromLabel=${promotion.title}`}
          />
        )}
      />
      <BlogsCompact customTitle={blogsHeading.title} customSubtitle={blogsHeading.subtitle} />
      <Footer />
    </>
  );
}
