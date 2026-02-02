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
    <section className={`${styles.hero} py-[3.125rem] bg-[#F9F9F9]`}>
      <Container className={`flex items-center justify-between gap-2.5 h-[713px] bg-white`}>

        {/* Левая часть с текстом */}
        <div className="flex flex-col h-full justify-between p-[4.375rem]">
          <div className={`flex flex-col gap-[2.5rem]`}>
            {/* Навигация (универсальная).
                UI: кнопка "назад" работает от history (откуда пришли).
                Fallback: если страница открыта в новом табе — можно передать `?from=/...&fromLabel=...`
                BACKEND: для канонических "крошек" лучше отдавать массив ссылок с CMS/API и передавать в `PageNav items=[...]`. */}
            <Suspense fallback={<div className="h-[2.375rem]" />}>
              <PageNav
                className={styles.nav}
                // UI: показываем breadcrumbs "Статьи / Название статьи" для блогов
                items={breadcrumbs}
                defaultItems={[{ label: 'Статьи', href: '/blogs' }]}
              />
            </Suspense>

            {/* Заголовок */}
            <h1 className={`text-[3.75rem] font-[Circe] font-normal max-w-[49.125rem] leading-[120%] uppercase`}>
              {blogPost.title}
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