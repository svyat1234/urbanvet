import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import AboutHero from '@/blocks/AboutHero';
import AboutStat from '@/blocks/AboutStat';
import AboutInfo from '@/blocks/AboutInfo';
import AboutHistory from '@/blocks/AboutHistory';
import Gallery from '@/blocks/Gallery';
import Vacancies from '@/blocks/Vacancies';
import CardsSection from '@/blocks/CardsSection';
import Card from '@/components/Card';
import { ABOUT_PAGE, DOCUMENTS } from '@/lib/constants';

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutHero />
      <AboutStat />
      <AboutInfo />
      <AboutHistory />
      <Gallery />
      <Vacancies />
      <CardsSection
        data={{
          heading: ABOUT_PAGE.documents.heading,
          items: DOCUMENTS,
        }}
        renderItem={(item) => (
          <Card
            data={item as any}
            href={`/documents/${item.slug}?from=/about&fromLabel=О компании`}
          />
        )}
      />
      <Footer />
    </>
  );
}