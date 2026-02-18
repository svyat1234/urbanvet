'use client';

import styles from './Gallery.module.css';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { GALLERY_ITEMS } from '@/lib/constants';
import GalleryCard from '@/components/GalleryCard';
import Image from 'next/image';
import { formatRuDateLong } from '@/lib/dateUtils';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

export default function Gallery() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevRef.current || !nextRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = swiper.params.navigation as any;
    nav.prevEl = prevRef.current;
    nav.nextEl = nextRef.current;

    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  useEffect(() => {
    if (activeIndex !== null) {
      const frame = requestAnimationFrame(() => {
        setLightboxVisible(true);
      });
      return () => cancelAnimationFrame(frame);
    }
    setLightboxVisible(false);
  }, [activeIndex]);

  const activeItem = activeIndex !== null ? GALLERY_ITEMS[activeIndex] : null;

  return (
    <section className={`py-[3.13rem] mt-[6.25rem] mb-12.5 bg-[#F9F9F9]
    max-md:my-10
    `}>
      <Container className={`flex flex-col gap-10`}>
        <div className={`flex items-end justify-between`}>
          <Heading
            subtitle="галерея"
            title="Как выглядит наша клиника"
          />

          <div className={`flex gap-[19px]`}>
            <button
              ref={prevRef}
              type="button"
              aria-label="Предыдущий слайд"
              className={`slider-button slider-button-prev bg-white`}
            >
              <svg width="100%" height="100%" viewBox="0 0 27 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M25.0002 10.286C25.8839 10.286 26.6002 11.0023 26.6002 11.886C26.6002 12.7696 25.8839 13.486 25.0002 13.486L25.0002 11.886L25.0002 10.286ZM1.24144 13.0173C0.616605 12.3925 0.616605 11.3794 1.24144 10.7546L11.4238 0.572265C12.0486 -0.0525734 13.0617 -0.0525734 13.6865 0.572265C14.3114 1.1971 14.3114 2.21017 13.6865 2.83501L4.63556 11.886L13.6865 20.9369C14.3114 21.5618 14.3114 22.5748 13.6865 23.1997C13.0617 23.8245 12.0486 23.8245 11.4238 23.1997L1.24144 13.0173ZM25.0002 11.886L25.0002 13.486H2.37282L2.37282 11.886L2.37281 10.286H25.0002L25.0002 11.886Z"
                  fill="#1D1D1D"
                />
              </svg>
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Следующий слайд"
              className={`slider-button slider-button-next bg-white`}
            >
              <svg width="100%" height="100%" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M25.0002 10.286C25.8839 10.286 26.6002 11.0023 26.6002 11.886C26.6002 12.7696 25.8839 13.486 25.0002 13.486L25.0002 11.886L25.0002 10.286ZM1.24144 13.0173C0.616605 12.3925 0.616605 11.3794 1.24144 10.7546L11.4238 0.572265C12.0486 -0.0525734 13.0617 -0.0525734 13.6865 0.572265C14.3114 1.1971 14.3114 2.21017 13.6865 2.83501L4.63556 11.886L13.6865 20.9369C14.3114 21.5618 14.3114 22.5748 13.6865 23.1997C13.0617 23.8245 12.0486 23.8245 11.4238 23.1997L1.24144 13.0173ZM25.0002 11.886L25.0002 13.486H2.37282L2.37282 11.886L2.37281 10.286H25.0002L25.0002 11.886Z"
                  fill="#1D1D1D"
                />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Autoplay]}
          direction="horizontal"
          loop={true}
          speed={800}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          className="w-full"
        >
          {GALLERY_ITEMS.map((item, index) => (
            <SwiperSlide key={item.id}>
              <GalleryCard item={item} onClick={() => setActiveIndex(index)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {activeItem && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 transition-opacity duration-300 ${
            lightboxVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="absolute right-6 top-6 text-white underline text-sm z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
            }}
          >
            Закрыть
          </button>
          <Container className={`flex justify-center`}>
          <div
            className="relative w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute left-0 top-0 flex flex-wrap gap-1 max-w-full m-4">
              <span className="px-[1.875rem] h-[42px] text-[0.875rem] bg-white flex items-center rounded-[100px]">
                {formatRuDateLong(activeItem.date)}
              </span>
              {activeItem.tags.map((tag) => (
                <div
                  key={tag}
                  className="px-[1.25rem] h-[42px] flex items-center border border-white rounded-[100px] text-white text-[0.75rem]"
                >
                  {tag}
                </div>
              ))}
            </div>
            <Image
              src={activeItem.image}
              alt={activeItem.tags.join(', ')}
              className="block max-h-[90vh] max-w-full h-auto w-auto object-contain transform transition-transform duration-300 ease-out"
            />
          </div>
          </Container>

        </div>
      )}
    </section>
  );
}

