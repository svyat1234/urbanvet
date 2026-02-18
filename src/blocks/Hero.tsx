'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import styles from './Hero.module.css';
import Container from '@/components/Container';
import Image from 'next/image';
import CtaButton from '@/components/CtaButton';
import { HOME_PAGE, DOCTORS, type Doctor } from '@/lib/constants';

/** Врачи от новых к старым (по id по убыванию). */
const DOCTORS_NEWEST_FIRST = [...DOCTORS].sort((a, b) => b.id - a.id);

const ROTATION_INTERVAL_MS = 5000;
const FADE_DURATION_MS = 400;

export default function Hero() {
  const hero = HOME_PAGE.hero;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const n = DOCTORS_NEWEST_FIRST.length;
  const mainDoctor = DOCTORS_NEWEST_FIRST[currentIndex % n];
  const centerDoctor = DOCTORS_NEWEST_FIRST[(currentIndex + 1) % n];
  const leftDoctor = DOCTORS_NEWEST_FIRST[(currentIndex + 2) % n];

  useEffect(() => {
    const t = setInterval(() => setIsVisible(false), ROTATION_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (!isVisible) {
      setCurrentIndex((i) => (i + 1) % n);
      setIsVisible(true);
    }
  }, [isVisible, n]);

  const doctorHref = (d: Doctor) => `/doctors/${d.slug ?? d.id}`;

  const headingRef = useRef<HTMLDivElement>(null);
  const doctorsBlockRef = useRef<HTMLDivElement>(null);

  const animateReveal = useCallback((el: HTMLDivElement | null, reveal: number, fillOpacity: number) => {
    if (el) {
      gsap.to(el, {
        '--reveal': reveal,
        '--fill-opacity': fillOpacity,
        duration: 0.75,
        ease: reveal === 100 ? 'power2.out' : 'power2.in',
      });
    }
  }, []);

  const handleHeadingMouseEnter = useCallback(() => {
    animateReveal(headingRef.current, 100, 1);
  }, [animateReveal]);

  const handleHeadingMouseLeave = useCallback(() => {
    animateReveal(headingRef.current, 5, 0.3);
  }, [animateReveal]);

  const handleDoctorsBlockMouseEnter = useCallback(() => {
    animateReveal(doctorsBlockRef.current, 100, 1);
  }, [animateReveal]);

  const handleDoctorsBlockMouseLeave = useCallback(() => {
    animateReveal(doctorsBlockRef.current, 5, 0.3);
  }, [animateReveal]);

  return (
    <section className="pt-[9.625rem] pb-[3.125rem] -mt-[9.625rem] bg-[#F9F9F9]">
      <Container className="flex justify-baseline gap-[20px]
      max-md:flex-col
      ">
        {/* Картинка */}
        <div className="self-stretch relative max-w-full w-full min-h-[300px] bg-[#ffffff]
        max-lg:min-h-[400px]
        max-sm:min-h-[300px]
        ">
          {hero.heroImage ? (
            <Image src={hero.heroImage} alt="" fill className="object-cover" />
          ) : (
            <span className="text-black/30 text-sm absolute inset-0 flex items-center justify-center">Изображение</span>
          )}

          {/* Картика птички */}
          <div className={`${styles.bird}`}></div>

          {/* Картинка креста за гифкой (СКОРЕЕ ВСЕГО НАДО БУДЕТ УБРАТЬ) */}
          {/* <div className={`${styles.cross}`}></div> */}
        </div>

        {/* Контент */}
        <div className={`flex flex-col gap-[20px] max-w-[798px] w-full`}>
          {/* Оглавление: градиент из угла, при наведении блок закрашивается #F2C1D5 */}
          <div
            ref={headingRef}
            className={`${styles.heading} flex flex-col w-full p-[3.125rem]
            max-xl:p-[2rem]
            max-sm:p-[1.5rem]
            `}
            onMouseEnter={handleHeadingMouseEnter}
            onMouseLeave={handleHeadingMouseLeave}
          >
            <h1 className="font-[Circe] font-bold text-[5.625rem] leading-[90%] z-10
            max-lg:text-[4rem]
            ">
              {hero.title} <br /> {hero.titleLine2 ?? ''}
            </h1>
            <p className="opacity-50 text-[0.9375rem] leading-[110%] mt-[2.3rem] max-w-[338px] z-10
            max-xl:mt-[1.7rem]
            ">
              {hero.description}
            </p>
            <CtaButton href={hero.cta.href} label={hero.cta.label} className="mt-[3.8125rem] z-10
            max-xl:mt-[3rem]
            max-lg:mt-[2rem]
            " />

            <div className={`${styles.laps}`}></div>
          </div>

          {/* Врачи: ротация, от новых к старым; при наведении блок закрашивается #ACD9CF */}
          <div
            ref={doctorsBlockRef}
            className={`${styles.doctorsBlock} flex gap-[19px] items-center w-full py-[2.625rem] px-[3.125rem]
            max-xl:p-[2rem]
            max-sm:p-[1.5rem]
            `}
            onMouseEnter={handleDoctorsBlockMouseEnter}
            onMouseLeave={handleDoctorsBlockMouseLeave}
          >
            <div
              className="flex gap-[19px] items-center w-full transition-opacity duration-[400ms]
              max-md:flex-col max-md:items-start
              "
              style={{ opacity: isVisible ? 1 : 0 }}
              onTransitionEnd={handleTransitionEnd}
            >
              {/* Фото: основной справа, след. два — центр и слева */}
              <div className={`${styles.doctorImageCards} flex`}>
                <div className={styles.doctorImageWrap}>
                  <Image
                    src={mainDoctor.photo}
                    alt={mainDoctor.name}
                    width={114}
                    height={114}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={styles.doctorImageWrap}>
                  <Image
                    src={centerDoctor.photo}
                    alt={centerDoctor.name}
                    width={114}
                    height={114}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={styles.doctorImageWrap}>
                  <Image
                    src={leftDoctor.photo}
                    alt={leftDoctor.name}
                    width={114}
                    height={114}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Информация об основном враче */}
              <div className="flex flex-col gap-4 max-w-[26.7rem] min-w-0 flex-1 max-sm:gap-2">
                <h2 className="font-[Circe] font-bold text-[2.5rem] leading-[87%]
                max-2xl:text-[2rem]
                max-xl:text-[1.5rem]
                max-md:max-w-[250px]
                ">{mainDoctor.name}</h2>
                <p className="font-medium text-[0.9375rem] leading-none">{mainDoctor.position}</p>
              </div>
            </div>

            {/* Ссылка на врача: вне анимации, всегда видна, href обновляется при смене врача */}
            <Link href={doctorHref(mainDoctor)} className={`${styles.doctorLink} w-[53px] aspect-square shrink-0 max-lg:w-[42px]`}>
              <svg height="100%" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 0C32.598 0 42 9.40202 42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21C0 9.40202 9.40202 0 21 0ZM13.7754 13.2051C12.9025 13.2051 12.1944 13.9123 12.1943 14.7852C12.1943 15.6581 12.9025 16.3662 13.7754 16.3662L24.1836 16.3652L13.668 26.8818C13.0507 27.4991 13.0507 28.5 13.668 29.1172C14.2852 29.7343 15.2851 29.7343 15.9023 29.1172L26.4189 18.6006V29.0098C26.4189 29.8827 27.1271 30.5908 28 30.5908C28.8728 30.5907 29.5801 29.8826 29.5801 29.0098V14.7852C29.5801 13.9124 28.8727 13.2053 28 13.2051H13.7754Z"
                  fill="#1D1D1D"
                />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
