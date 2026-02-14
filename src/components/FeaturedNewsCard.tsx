'use client';

import { useState } from 'react';
import styles from '@/components/FeaturedNewsCard.module.css'
import Image from 'next/image';
import Link from 'next/link';
import type { NewsItem } from '@/lib/constants';
import { formatRuDateLong } from '@/lib/dateUtils';
import { getNextColor } from '@/lib/colorUtils';

interface FeaturedNewsCardProps {
  // BACKEND: сюда должен приходить объект новости (обычно из API).
  // Минимально для featured-карточки: { title, excerpt, publishedAt, tag, image } + (опционально) { slug } для ссылки на страницу новости.
  data: NewsItem;
}

export default function FeaturedNewsCard({ data }: FeaturedNewsCardProps) {
  // BACKEND: лучше отдавать `publishedAt` как date-only `YYYY-MM-DD` (или ISO datetime),
  // а UI форматирование делать на фронте.
  const publishedLabel = formatRuDateLong(data.publishedAt);
  const [bgColor, setBgColor] = useState<string>('');

  const handleActivate = () => {
    setBgColor(getNextColor());
  };

  const handleDeactivate = () => {
    setBgColor('');
  };

  return (
    // BACKEND: ссылка на страницу новости. Link нужен для basePath (GitHub Pages: /urbanvet/).
    <Link
      href={`/news/${data.slug}`}
      className={`flex justify-between h-[507px] bg-white transition-colors duration-300
        max-lg:h-[450px]
        max-md:flex-col max-md:h-auto
        `}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
      onMouseEnter={handleActivate}
      onMouseLeave={handleDeactivate}
      onFocus={handleActivate}
      onBlur={handleDeactivate}
    >
      {/* Контент */}
      <span className={`flex flex-col flex-1 justify-between px-7.5 gap-4 py-17.5
        max-lg:py-10 max-lg:px-5
        max-md:order-2
        max-sm:px-3
        `}>
        <span className={`flex flex-col gap-13
          max-xl:gap-10
          max-lg:gap-8
          max-md:gap-5
          `}>
          <h3 className={`font-[Circe] font-normal leading-[100%] text-[3.75rem] uppercase
            max-xl:text-[3.3rem]
            max-lg:text-[2.8rem]
            max-sm:text-[2rem]
            `}>{data.title}</h3>
          <div className="flex flex-col gap-5">
            <p className={`text-[0.9375rem] leading-[140%] max-w-208`}>{data.excerpt}</p>
          </div>
        </span>

        <span className={`flex items-center gap-3 relative flex-wrap
          max-md:mt-8
          max-sm:pr-10
          `}>
          <span className={`text-[0.875rem] font-normal bg-[#1D1D1D] text-white h-[42px] flex items-center px-[30px] rounded-[100px] leading-[70%]
            max-sm:px-[20px] max-sm:text-[1rem] max-sm:h-[30px]
            `}>
            {publishedLabel}
          </span>
          <span className={`text-[0.875rem] font-normal border border-[#1D1D1D] h-[42px] flex items-center px-[30px] rounded-[100px] leading-[70%]
            max-sm:px-[20px] max-sm:text-[1rem] max-sm:h-[30px]
            `}>
            {data.tag}
          </span>

          <div className={`${styles.arrow} max-w-[38px] max-h-[38px] w-[38px] h-[38px]`}>
            <svg width="38" height="38" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.5 0C41.1355 0 53 11.8645 53 26.5C53 41.1355 41.1355 53 26.5 53C11.8645 53 0 41.1355 0 26.5C0 11.8645 11.8645 0 26.5 0ZM19.5996 17.4004C18.7161 17.4006 18 18.1165 18 19C18 19.8835 18.7161 20.5994 19.5996 20.5996H30.1367L16.8682 33.8682C16.2433 34.493 16.2433 35.507 16.8682 36.1318C17.493 36.7567 18.507 36.7567 19.1318 36.1318L32.4004 22.8633V33.4004C32.4006 34.2839 33.1165 35 34 35C34.8835 35 35.5994 34.2839 35.5996 33.4004V19C35.5996 18.1163 34.8837 17.4004 34 17.4004H19.5996Z" fill="#1D1D1D"/>
            </svg>
          </div>
        </span>
      </span>

      {/* Изображение */}
      <span className={`relative block w-1/2 overflow-hidden flex-1
        max-md:w-full max-md:min-h-50
        `}>
        {/* BACKEND: картинка может приходить как URL строка. Тогда `next/image` будет работать через `remotePatterns` в next.config.
            Сейчас используем статический импорт (StaticImageData) как мок. */}
        <Image src={data.image} alt={data.title} className={`object-cover`} fill />
      </span>
    </Link>
  );
}


