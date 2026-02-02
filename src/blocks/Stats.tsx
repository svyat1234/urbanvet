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
    <section className="py-[3.125rem]">
      <Container className="grid grid-cols-4 gap-[20px] h-[290px]">
        {STATS.map((stat, index) => (
          <div
            key={index}
            className={`${styles.card} flex flex-col items-center justify-center h-full gap-[2.8125rem] relative`}
            onMouseEnter={() => handleCardActivate(index)}
            onMouseLeave={() => handleCardDeactivate(index)}
            onFocus={() => handleCardActivate(index)}
            onBlur={() => handleCardDeactivate(index)}
          >
            <div
              className="w-[14px] h-full absolute left-0 top-0 transition-colors duration-300"
              style={{ backgroundColor: cardColors[index] }}
            />

            <h2 className="text-[5.125rem] font-bold font-[Circe] leading-[90%]">{stat.number}</h2>
            <span className="text-[1.874rem] font-medium opacity-70">{stat.label}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}
