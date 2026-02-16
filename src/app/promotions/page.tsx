'use client';

import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import CardsSection from '@/blocks/CardsSection';
import Card from '@/components/Card';
import { PROMOTIONS, PROMOTION_PAGES } from '@/lib/constants';

export default function PromotionsPage() {
  return (
    <>
      <Header />
      <main>
        <CardsSection
        data={{
          heading: PROMOTION_PAGES.promotions.heading,
          items: PROMOTIONS,
        }}
        renderItem={(item) => <Card data={item as any} href={`/promotions/${item.id}?from=/promotions&fromLabel=Акции`} />}
      />
      </main>
      <Footer />
    </>
  );
}