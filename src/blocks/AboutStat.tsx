'use client';

import { useState } from 'react';
import styles from './AboutStat.module.css';
import Container from '@/components/Container';
import Image from 'next/image';
import { getNextColor } from '@/lib/colorUtils';
import { ABOUT_PAGE } from '@/lib/constants';



export default function AboutStat() {
    const [cardColors, setCardColors] = useState<string[]>(new Array(ABOUT_PAGE.stats.length).fill(''));

    const handleCardActivate = (cardIndex: number) => {
        setCardColors(prevColors => {
            const newColors = [...prevColors];
            newColors[cardIndex] = getNextColor();
            return newColors;
        });
    };

    const handleCardDeactivate = (cardIndex: number) => {
        setCardColors(prevColors => {
            const newColors = [...prevColors];
            newColors[cardIndex] = '';
            return newColors;
        });
    };

    return (
      <section className='py-[3.125rem]'>
        <Container className='grid grid-cols-4 gap-[20px] h-[290px]'>
            {/* Карточки со статистикой */}
            {ABOUT_PAGE.stats.map((stat, index) => (
                <div
                    key={index}
                    className={`${styles.card} flex flex-col items-center justify-center h-full gap-[2.8125rem] relative`}
                    onMouseEnter={() => handleCardActivate(index)}
                    onMouseLeave={() => handleCardDeactivate(index)}
                    onFocus={() => handleCardActivate(index)}
                    onBlur={() => handleCardDeactivate(index)}
                >
                    {/* Цветная плашка */}
                    <div
                        className="w-[14] h-full absolute left-0 top-0 transition-colors duration-300"
                        style={{ backgroundColor: cardColors[index] }}
                    ></div>

                    <h2 className='text-[5.125rem] font-bold font-[Circe] leading-[90%]'>{stat.number}</h2>
                    <span className='text-[1.874rem] font-medium opacity-70'>{stat.label}</span>
                </div>
            ))}
        </Container>
      </section>
    );
  }
  