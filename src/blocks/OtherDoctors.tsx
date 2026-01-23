  'use client';

import styles from './OtherDoctors.module.css';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Image from 'next/image';
import { DOCTORS } from '@/lib/constants';
import { getDoctorHref } from '@/lib/routes';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

interface OtherDoctorsProps {
  currentDoctorKey: string;
  heading: {
    subtitle: string;
    title: string;
  };
}

export default function OtherDoctors({ currentDoctorKey, heading }: OtherDoctorsProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const otherDoctors = DOCTORS.filter((d) => (d.slug || String(d.id)) !== currentDoctorKey);

  const applyHalfStartOffset = (swiper: SwiperClass) => {
    if (swiper.destroyed) return;

    const firstSlideSize = swiper.slidesSizesGrid?.[0];
    const spaceBetween =
      typeof swiper.params.spaceBetween === 'number' ? swiper.params.spaceBetween : 0;
    if (!firstSlideSize) return;

    // UI: хотим начать "с половины" первого слайда: [половина слайда] + [целый] + [целый]
    // Самый стабильный способ — отрицательный slidesOffsetBefore (Swiper сам учтёт это при расчётах).
    const offset = -(firstSlideSize / 2 + spaceBetween / 2);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (swiper.params as any).slidesOffsetBefore = offset;
    swiper.update();
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (!prevRef.current || !nextRef.current) return;
    if (swiper.destroyed) return;

    // Важно: refs на кнопки появляются после первого рендера, поэтому инициализируем navigation тут.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = swiper.params.navigation as any;
    nav.prevEl = prevRef.current;
    nav.nextEl = nextRef.current;

    swiper.navigation?.destroy?.();
    swiper.navigation?.init?.();
    swiper.navigation?.update?.();

    // На всякий случай пере-применяем offset после инициализации navigation.
    requestAnimationFrame(() => applyHalfStartOffset(swiper));
  }, []);

  return (
    <section className={`${styles.section} pt-12.5 pb-25`}>
      <Container>
        <div className={`${styles.slider} flex gap-[20px]`}>

          {/* Слайдер */}
          <Swiper
            className={`${styles.swiper} w-full`}
            modules={[Navigation]}
            direction="horizontal"
            loop={true}
            initialSlide={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            spaceBetween={20}
            slidesPerView={3}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;

              // Старт "с половины" первого слайда
              requestAnimationFrame(() => applyHalfStartOffset(swiper));
            }}
            onResize={(swiper) => requestAnimationFrame(() => applyHalfStartOffset(swiper))}
            onBeforeInit={(swiper) => {
              // Swiper читает элементы навигации из params при инициализации
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const nav = swiper.params.navigation as any;
              nav.prevEl = prevRef.current;
              nav.nextEl = nextRef.current;
            }}
          >
            {/* Слайды */}
            {otherDoctors.map((doctor) => (
              <SwiperSlide key={doctor.id} className={`${styles.slide}`}>
                <a href={getDoctorHref(doctor)} className={`${styles.link} block h-full`}>
                  <div className={`h-[350px] relative`}>
                    <Image
                      src={doctor.photo}
                      alt={doctor.name}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Заголовок, к нопки */}
          <div className={`flex flex-col justify-between max-w-199.5 w-full`}>
            <Heading subtitle={heading.subtitle} title={heading.title}></Heading>

            <div className={`flex items-center gap-[19px]`}>
              <button
                ref={prevRef}
                type="button"
                aria-label="Предыдущий слайд"
                className={`slider-button slider-button-prev`}
              >
                <svg width="100%" height="100%" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.0002 10.286C25.8839 10.286 26.6002 11.0023 26.6002 11.886C26.6002 12.7696 25.8839 13.486 25.0002 13.486L25.0002 11.886L25.0002 10.286ZM1.24144 13.0173C0.616605 12.3925 0.616605 11.3794 1.24144 10.7546L11.4238 0.572265C12.0486 -0.0525734 13.0617 -0.0525734 13.6865 0.572265C14.3114 1.1971 14.3114 2.21017 13.6865 2.83501L4.63556 11.886L13.6865 20.9369C14.3114 21.5618 14.3114 22.5748 13.6865 23.1997C13.0617 23.8245 12.0486 23.8245 11.4238 23.1997L1.24144 13.0173ZM25.0002 11.886L25.0002 13.486H2.37282L2.37282 11.886L2.37281 10.286H25.0002L25.0002 11.886Z" fill="#1D1D1D"/>
                </svg>

              </button>
              <button
                ref={nextRef}
                type="button"
                aria-label="Следующий слайд"
                className={`slider-button slider-button-next`}
              >
                <svg width="100%" height="100%" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.0002 10.286C25.8839 10.286 26.6002 11.0023 26.6002 11.886C26.6002 12.7696 25.8839 13.486 25.0002 13.486L25.0002 11.886L25.0002 10.286ZM1.24144 13.0173C0.616605 12.3925 0.616605 11.3794 1.24144 10.7546L11.4238 0.572265C12.0486 -0.0525734 13.0617 -0.0525734 13.6865 0.572265C14.3114 1.1971 14.3114 2.21017 13.6865 2.83501L4.63556 11.886L13.6865 20.9369C14.3114 21.5618 14.3114 22.5748 13.6865 23.1997C13.0617 23.8245 12.0486 23.8245 11.4238 23.1997L1.24144 13.0173ZM25.0002 11.886L25.0002 13.486H2.37282L2.37282 11.886L2.37281 10.286H25.0002L25.0002 11.886Z" fill="#1D1D1D"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
