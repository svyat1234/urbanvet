'use client';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { createContext, type ReactNode } from 'react';
import type { CardsSectionData } from '@/lib/constants';

/** Если "light" — фон секции белый, карточки #F9F9F9. По умолчанию — секция #F9F9F9, карточки белые. */
export const CardsSectionThemeContext = createContext<'light' | null>(null);

interface CardsSectionProps<TItem> {
  data: CardsSectionData<TItem>;
  renderItem: (item: TItem, idx: number) => ReactNode;
  description?: string;
  theme?: 'light';
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export default function CardsSection<TItem>({
  data,
  renderItem,
  description,
  theme,
  headingLevel = 2,
}: CardsSectionProps<TItem>) {
  const sectionBg = theme === 'light' ? 'bg-white' : 'bg-[#F9F9F9]';
  return (
    <CardsSectionThemeContext.Provider value={theme ?? null}>
    <section className={`py-[3.125rem] ${sectionBg}`}>
      <Container className={`flex flex-col gap-[1.25rem]`}>

        <div className={`grid grid-cols-3 gap-[1.25rem]
          max-lg:grid-cols-2
          max-sm:grid-cols-1
          `}>
         <div className='flex flex-col'>
          <Heading level={headingLevel} title={data.heading.title} subtitle={data.heading.subtitle} />
          {description != null && description !== '' && (
            <p className='text-[0.975rem] mt-[3.125rem] max-w-[369px]'>{description}</p>
          )}
         </div>
          {data.items.map((item, idx) => (
            // BACKEND: ключ лучше брать из стабильного id, который придёт из API.
            // Сейчас это generic и может не иметь `id`, поэтому используем idx.
            <div key={idx}>{renderItem(item, idx)}</div>
          ))}
        </div>
      </Container>
    </section>
    </CardsSectionThemeContext.Provider>
  );
}


