'use client';

import { useState } from 'react';
import styles from './PricesCard.module.css';
import CtaButton from '@/components/CtaButton';
import type { PriceItem } from '@/lib/constants';

function formatPrice(value: number): string {
  return `${value.toLocaleString('ru-RU')}₽`;
}

interface PricesCardProps {
  item: PriceItem;
  linkText: string;
}

export default function PricesCard({ item, linkText }: PricesCardProps) {
  const [expanded, setExpanded] = useState(false);
  const href = item.href ?? '#';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setExpanded((v) => !v)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setExpanded((v) => !v)}
      className={`flex justify-between gap-[200px] bg-white p-[1.875rem] cursor-pointer relative ${expanded ? 'min-h-[88px]' : 'h-[88px] overflow-hidden'}`}
    >
      {/* Заголовок */}
      <h2 className="text-[2rem] font-bold font-[Circe] leading-[105%]">{item.title}</h2>

      <div
        className={`flex justify-between max-w-[768px] w-full ${expanded ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}`}
      >
        {/* Описание, ссылка */}
        <div className="flex flex-col gap-[3.4375rem]">
            <p className="text-[0.9375rem] max-w-[383px] opacity-50">{item.description}</p>

            <CtaButton
              href={href}
              label={linkText}
              className={styles.link}
              onClick={(e) => e.stopPropagation()}
            />
        </div>

        {/* Цена */}
        <div className="flex gap-[15px]">
            <span className="text-[1.25rem] text-[#E8E8E8] font-bold font-[Circe] line-through leading-[100%] mt-[4px]">
            {formatPrice(item.oldPrice)}
            </span>
            <span className="text-[2.5rem] font-bold font-[Circe] leading-[100%]">{formatPrice(item.newPrice)}</span>
        </div>
      </div>


      {/* Стрелка справа — показывается только при закрытой карточке */}
      {!expanded && (
        <div className="w-[19px] h-[18px] absolute right-[1.875rem] top-[1.875rem]">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6128 0.423523C17.4855 0.423705 18.1927 1.13068 18.1927 2.00346L18.1934 16.2278C18.1934 17.1004 17.486 17.8086 16.6135 17.8091C15.7406 17.8091 15.0321 17.1007 15.0321 16.2278V5.81866L4.51531 16.3355C3.89811 16.9526 2.89794 16.9526 2.28074 16.3355C1.6635 15.7183 1.66351 14.7168 2.28074 14.0995L12.7969 3.58341L2.38846 3.5841C1.51556 3.5841 0.807142 2.87567 0.807139 2.00277C0.807483 1.13017 1.51578 0.422835 2.38846 0.422832L16.6128 0.423523Z" fill="#1D1D1D"/>
          </svg>
        </div>
      )}

    </div>
  );
}

