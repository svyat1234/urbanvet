'use client';

import styles from './AboutHero.module.css';
import Container from '@/components/Container';
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
          <a href={ABOUT_PAGE.hero.cta.href} className={`${styles.link} flex items-center gap-[4px] h-[2.625rem]`}>
            <span className={`text-[0.875rem] text-white font-medium bg-[#1D1D1D] flex items-center justify-center px-[1.875rem] h-full rounded-[100px]`}>
              {ABOUT_PAGE.hero.cta.label}
            </span>
            <svg height="100%" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 0C32.598 0 42 9.40202 42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21C0 9.40202 9.40202 0 21 0ZM13.7754 13.2051C12.9025 13.2051 12.1944 13.9123 12.1943 14.7852C12.1943 15.6581 12.9025 16.3662 13.7754 16.3662L24.1836 16.3652L13.668 26.8818C13.0507 27.4991 13.0507 28.5 13.668 29.1172C14.2852 29.7343 15.2851 29.7343 15.9023 29.1172L26.4189 18.6006V29.0098C26.4189 29.8827 27.1271 30.5908 28 30.5908C28.8728 30.5907 29.5801 29.8826 29.5801 29.0098V14.7852C29.5801 13.9124 28.8727 13.2053 28 13.2051H13.7754Z" fill="#1D1D1D"/>
            </svg>
          </a>
        </div>

        {/* Изображение */}
        <div className={`max-w-full w-full h-full relative`}>
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

