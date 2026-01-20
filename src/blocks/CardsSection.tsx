import Container from '@/components/Container';
import Heading from '@/components/Heading';
import type { ReactNode } from 'react';
import type { CardsSectionData } from '@/lib/constants';

interface CardsSectionProps<TItem> {
  /**
   * Универсальные данные для секции.
   * BACKEND: в будущем прилетит из API (или будет собираться на сервере в `page.tsx`).
   */
  data: CardsSectionData<TItem>;
  /**
   * Рендер конкретной карточки.
   * Зачем так: `CardsSection` не знает, что такое "услуга" или "документ" —
   * это решает страница, передавая нужный компонент карточки.
   */
  renderItem: (item: TItem, idx: number) => ReactNode;
  /**
   * Уровень заголовка секции (SEO/семантика).
   *
   * Важно: это НЕ контент и обычно НЕ должно приходить из CMS/БД.
   * Это presentation-level решение: страница (layout) решает, где h1, где h2 и т.д.
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export default function CardsSection<TItem>({
  data,
  renderItem,
  headingLevel = 2,
}: CardsSectionProps<TItem>) {
  return (
    <section className={`py-[3.125rem] bg-[#F9F9F9]`}>
      <Container className={`flex flex-col gap-[1.25rem]`}>

        <div className={`grid grid-cols-3 gap-[1.25rem]`}>
         <Heading level={headingLevel} title={data.heading.title} subtitle={data.heading.subtitle} />
          {data.items.map((item, idx) => (
            // BACKEND: ключ лучше брать из стабильного id, который придёт из API.
            // Сейчас это generic и может не иметь `id`, поэтому используем idx.
            <div key={idx}>{renderItem(item, idx)}</div>
          ))}
        </div>
      </Container>
    </section>
  );
}


