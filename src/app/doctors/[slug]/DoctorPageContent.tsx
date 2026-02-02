'use client';

import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import DoctorHero from '@/blocks/DoctorHero';
import OtherDoctors from '@/blocks/OtherDoctors';
import CardsSection from '@/blocks/CardsSection';
import BlogsCompact from '@/blocks/BlogsCompact';
import Card from '@/components/Card';
import type { Doctor, ServiceItem } from '@/lib/constants';

interface DoctorHeroContent {
  description: string[];
  cta: { href: string; label: string };
}

interface DoctorPageContentProps {
  doctor: Doctor;
  doctorKey: string;
  heroContent: DoctorHeroContent;
  services: ServiceItem[];
  otherDoctorsHeading: { title: string; subtitle: string };
  servicesHeading: { title: string; subtitle: string };
}

export default function DoctorPageContent({
  doctor,
  doctorKey,
  heroContent,
  services,
  otherDoctorsHeading,
  servicesHeading,
}: DoctorPageContentProps) {
  return (
    <>
      <Header />
      <DoctorHero doctor={doctor} content={heroContent} />
      <OtherDoctors currentDoctorKey={doctorKey} heading={otherDoctorsHeading} />
      {services.length > 0 && (
        <CardsSection
          data={{ heading: servicesHeading, items: services }}
          renderItem={(item) => <Card data={item} />}
        />
      )}
      <BlogsCompact />
      <Footer />
    </>
  );
}
