'use client';

import styles from './DoctorHero.module.css';
import Container from '@/components/Container';
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

                {/* Навигация (универсальная).
                    UI: кнопка "назад" работает от history (откуда пришли).
                    Fallback: если страница открыта в новом табе — можно передать `?from=/...&fromLabel=...`
                    BACKEND: для канонических "крошек" лучше отдавать массив ссылок с CMS/API и передавать в `PageNav items=[...]`. */}
                <PageNav
                  className={styles.nav}
                  // UI: если страница врача открыта напрямую (без history/from),
                  // показываем дефолтную крошку "Врачи".
                  // BACKEND: позже заменить на реальные крошки из CMS/API через `items`.
                  defaultItems={[{ label: 'Врачи', href: '/doctors' }]}
                />

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
            <a href={content.cta.href} className={`${styles.link} flex items-center gap-[4px] h-[2.625rem]`}>
                <span className={`text-[0.875rem] text-white font-medium bg-[#1D1D1D] flex items-center justify-center px-[1.875rem] h-full rounded-[100px]`}>
                  {content.cta.label}
                </span>
                <svg height="100%" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 0C32.598 0 42 9.40202 42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21C0 9.40202 9.40202 0 21 0ZM13.7754 13.2051C12.9025 13.2051 12.1944 13.9123 12.1943 14.7852C12.1943 15.6581 12.9025 16.3662 13.7754 16.3662L24.1836 16.3652L13.668 26.8818C13.0507 27.4991 13.0507 28.5 13.668 29.1172C14.2852 29.7343 15.2851 29.7343 15.9023 29.1172L26.4189 18.6006V29.0098C26.4189 29.8827 27.1271 30.5908 28 30.5908C28.8728 30.5907 29.5801 29.8826 29.5801 29.0098V14.7852C29.5801 13.9124 28.8727 13.2053 28 13.2051H13.7754Z" fill="#1D1D1D"/>
                </svg>

            </a>
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