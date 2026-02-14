'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import styles from './DepartmentAbout.module.css';
import Heading from '@/components/Heading';
import type { DepartmentAboutData } from '@/lib/constants';
import Image from 'next/image';

interface DepartmentAboutProps {
  data?: DepartmentAboutData | null;
}

export default function DepartmentAbout({ data }: DepartmentAboutProps) {
  if (!data) return null;

  const hoverColors = ['#E3E993', '#F2C1D5', '#ACD9CF'];
  const [savedBgByIndex, setSavedBgByIndex] = useState<Record<number, string>>({});

  function handleCardHover(idx: number) {
    const nextColor = hoverColors[idx % hoverColors.length];
    setSavedBgByIndex((prev) => (prev[idx] ? prev : { ...prev, [idx]: nextColor }));
  }

  return (
    <section className={`${styles.about} mt-[6.25rem] pt-[3.125rem]`}>
      {/* Первый блок */}
      <Container className={`flex justify-between pb-[2.5rem] gap-[20px]
        max-lg:flex-col max-lg:justify-start
        `}>
        {/* Текста */}
        <div className={`flex gap-[52px] mt-[5rem]
          max-xl:flex-col max-xl:gap-6 max-xl:max-w-[50%] max-xl:w-full
          max-lg:order-2 max-lg:max-w-full max-lg:mt-[1rem] max-lg:gap-4
          `}>
          {data.description.map((text, idx) => (
            <p key={idx} className={styles.aboutText}>{text}</p>
          ))}
        </div>

        {/* Оглавление */}
        <Heading title={data.heading.title} subtitle={data.heading.subtitle} />
      </Container>

      {/* Второй блок со статистикой */}
      <div className={`bg-[#F9F9F9] w-full pt-[3.125rem] pb-[5.75rem]`}>
        <Container className={`flex gap-[1.25rem]
          max-lg:flex-col
          `}>
          <div className={`flex flex-1 gap-[1.25rem]
            max-sm:flex-wrap
            `}>
            {data.cards.map((card, idx) => (
              <div
                key={`${card.title}-${idx}`}
                className={`flex flex-1 flex-col bg-white h-[319px] py-[3.25rem] px-[2.25rem] transition-colors duration-300
                  max-2xl:h-[250px]
                  max-lg:px-[2rem]
                  max-sm:w-full max-sm:flex-none max-sm:h-[200px]
                  `}
                style={{ backgroundColor: savedBgByIndex[idx] || '#fff' }}
                onMouseEnter={() => handleCardHover(idx)}
                onFocus={() => handleCardHover(idx)}
                tabIndex={0}
              >
                <h3 className={`font-[Circe] font-normal text-[6.25rem] leading-[90%]
                  max-2xl:text-[5rem]
                  max-lg:text-[4rem]
                  `}>{card.title}</h3>
                <p className={`text-[0.938rem] leading-[100%]`}>{card.description}</p>
              </div>
            ))}
          </div>
          <div className={`max-w-200 w-full self-stretch
            max-sm:h-[200px]
            `}>
            <Image src={data.image} alt={data.heading.title} className={`w-full h-full object-cover`} />
          </div>
        </Container>
      </div>
    </section>
  );
}

