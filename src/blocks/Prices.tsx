'use client';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import PricesCard from '@/components/PricesCard';
import { PRICES, PRICES_SECTION } from '@/lib/constants';

export default function Prices() {
  return (
    <section className="py-12.5 bg-[#F9F9F9]">
      <Container>
      <div className={`flex justify-between items-end`}>

        {/* Фильтры */}
        <div className={`flex gap-5`}>
            <button className={`sort-menu sort-btn`}>
                Сортировка
            </button>

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
