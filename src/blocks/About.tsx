'use client';

import { useState, useRef } from 'react';
import styles from './About.module.css';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Image from 'next/image';
import CtaButton from '@/components/CtaButton';
import { getNextColor } from '@/lib/colorUtils';
import { HOME_PAGE } from '@/lib/constants';

export default function About() {
  const { image, imageAlt, heading, description, addressCard, recordCard } = HOME_PAGE.about;
  const [cardColors, setCardColors] = useState<string[]>(['', '']);
  const lastActivatedRef = useRef<number | null>(null);

  const handleCardActivate = (cardIndex: number) => {
    if (lastActivatedRef.current === cardIndex) return;
    lastActivatedRef.current = cardIndex;
    const color = getNextColor();
    setCardColors(prev => {
      const next = [...prev];
      next[cardIndex] = color;
      return next;
    });
  };

  const handleCardDeactivate = (cardIndex: number) => {
    lastActivatedRef.current = null;
    setCardColors(prev => {
      const next = [...prev];
      next[cardIndex] = '';
      return next;
    });
  };

  return (
    <section className='py-[3.125rem] bg-[#F9F9F9]'>
      <Container className='flex gap-[4.375rem] bg-white'>
      {/* Картинка */}
      <div className="max-w-full w-full self-stretch relative min-h-[200px]">
        <Image src={image} alt={imageAlt} fill className="w-full h-full object-cover" />
      </div>

      {/* Контент */}
      <div className="flex flex-col gap-[3.125rem] py-[4.375rem] pr-[4.375rem] max-w-[866px] w-full">
        <Heading subtitle={heading.subtitle} title={heading.title} />
        {description && description.length > 0 && (
          <div className="flex gap-[3.75rem]">
            {description.map((paragraph, index) => (
              <p key={index} className="text-[0.9375rem] leading-[120%] max-w-[369px] opacity-50">
                {paragraph}
              </p>
            ))}
          </div>
        )}


        <div className="flex gap-[3.125rem] mt-[5.25rem]">

        {/* Тут врядли будет больше 2х карточек и они немного разные, поэтому данные идут по индексам */}

          <div
            className={`${styles.card} flex flex-col relative`}
            onMouseEnter={() => handleCardActivate(0)}
            onMouseLeave={() => handleCardDeactivate(0)}
            onFocus={() => handleCardActivate(0)}
            onBlur={() => handleCardDeactivate(0)}
          >
            <div
              className="w-[14px] h-full absolute left-0 top-0 transition-colors duration-300"
              style={{ backgroundColor: cardColors[0] }}
            />
            <h3 className="text-[2.5rem] font-bold font-[Circe] leading-[100%]">{addressCard.title}</h3>
            <a href={addressCard.href ?? '#'} className="text-[0.9375rem] mt-[1.75rem] max-w-[240px] leading-[115%]">
              {addressCard.text}
            </a>
            <a
              href={`tel:${addressCard.phone!.replace(/\s/g, '')}`}
              className="text-[0.875rem] text-white font-medium bg-[#1D1D1D] flex items-center justify-center px-[1.875rem] h-[42px] rounded-[100px] mt-[2.3125rem] w-fit"
            >
              {addressCard.phone}
            </a>
          </div>

          <div
            className={`${styles.card} flex flex-col relative`}
            onMouseEnter={() => handleCardActivate(1)}
            onMouseLeave={() => handleCardDeactivate(1)}
            onFocus={() => handleCardActivate(1)}
            onBlur={() => handleCardDeactivate(1)}
          >
            <div
              className="w-[14px] h-full absolute left-0 top-0 transition-colors duration-300"
              style={{ backgroundColor: cardColors[1] }}
            />
            <h3 className="text-[2.5rem] font-bold font-[Circe] leading-[100%]">{recordCard.title}</h3>
            <span className="text-[0.9375rem] mt-[1.75rem] max-w-[240px] leading-[115%]">
              {recordCard.text}
            </span>
            <CtaButton href={recordCard.cta!.href} label={recordCard.cta!.label} className="mt-[2.3125rem]" />
          </div>
        </div>
      </div>
      </Container>
    </section>
  );
}

