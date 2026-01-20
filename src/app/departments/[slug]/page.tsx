import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import DepartmentHero from '@/blocks/DepartmentHero';
import DepartmentAbout from '@/blocks/DepartmentAbout';
import { DEPARTMENTS } from '@/lib/constants';
import { notFound } from 'next/navigation';
import CardsSection from '@/blocks/CardsSection';
import Card from '@/components/Card';
import Doctors from '@/blocks/Doctors';
import NewsSection from '@/blocks/NewsSection';

interface DepartmentPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = await params;
  // BACKEND: сейчас данные страницы берём из `constants.ts` (DEPARTMENTS).
  // Позже заменить на fetch (например, /api/departments/:slug) и собирать блоки из ответа.
  const departmentPage = DEPARTMENTS[slug];
  if (!departmentPage) notFound();

  return (
    <>
      <Header />
      <DepartmentHero data={departmentPage.hero} />
      {departmentPage.about && <DepartmentAbout data={departmentPage.about} />}
      {departmentPage.services && (
        // BACKEND: `departmentPage.services` — это "данные секции карточек".
        // `renderItem` — выбор конкретного UI под item (услуга/документ/акция).
        <CardsSection data={departmentPage.services} renderItem={(item) => <Card data={item} />} />
      )}
      {departmentPage.doctors && (
        // BACKEND: секция врачей отделения — список должен приходить с сервера (по slug).
        <Doctors
          data={departmentPage.doctors}
          // UI: формируем контекст "откуда пришли", чтобы на странице врача показывать ссылку на отделение.
          // BACKEND: если крошки будут приходить с CMS/API — можно будет отдавать их прямо на странице врача.
          linkFrom={{
            href: `/departments/${slug}`,
            label: departmentPage.breadcrumbTitle || departmentPage.hero.heading.title,
          }}
          itemsPerPage={3}
          scrollToTopOnPageChange={false}
          headingLevel={2}
        />
      )}
      {/* BACKEND: новости для отделения.
          Сейчас блок на мок-данных из `constants.ts`.
          Потом либо:
          - получать новости для отделения из API вместе со страницей отделения, либо
          - отдельно фетчить по slug/departmentId и передавать в блок пропом. */}
      <NewsSection />
      <Footer />
    </>
  );
}


