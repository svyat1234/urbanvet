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
      <Container className={`flex items-center justify-between gap-2.5 h-[713px] bg-white
        max-2xl:h-[680px]
        max-xl:h-auto
        max-md:flex-col max-md:pt-[3rem] max-md:items-start
        `}>

        {/* Контент */}

        <div className="flex flex-col h-full justify-between max-w-[823px] w-full p-[4.375rem] relative
        max-2xl:p-[3rem]
        max-md:order-2
        max-md:pt-[1rem] max-md:p-[1.5rem]
        ">

            <div className={`flex flex-col gap-[2.5rem]
              max-lg:gap-8
              `}>

                {/* Навигация: как на страницах акций и статей — в крошке всегда "Врачи" и ссылка на /doctors.
                    Кнопка "назад" по-прежнему ведёт туда, откуда пришли (history или ?from=). */}
                <Suspense fallback={<div className="h-[2.375rem]" />}>
                  <PageNav
                    className={styles.nav}
                    items={[{ label: 'Врачи', href: '/doctors' }]}
                  />
                </Suspense>

                {/* Заголовок */}
                <h1 className={`text-[3.75rem] font-[Circe] font-normal max-w-[49.125rem] leading-[120%] uppercase
                  max-2xl:text-[3rem]
                  max-lg:text-[2rem] max-lg:leading-[100%]
                  `}>
                  {doctor.name}
                </h1>

                {/* Текста */}
                <div className={`flex items-start gap-[3.75rem]
                  max-2xl:gap-[2rem]
                  max-xl:flex-col max-xl:gap-[1rem]
                  `}>
                  {content.description.map((text, idx) => (
                    <p
                      key={idx}
                      className="max-w-[23.75rem] w-full opacity-50 leading-[120%] max-xl:max-w-full z-10"
                    >
                      {text}
                    </p>
                  ))}
                </div>
            </div>

            {/* Нижняя ссылка */}
            <CtaButton href={content.cta.href} label={content.cta.label} className={`${styles.link} mt-10 z-10`} />

            {/* Иконка */}
            <div className={`${styles.heroIcon}`}></div>
        </div>

        {/* Изображение */}
        <div className={`${styles.imageWrap} max-w-[49.875rem] w-full self-stretch relative overflow-hidden
        max-md:w-[50%] max-md:max-w-none max-md:aspect-square max-md:self-auto max-md:ml-[1.5rem]
        `}>
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