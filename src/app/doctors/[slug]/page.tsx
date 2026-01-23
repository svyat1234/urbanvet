import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import DoctorHero from '@/blocks/DoctorHero';
import OtherDoctors from '@/blocks/OtherDoctors';
import CardsSection from '@/blocks/CardsSection';
import BlogsCompact from '@/blocks/BlogsCompact';
import Card from '@/components/Card';
import { DOCTORS, DOCTOR_PAGES, SERVICES } from '@/lib/constants';
import { notFound } from 'next/navigation';

interface DoctorPageProps {
  params: Promise<{ slug: string }>;
}

// BACKEND: для статического экспорта Next.js требует предгенерировать все возможные slug'и.
// Потом, когда будет API, можно будет генерировать страницы динамически или использовать ISR.
export async function generateStaticParams() {
  return DOCTORS.map((doctor) => ({
    slug: doctor.slug || String(doctor.id),
  }));
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { slug } = await params;

  // BACKEND:
  // Сейчас врач ищется в моках `constants.ts`.
  // Потом заменить на запрос к API, например:
  // const doctor = await fetch(`/api/doctors/${slug}`).then(r => r.json());
  //
  // Важно: для плавной миграции поддерживаем 2 варианта:
  // - `slug` (основной)
  // - `id` как fallback (если slug пустой / ещё не заведён на бэке)
  const doctor = DOCTORS.find((d) => (d.slug && d.slug === slug) || String(d.id) === slug);

  if (!doctor) notFound();

  // BACKEND:
  // Сейчас контент страницы врача берём из мок-структуры `DOCTOR_PAGES`.
  // Имя/фото/специализация остаются в `DOCTORS`, чтобы не дублировать профиль.
  const doctorKey = doctor.slug || String(doctor.id);
  const pageData = DOCTOR_PAGES.pages[doctorKey];

  // UI: если нет контента в моках — показываем базовый fallback, чтобы страница не ломалась.
  const heroContent =
    pageData?.hero
      ? { description: pageData.hero.description, cta: DOCTOR_PAGES.hero.cta }
      : {
          description: ['Описание появится позже.', 'Описание появится позже.'],
          cta: DOCTOR_PAGES.hero.cta,
        };

  // BACKEND: временная логика для моков — сопоставляем услуги врача по тегам И по title.
  // Потом бэкенд отдаст готовый список услуг врача, и фильтрация не нужна будет.
  const doctorServices = SERVICES.filter(service =>
    service.tags.some(tag => doctor.services.includes(tag)) ||
    doctor.services.some(serviceName => 
      service.title.toLowerCase().includes(serviceName.toLowerCase()) ||
      serviceName.toLowerCase().includes(service.title.toLowerCase())
    )
  );

  return (
    <>
      <Header />
      <DoctorHero doctor={doctor} content={heroContent} />
      <OtherDoctors currentDoctorKey={doctorKey} heading={DOCTOR_PAGES.otherDoctors.heading} />
      {doctorServices.length > 0 && (
        <CardsSection
          data={{
            heading: DOCTOR_PAGES.services.heading,
            items: doctorServices,
          }}
          renderItem={(item) => <Card data={item} />}
        />
      )}
      {/* BACKEND: Секция блога (актуальное). 
          Пока без данных, в будущем данные будут приходить из DOCTOR_PAGES или отдельного API. */}
      <BlogsCompact />
      <Footer />
    </>
  );
}

