'use client';

import { useState } from 'react';
import styles from './PricesCard.module.css';
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

            <a
              href={href}
              onClick={(e) => e.stopPropagation()}
              className={`${styles.link} flex items-center gap-1 h-[2.625rem]`}
            >
            <span className="text-[0.875rem] text-white font-medium bg-[#1D1D1D] flex items-center justify-center px-7.5 h-full rounded-[100px]">
                {linkText}
            </span>
            <svg height="100%" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                d="M21 0C32.598 0 42 9.40202 42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21C0 9.40202 9.40202 0 21 0ZM13.7754 13.2051C12.9025 13.2051 12.1944 13.9123 12.1943 14.7852C12.1943 15.6581 12.9025 16.3662 13.7754 16.3662L24.1836 16.3652L13.668 26.8818C13.0507 27.4991 13.0507 28.5 13.668 29.1172C14.2852 29.7343 15.2851 29.7343 15.9023 29.1172L26.4189 18.6006V29.0098C26.4189 29.8827 27.1271 30.5908 28 30.5908C28.8728 30.5907 29.5801 29.8826 29.5801 29.0098V14.7852C29.5801 13.9124 28.8727 13.2053 28 13.2051H13.7754Z"
                fill="#1D1D1D"
                />
            </svg>
            </a>
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

