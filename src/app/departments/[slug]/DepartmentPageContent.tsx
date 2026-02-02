'use client';

/**
 * BACKEND:
 * Клиентская обёртка контента страницы отделения создана из-за ограничения Next.js:
 * - При "output: export" динамический маршрут [slug] обязан экспортировать generateStaticParams()
 *   (только из серверного компонента).
 * - CardsSection — клиентский компонент и принимает renderItem (функцию); функции нельзя
 *   передавать из серверного компонента в клиентский.
 * Поэтому page.tsx остаётся серверным (generateStaticParams + загрузка данных), а разметка
 * с CardsSection и renderItem вынесена в этот клиентский компонент.
 */

import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import DepartmentHero from '@/blocks/DepartmentHero';
import DepartmentAbout from '@/blocks/DepartmentAbout';
import CardsSection from '@/blocks/CardsSection';
import Card from '@/components/Card';
import Doctors from '@/blocks/Doctors';
import NewsSection from '@/blocks/NewsSection';
import type { DepartmentPageData } from '@/lib/constants';

interface DepartmentPageContentProps {
  slug: string;
  departmentPage: DepartmentPageData;
}

export default function DepartmentPageContent({ slug, departmentPage }: DepartmentPageContentProps) {
  const fromLabel = departmentPage.breadcrumbTitle ?? departmentPage.hero.heading.title;

  return (
    <>
      <Header />
      <DepartmentHero data={departmentPage.hero} />
      <DepartmentAbout data={departmentPage.about} />
      <CardsSection
        data={
          departmentPage.services ?? {
            heading: { title: '', subtitle: '' },
            items: [],
          }
        }
        renderItem={(item) => (
          <Card
            data={item}
            href={`/services/${item.id}?from=/departments/${slug}&fromLabel=${encodeURIComponent(fromLabel)}`}
          />
        )}
      />
      <Doctors
        data={departmentPage.doctors}
        linkFrom={{ href: `/departments/${slug}`, label: fromLabel }}
        itemsPerPage={3}
        scrollToTopOnPageChange={false}
        headingLevel={2}
      />
      <NewsSection />
      <Footer />
    </>
  );
}
