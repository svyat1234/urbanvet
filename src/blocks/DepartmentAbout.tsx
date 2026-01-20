'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import styles from './DepartmentAbout.module.css';
import Heading from '@/components/Heading';
import type { DepartmentAboutData } from '@/lib/constants';
import Image from 'next/image';

interface DepartmentAboutProps {
  data: DepartmentAboutData;
  /**
   * Уровень заголовка секции (SEO/семантика).
   *
   * Важно: это НЕ контент и обычно НЕ должно приходить из CMS/БД.
   * Это presentation-level решение: страница (layout) решает, где h1, где h2 и т.д.
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export default function DepartmentAbout({ data, headingLevel = 2 }: DepartmentAboutProps) {
  const hoverColors = ['#E3E993', '#F2C1D5', '#ACD9CF'];
  const [savedBgByIndex, setSavedBgByIndex] = useState<Record<number, string>>({});

  function handleCardHover(idx: number) {
    const nextColor = hoverColors[idx % hoverColors.length];
    setSavedBgByIndex((prev) => (prev[idx] ? prev : { ...prev, [idx]: nextColor }));
  }

  return (
    <section className={`${styles.about} mt-[6.25rem] pt-[3.125rem]`}>
      <Container className={`flex justify-between pb-[2.5rem]`}>
        <div className={`flex gap-[52px] mt-[5rem]`}>
          <p className={`${styles.aboutText}`}>{data.description[0]}</p>
          <p className={`${styles.aboutText}`}>{data.description[1]}</p>
        </div>

        <Heading level={headingLevel} title={data.heading.title} subtitle={data.heading.subtitle} />
      </Container>

      <div className={`bg-[#F9F9F9] w-full pt-[3.125rem] pb-[5.75rem]`}>
        <Container className={`flex gap-[1.25rem]`}>
          <div className={`flex flex-1 gap-[1.25rem]`}>
            {data.cards.map((card, idx) => (
              <div
                key={`${card.title}-${idx}`}
                className={`flex flex-1 flex-col bg-white h-[319px] py-[3.25rem] px-[2.25rem] transition-colors duration-300`}
                style={{ backgroundColor: savedBgByIndex[idx] || '#fff' }}
                onMouseEnter={() => handleCardHover(idx)}
                onFocus={() => handleCardHover(idx)}
                tabIndex={0}
              >
                <h3 className={`font-[Circe] font-normal text-[6.25rem] leading-[90%]`}>{card.title}</h3>
                <p className={`text-[0.938rem] leading-[100%]`}>{card.description}</p>
              </div>
            ))}
          </div>
          <div className={`max-w-200 w-full h-[319px]`}>
            <Image src={data.image} alt={data.heading.title} className={`w-full h-full object-cover`} />
          </div>
        </Container>
      </div>
    </section>
  );
}

