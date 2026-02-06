'use client';

import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import Hero from '@/blocks/Hero';
import Stats from '@/blocks/Stats';
import About from '@/blocks/About';
import CardsSection from '@/blocks/CardsSection';
import Card from '@/components/Card';
import Doctors from '@/blocks/Doctors';
import BlogsCompact from '@/blocks/BlogsCompact';
import AboutHistory from '@/blocks/AboutHistory';
import Gallery from '@/blocks/Gallery';
import NewsSection from '@/blocks/NewsSection';
import Contacts from '@/blocks/Contacts';
import { PROMOTIONS, PROMOTION_PAGES, DOCTORS_PAGE_DATA } from '@/lib/constants';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <CardsSection
          data={{
            heading: PROMOTION_PAGES.promotions.heading,
            items: PROMOTIONS,
          }}
          renderItem={(item) => <Card data={item as any} href={`/promotions/${item.id}?from=/&fromLabel=Главная`} />}
        />
        <Doctors
          data={DOCTORS_PAGE_DATA}
          linkFrom={{ href: '/', label: 'Главная' }}
          itemsPerPage={3}
          scrollToTopOnPageChange={true}
          headingLevel={2}
        />
        <BlogsCompact />
        <AboutHistory />
        <Gallery />
        <NewsSection />
        <Contacts/>
      </main>
      <Footer />
    </>
  );
}
