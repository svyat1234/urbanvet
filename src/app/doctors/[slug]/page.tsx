import DoctorPageContent from './DoctorPageContent';
import { DOCTORS, DOCTOR_PAGES, SERVICES } from '@/lib/constants';
import { notFound } from 'next/navigation';

interface DoctorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DOCTORS.map((doctor) => ({
    slug: doctor.slug || String(doctor.id),
  }));
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { slug } = await params;

  const doctor = DOCTORS.find((d) => (d.slug && d.slug === slug) || String(d.id) === slug);
  if (!doctor) notFound();

  const doctorKey = doctor.slug || String(doctor.id);
  const pageData = DOCTOR_PAGES.pages[doctorKey];

  const heroContent =
    pageData?.hero
      ? { description: pageData.hero.description, cta: DOCTOR_PAGES.hero.cta }
      : {
          description: ['Описание появится позже.', 'Описание появится позже.'],
          cta: DOCTOR_PAGES.hero.cta,
        };

  const doctorServices = SERVICES.filter(
    (service) =>
      service.tags.some((tag) => doctor.services.includes(tag)) ||
      doctor.services.some(
        (serviceName) =>
          service.title.toLowerCase().includes(serviceName.toLowerCase()) ||
          serviceName.toLowerCase().includes(service.title.toLowerCase())
      )
  );

  return (
    <DoctorPageContent
      doctor={doctor}
      doctorKey={doctorKey}
      heroContent={heroContent}
      services={doctorServices}
      otherDoctorsHeading={DOCTOR_PAGES.otherDoctors.heading}
      servicesHeading={DOCTOR_PAGES.services.heading}
    />
  );
}

