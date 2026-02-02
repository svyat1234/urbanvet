'use client';

import { Suspense } from 'react';
import styles from './DoctorHero.module.css';
import Container from '@/components/Container';
import CtaButton from '@/components/CtaButton';
import Image from 'next/image';
import PageNav from '@/components/PageNav';
import type { Doctor, DoctorHeroContent } from '@/lib/constants';

interface DoctorHeroProps {
  // BACKEND: данные врача (профиль) — в будущем будут приходить с API.
  doctor: Doctor;
  // BACKEND: контент hero-блока страницы врача (тексты/CTA) — тоже из API/CMS.
  content: DoctorHeroContent;
}

export default function DoctorHero({ doctor, content }: DoctorHeroProps) {
  return (
    <section className={`${styles.hero} py-[3.125rem]  bg-[#F9F9F9]`}>
      <Container className={`flex items-center justify-between gap-2.5 h-[713px] bg-white`}>

        {/* Левая часть с текстом */}

        <div className="flex flex-col h-full justify-between p-[4.375rem]">

            <div className={`flex flex-col gap-[2.5rem]`}>

                {/* Навигация: как на страницах акций и статей — в крошке всегда "Врачи" и ссылка на /doctors.
                    Кнопка "назад" по-прежнему ведёт туда, откуда пришли (history или ?from=). */}
                <Suspense fallback={<div className="h-[2.375rem]" />}>
                  <PageNav
                    className={styles.nav}
                    items={[{ label: 'Врачи', href: '/doctors' }]}
                  />
                </Suspense>

                {/* Заголовок */}
                <h1 className={`text-[3.75rem] font-[Circe] font-normal max-w-[49.125rem] leading-[120%] uppercase`}>
                  {doctor.name}
                </h1>

                {/* Текста */}
                <div className={`flex items-start gap-[3.75rem]`}>
                    <p className={`max-w-[23.75rem] w-full opacity-50 leading-[120%]`}>{content.description[0]}</p>
                    <p className={`max-w-[23.75rem] w-full opacity-50 leading-[120%]`}>{content.description[1]}</p>
                </div>
            </div>

            {/* Нижняя ссылка */}
            <CtaButton href={content.cta.href} label={content.cta.label} className={styles.link} />
        </div>

        {/* Изображение */}
        <div className={`w-[49.875rem] h-full relative`}>
            {/* BACKEND: фото врача должно приходить в профиле врача (doctor.photo) */}
            <Image
              src={doctor.photo}
              alt={doctor.name}
              fill
              className="w-full h-full object-cover"
            />
        </div>
      </Container>
    </section>
  );
}