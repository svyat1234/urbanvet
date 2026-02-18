'use client';

import { useState, useRef } from 'react';
import styles from './Stats.module.css';
import Container from '@/components/Container';
import { getNextColor } from '@/lib/colorUtils';
import { STATS } from '@/lib/constants';

export default function Stats() {
  const [cardColors, setCardColors] = useState<string[]>(new Array(STATS.length).fill(''));
  const lastActivatedRef = useRef<number | null>(null);

  const handleCardActivate = (cardIndex: number) => {
    if (lastActivatedRef.current === cardIndex) return;
    lastActivatedRef.current = cardIndex;
    const color = getNextColor();
    setCardColors(prevColors => {
      const newColors = [...prevColors];
      newColors[cardIndex] = color;
      return newColors;
    });
  };

  const handleCardDeactivate = (cardIndex: number) => {
    lastActivatedRef.current = null;
    setCardColors(prevColors => {
      const newColors = [...prevColors];
      newColors[cardIndex] = '';
      return newColors;
    });
  };

  return (
    <section className="py-[3.125rem] max-sm:py-[2rem]">
      <Container className="grid grid-cols-4 gap-[20px] h-[290px]
      max-xl:h-[200px]
      max-lg:h-[170px]
      max-md:grid-cols-2 max-md:h-auto
      ">
        {STATS.map((stat, index) => (
          <div
            key={index}
            className={`${styles.card} flex flex-col items-center justify-center h-full gap-[2.8125rem] relative
            max-lg:gap-[1rem]
            max-md:py-[2rem]
            `}
            onMouseEnter={() => handleCardActivate(index)}
            onMouseLeave={() => handleCardDeactivate(index)}
            onFocus={() => handleCardActivate(index)}
            onBlur={() => handleCardDeactivate(index)}
          >
            <div
              className="w-[14px] h-full absolute left-0 top-0 transition-colors duration-300
              max-md:w-[10px]
              "
              style={{ backgroundColor: cardColors[index] }}
            />

            <h2 className="text-[5.125rem] font-bold font-[Circe] leading-[90%]
            max-2xl:text-[4rem]
            max-lg:text-[2.6rem]
            ">{stat.number}</h2>
            <span className="text-[1.874rem] font-medium opacity-70 text-center
            max-xl:text-[1.6rem]
            max-lg:text-[1.3rem] max-lg:max-w-[150px] max-lg:leading-[110%]
            ">{stat.label}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}
