'use client';

import styles from './AboutHero.module.css';
import Container from '@/components/Container';
import CtaButton from '@/components/CtaButton';
import Image from 'next/image';
import { ABOUT_PAGE } from '@/lib/constants';

export default function AboutHero() {
  return (
    <section className='py-[3.125rem] mb-[3.125] bg-[#F9F9F9]'>
      <Container className='flex gap-[20px] h-[713px]'>
        <div className='flex flex-col h-full justify-between bg-white max-w-[634px] w-full pt-[3.5rem] pl-[4.375rem] pr-[2.9375rem] pb-[4.375rem]'>
          <div className='flex flex-col gap-[3.875rem]'>
            <h1 className='text-[5.625rem] font-bold font-[Circe] leading-[80%]'>{ABOUT_PAGE.hero.title}</h1>
            <p className='text-[0.9375rem] opacity-50 font-normal tracking-[-1%]'>
                {ABOUT_PAGE.hero.description}
            </p>
          </div>

          {/* Нижняя ссылка */}
          <CtaButton href={ABOUT_PAGE.hero.cta.href} label={ABOUT_PAGE.hero.cta.label} />
        </div>

        {/* Изображение: фон передаём в CSS для псевдоэлемента с размытием по маске лапы */}
        <div
          className={`${styles.imageWrap} max-w-full w-full h-full relative`}
          style={{ '--hero-image': `url(${ABOUT_PAGE.hero.image.src})` } as React.CSSProperties}
        >
          <Image
            src={ABOUT_PAGE.hero.image}
            alt={ABOUT_PAGE.hero.imageAlt}
            fill
            className="w-full h-full object-cover"
          />
        </div>

      </Container>
    </section>
  );
}

