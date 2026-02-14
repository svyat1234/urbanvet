'use client';

import styles from './BlogsCompact.module.css';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { BLOG_POSTS, DOCTOR_PAGES } from '@/lib/constants';
import BlogsCard from '@/components/BlogsCard';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

interface BlogsCompactProps {
  /**
   * Slug текущего поста, который нужно исключить из отображения
   */
  excludeSlug?: string;
  /**
   * Кастомный заголовок секции (если не указан, используется из констант)
   */
  customTitle?: string;
  /**
   * Кастомный подзаголовок секции (если не указан, используется из констант)
   */
  customSubtitle?: string;
}

export default function BlogsCompact({ excludeSlug, customTitle, customSubtitle }: BlogsCompactProps = {}) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  // Фильтруем посты, исключая текущий, если передан excludeSlug
  const filteredPosts = excludeSlug
    ? BLOG_POSTS.filter(post => post.slug !== excludeSlug)
    : BLOG_POSTS;

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevRef.current || !nextRef.current) return;

    // Инициализируем навигацию вручную, так как кнопки находятся вне контейнера Swiper
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = swiper.params.navigation as any;
    nav.prevEl = prevRef.current;
    nav.nextEl = nextRef.current;

    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  return (
    <section className={`py-[3.13rem] mt-[6.25rem] bg-[#F9F9F9]`}>
      <Container className={`flex flex-col gap-10`}>
        <div className={`flex items-end justify-between`}>
          <Heading
            subtitle={customSubtitle ?? DOCTOR_PAGES.blogs.heading.subtitle}
            title={customTitle ?? DOCTOR_PAGES.blogs.heading.title}
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
          modules={[Navigation]}
          direction="horizontal"
          loop={true}
          slidesPerView={1}
          spaceBetween={20}
          className="w-full"
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
        >
          {filteredPosts.map((post) => (
            <SwiperSlide key={post.id} className='self-stretch'>
              <BlogsCard data={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
