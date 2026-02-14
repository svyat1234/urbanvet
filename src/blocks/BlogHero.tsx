'use client';

import { Suspense } from 'react';
import styles from './BlogHero.module.css';
import Container from '@/components/Container';
import CtaButton from '@/components/CtaButton';
import Image from 'next/image';
import PageNav from '@/components/PageNav';
import type { BlogPost, BlogHeroContent } from '@/lib/constants';

interface BlogHeroProps {
  // BACKEND: данные блога (профиль) — в будущем будут приходить с API.
  blogPost: BlogPost;
  // BACKEND: контент hero-блока страницы блога (тексты/CTA) — тоже из API/CMS.
  content: BlogHeroContent;
  // Навигационные breadcrumbs для страницы
  breadcrumbs?: Array<{ label: string; href: string }>;
}

export default function BlogHero({ blogPost, content, breadcrumbs }: BlogHeroProps) {
  return (
    // -------------------------------------------------------------------------------------
    // Секция похожа с DoctorHero но у разные них моб. версии, поэтому это разные компоненты
    // -------------------------------------------------------------------------------------
    
    <section className={`${styles.hero} py-[3.125rem] bg-[#F9F9F9]`}>
      <Container className={`flex items-center justify-between gap-2.5 h-[713px] bg-white
        max-2xl:h-[680px]
        max-xl:h-auto
        max-md:flex-col
        `}>

        {/* Контент */}
        <div className="flex flex-col h-full max-w-[823px] w-full justify-between p-[4.375rem] relative
        max-2xl:p-[3rem]
        max-md:order-2 max-md:p-[1.5rem]
        ">
          <div className={`flex flex-col gap-[2.5rem]
            max-lg:gap-8
            `}>
            {/* Навигация (универсальная).
                UI: кнопка "назад" работает от history (откуда пришли).
                Fallback: если страница открыта в новом табе — можно передать `?from=/...&fromLabel=...`
                BACKEND: для канонических "крошек" лучше отдавать массив ссылок с CMS/API и передавать в `PageNav items=[...]`. */}
            <Suspense fallback={<div className="h-[2.375rem]" />}>
              <PageNav
                className={styles.nav}
                // UI: breadcrumbs "Статьи / ФИО автора (врача)"
                items={breadcrumbs}
                defaultItems={[{ label: 'Статьи', href: '/blogs' }]}
              />
            </Suspense>

            {/* Заголовок */}
            <h1 className={`text-[3.75rem] font-[Circe] font-normal max-w-[49.125rem] leading-[120%] uppercase
              max-2xl:text-[3rem]
              max-lg:text-[2rem] max-lg:leading-[100
              `}>
              {blogPost.title}
            </h1>

            {/* Текста */}
            <div className={`flex items-start gap-[3.75rem]
              max-2xl:gap-[2rem]
              max-xl:flex-col max-xl:gap-[1rem]
              `}>
              {content.description.map((text, idx) => (
                <p key={idx} className="max-w-[23.75rem] w-full opacity-50 leading-[120%] z-10
                max-md:max-w-full
                ">{text}</p>
              ))}
            </div>
          </div>

          {/* Нижняя ссылка */}
          <CtaButton href={content.cta.href} label={content.cta.label} className={`${styles.link} max-xl:mt-10 z-10`} />

          {/* Иконка */}
          <div className={`${styles.heroIcon}`}></div>
        </div>

        {/* Изображение */}
        <div className={`${styles.imageWrap} max-w-[49.875rem] w-full self-stretch relative
        max-md:self-auto max-md:w-full max-md:h-[400px]
        `}>
          {/* BACKEND: изображение блога должно приходить в профиле блога (blogPost.image) */}
          <Image
            src={blogPost.image}
            alt={blogPost.title}
            fill
            className="w-full h-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}