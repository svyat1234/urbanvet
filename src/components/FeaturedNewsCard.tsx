'use client';

import { useState } from 'react';
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
      className={`flex justify-between h-[507px] bg-white transition-colors duration-300`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
      onMouseEnter={handleActivate}
      onMouseLeave={handleDeactivate}
      onFocus={handleActivate}
      onBlur={handleDeactivate}
    >
      <span className={`flex flex-col flex-1 justify-between px-7.5 gap-4 py-17.5`}>
        <span className={`flex flex-col gap-13`}>
          <h3 className={`font-[Circe] font-normal leading-[100%] text-[3.75rem] uppercase`}>{data.title}</h3>
          <p className={`text-[0.9375rem] leading-[140%] max-w-208`}>{data.excerpt}</p>
        </span>

        <span className={`flex items-center gap-3`}>
          <span className={`text-[0.875rem] font-normal bg-[#1D1D1D] text-white py-[16px] px-[30px] rounded-[100px] leading-[70%]`}>
            {publishedLabel}
          </span>
          <span className={`text-[0.875rem] font-normal border border-[#1D1D1D] py-[16px] px-[30px] rounded-[100px] leading-[70%]`}>
            {data.tag}
          </span>
        </span>
      </span>

      <span className={`relative block w-1/2 overflow-hidden flex-1`}>
        {/* BACKEND: картинка может приходить как URL строка. Тогда `next/image` будет работать через `remotePatterns` в next.config.
            Сейчас используем статический импорт (StaticImageData) как мок. */}
        <Image src={data.image} alt={data.title} className={`object-cover`} fill />
      </span>
    </Link>
  );
}


