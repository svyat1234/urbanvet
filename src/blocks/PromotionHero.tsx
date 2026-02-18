'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './Promotion.module.css';
import Container from '@/components/Container';
import CtaButton from '@/components/CtaButton';
import Image from 'next/image';
import { BASE_PATH } from '@/lib/basePath';
import PageNav from '@/components/PageNav';
import type { PromotionItem, PromotionHeroContent } from '@/lib/constants';
import serviceImage1 from '@/assets/images/services-1.png';

interface PromotionHeroProps {
  // BACKEND: данные акции (профиль) — в будущем будут приходить с API.
  promotion: PromotionItem;
  // BACKEND: контент hero-блока страницы акции (тексты/CTA) — тоже из API/CMS.
  content: PromotionHeroContent;
  // Навигационные breadcrumbs для страницы
  breadcrumbs?: Array<{ label: string; href: string }>;
}

export default function PromotionHero({ promotion, content, breadcrumbs }: PromotionHeroProps) {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const fromLabel = searchParams.get('fromLabel');
  return (
    <section className={`${styles.hero} py-[3.125rem] bg-[#F9F9F9] mb-[6.25rem]
    max-md:mb-10
    `}>
      <Container className={`flex items-center justify-between gap-2.5 h-[713px] bg-white
        max-lg:h-auto max-lg:flex-col max-lg:items-start
        `}>

        {/* Изображение */}
        <div className={`w-[49.875rem] self-stretch relative
          max-lg:h-[400px] max-lg:w-full
          `}>
          {/* BACKEND: изображение акции должно приходить в профиле акции (promotion.image) */}
          <Image
            src={promotion.image ?? serviceImage1}
            alt={promotion.title}
            fill
            className="w-full h-full object-cover"
          />
        </div>

        {/* Правая часть с текстом */}
        <div className="flex flex-col h-full justify-between p-[4.375rem]
        max-2xl:p-[3rem]
        max-lg:p-[2rem] max-lg:h-auto
        max-sm:px-[1rem] max-sm:pb-[3.125rem]
        ">
          <div className={`flex flex-col gap-[2.5rem]
            max-xl:gap-[2rem]
            `}>
            {/* Навигация (универсальная).
                UI: кнопка "назад" работает от history (откуда пришли).
                Fallback: если страница открыта в новом табе — можно передать `?from=/...&fromLabel=...`
                BACKEND: для канонических "крошек" лучше отдавать массив ссылок с CMS/API и передавать в `PageNav items=[...]`. */}
            <Suspense fallback={<div className="h-[2.375rem]" />}>
              <PageNav
                className={styles.nav}
                // UI: показываем breadcrumbs "Акции / Название акции" для акций
                items={breadcrumbs}
                defaultItems={[
                  ...(from && fromLabel ? [{ label: fromLabel, href: from }] : []),
                  { label: 'Акции', href: `${BASE_PATH}/promotions` }
                ]}
              />
            </Suspense>

            {/* Заголовок */}
            <h1 className={`text-[3.75rem] font-[Circe] font-normal max-w-[49.125rem] leading-[120%] uppercase
              max-2xl:text-[3.5rem]
              max-xl:text-[3rem]
              max-lg:text-[2rem]
              `}>
              {promotion.title}
            </h1>

            {/* Текста */}
            <div className={`flex items-start gap-[3.75rem]
              max-xl:flex-col max-xl:gap-4
              `}>
              {content.description.map((text,idx) => (
                <p key={idx} className={`max-w-[23.75rem] w-full opacity-50 leading-[120%]`}>{text}</p>
              ))}
            </div>

            {/* Дата и условие акции */}
            <div className={`flex gap-[20px]`}>
                <div className={`flex gap-[4.4px] flex-wrap`}>
                  <div className="flex gap-1 h-[60px]">
                    <div className={`min-w-[60px] h-[60px] bg-[#ACD9CF] rounded-[15.27px] ${styles.dateIcon}`}></div>
                    <div className={`px-[1.875rem] max-sm:px-[1rem] h-full bg-[#F9F9F9] rounded-[15.27px] flex items-center gap-1`}>
                        <span className={`${styles.info}`}>{promotion.startsAt}</span>
                        <span className={`${styles.info}`}> - </span>
                        <span className={`${styles.info}`}>{promotion.expiresAt}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 h-[60px]">
                    <div className={`min-w-[60px] h-[60px] rounded-[15.27px] ${styles.conditionsIcon}`}></div>
                    <div className={`px-[1.875rem] max-sm:px-[1rem] h-full bg-[#F9F9F9] rounded-[15.27px] flex items-center`}>
                        <span className={`${styles.info}`}>{promotion.conditions?.join(', ')}</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Нижняя ссылка */}
          <CtaButton href={content.cta.href} label={content.cta.label} className={`${styles.link} max-lg:mt-10`} />
        </div>

      </Container>
    </section>
  );
}