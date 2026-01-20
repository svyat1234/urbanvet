 'use client';

import styles from './NewsCard.module.css';
import { useState } from 'react';
import Image from 'next/image';
import type { NewsItem } from '@/lib/constants';
import { formatRuDateLong } from '@/lib/dateUtils';
import { truncateText } from '@/lib/textUtils';
import { getNextColor } from '@/lib/colorUtils';

interface NewsCardProps {
  // BACKEND: сюда должен приходить объект новости (обычно из API).
  // Для маленькой карточки нужно минимум: { title, publishedAt, image } + (опционально) { slug } для ссылки.
  data: NewsItem;
}

export default function NewsCard({ data }: NewsCardProps) {
  // BACKEND: `publishedAt` ожидаем в формате date-only `YYYY-MM-DD` (или ISO),
  // но для UI карточек используем стабильный формат без сдвигов таймзоны.
  const publishedLabel = formatRuDateLong(data.publishedAt);
  const titleLabel = truncateText(data.title, 45);
  const [bgColor, setBgColor] = useState<string>('');

  const handleActivate = () => {
    setBgColor(getNextColor());
  };

  const handleDeactivate = () => {
    setBgColor('');
  };

  return (
    // BACKEND: ссылка на страницу новости. Когда появится роут `/news/[slug]` — будет вести туда.
    <a
      href={`/news/${data.slug}`}
      className={`${styles.card} flex justify-between bg-white transition-colors duration-300 h-110 flex-col gap-7.5`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
      onMouseEnter={handleActivate}
      onMouseLeave={handleDeactivate}
      onFocus={handleActivate}
      onBlur={handleDeactivate}
    >
      <span className={`relative block w-full overflow-hidden h-60`}>
        {/* BACKEND: при переходе на URL картинки (string) — настроить next/image remotePatterns. */}
        <Image src={data.image} alt={data.title} className={`object-cover`} fill />
      </span>

      <span className={`flex flex-col flex-1 justify-between px-7.5 gap-7.5 pb-7.5`}>
        <h3 className={`font-[Circe] font-bold leading-[100%] text-[2.5rem] min-h-[62px]`}>{titleLabel}</h3>

        <span className={`flex items-center justify-between`}>
          <span className={`text-[0.875rem] font-normal bg-[#1D1D1D] text-white py-[16px] px-[30px] rounded-[100px] leading-[70%]`}>
            {publishedLabel}
          </span>
          <div className={`${styles.arrow} max-w-[38px] max-h-[38px] w-[38px] h-[38px]`}>
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.5 0C41.1355 0 53 11.8645 53 26.5C53 41.1355 41.1355 53 26.5 53C11.8645 53 0 41.1355 0 26.5C0 11.8645 11.8645 0 26.5 0ZM19.5996 17.4004C18.7161 17.4006 18 18.1165 18 19C18 19.8835 18.7161 20.5994 19.5996 20.5996H30.1367L16.8682 33.8682C16.2433 34.493 16.2433 35.507 16.8682 36.1318C17.493 36.7567 18.507 36.7567 19.1318 36.1318L32.4004 22.8633V33.4004C32.4006 34.2839 33.1165 35 34 35C34.8835 35 35.5994 34.2839 35.5996 33.4004V19C35.5996 18.1163 34.8837 17.4004 34 17.4004H19.5996Z" fill="#1D1D1D"/>
            </svg>
          </div>

        </span>
      </span>
    </a>
  );
}