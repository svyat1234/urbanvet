'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import PricesCard from '@/components/PricesCard';
import styles from '@/blocks/Prices.module.css'
import { PRICES, PRICES_SECTION } from '@/lib/constants';

export default function Prices() {
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  return (
    <section className="py-12.5 bg-[#F9F9F9]">
      <Container>
      <div className={`flex justify-between items-end`}>

        {/* Фильтры */}
        <div className={`flex gap-5 relative`}>
        <button
              className={`sort-menu sort-btn`}
              onClick={() => setIsSortModalOpen((prev) => !prev)}
            >
              Сортировка
            </button>

            {/* Окно с типом сортировки */}
            {isSortModalOpen && (
              <div className={`${styles.sortModal} absolute max-w-[246px] w-full bg-white rounded-[35px] p-[20px] z-50 flex flex-col gap-[10px]`}>
                <button type="button" className={`${styles.modalSortBtn}`}>По дате</button>
                <button type="button" className={`${styles.modalSortBtn}`}>По имени</button>
                <button type="button" className={`${styles.modalSortBtn}`}>Старые</button>
              </div>
            )}

            <div className={`flex gap-1`}>
                <button className={`sort-btn`}>Раздел</button>
                <button className={`sort-btn`}>Автор</button>
                <button className={`sort-btn`}>Ещё...</button>
            </div>

                <input type="text" className={`sort-search`} placeholder='Введите запрос' />
            </div>

            <div className="flex justify-start max-w-[788px] w-full">
                <Heading
                    level={2}
                    title={PRICES_SECTION.heading.title}
                    subtitle={PRICES_SECTION.heading.subtitle}
                />
            </div>
        </div>
        <div className="grid grid-cols-1 gap-[10px] mt-[5.125rem]">
          {PRICES.map((item) => (
            <PricesCard
              key={item.id}
              item={item}
              linkText={PRICES_SECTION.linkText}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
