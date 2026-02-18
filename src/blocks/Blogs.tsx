'use client';

import { useEffect, useRef, useState } from 'react';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import BlogsCard from '@/components/BlogsCard';
import { BLOG_POSTS } from '@/lib/constants';
import styles from './Blogs.module.css';

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeMode, setFadeMode] = useState<'in' | 'out'>('in');
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRafRef = useRef<number | null>(null);
  const timersRef = useRef<number[]>([]);

  // Настройки перелистывания страниц с блог-постами
  const POSTS_PER_PAGE = 6;
  const TRANSITION_DURATION_MS = 500;

  // Вычисляем количество страниц
  const totalPages = Math.ceil(BLOG_POSTS.length / POSTS_PER_PAGE);

  // Получаем посты для текущей страницы
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = BLOG_POSTS.slice(startIndex, endIndex);

  // Генерируем массив номеров страниц
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
      for (const id of timersRef.current) window.clearTimeout(id);
      timersRef.current = [];
    };
  }, []);

  const getSectionTop = () => {
    if (!sectionRef.current) return 0;
    const rect = sectionRef.current.getBoundingClientRect();
    return Math.max(0, rect.top + (window.scrollY ?? window.pageYOffset));
  };

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  /** Плавный скролл к заданной Y за durationMs. Цель фиксирована. В конце принудительно выставляем scroll. */
  const smoothScrollTo = (targetY: number, durationMs: number) => {
    if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
    const startY = window.scrollY ?? window.pageYOffset;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const eased = easeInOutCubic(t);
      window.scrollTo(0, startY + (targetY - startY) * eased);
      if (t < 1) {
        scrollRafRef.current = requestAnimationFrame(step);
      } else {
        scrollRafRef.current = null;
        window.scrollTo(0, getSectionTop());
      }
    };
    scrollRafRef.current = requestAnimationFrame(step);
  };

  const clearTimers = () => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  };

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    if (newPage === currentPage || isTransitioning) return;

    clearTimers();

    const half = Math.floor(TRANSITION_DURATION_MS / 2);
    setIsTransitioning(true);
    setFadeMode('out');

    // Цель читаем в следующем кадре (layout готов), скролл 500ms, в конце принудительно к верху секции
    requestAnimationFrame(() => {
      smoothScrollTo(getSectionTop(), TRANSITION_DURATION_MS);
    });

    timersRef.current.push(
      window.setTimeout(() => {
        setCurrentPage(newPage);
        setFadeMode('in');
      }, half),
    );

    timersRef.current.push(
      window.setTimeout(() => {
        setIsTransitioning(false);
      }, TRANSITION_DURATION_MS),
    );
  };

  const handlePageClick = (page: number) => {
    changePage(page);
  };

  return (
    <section ref={sectionRef} className={`py-[3.13rem] bg-[#F9F9F9]`}>
      <Container>
        <div className={`flex justify-between items-end gap-[50px]
          max-xl:items-start
          max-md:flex-col max-md:gap-[30px]
          `}>

          {/* Фильтры */}
          <div className={`flex gap-5 relative 
            max-xl:flex-wrap
            max-md:order-2
            `}>
            <button
              className={`sort-menu sort-btn`}
              onClick={() => setIsSortModalOpen((prev) => !prev)}
            >
              Сортировка
            </button>

            {/* Окно с типом сортировки */}
            {isSortModalOpen && (
              <div className={`${styles.sortModal} absolute max-w-[246px] w-full bg-white rounded-[35px] p-[20px] z-50 flex flex-col gap-[10px]`}>
                <button type="button" className={`${styles.modalSortBtn}`}>По дате</button>
                <button type="button" className={`${styles.modalSortBtn}`}>По имени</button>
                <button type="button" className={`${styles.modalSortBtn}`}>Старые</button>
              </div>
            )}

            <div className={`flex gap-1 
              max-md:flex-wrap
              `}>
              <button className={`sort-btn`}>Раздел</button>
              <button className={`sort-btn`}>Автор</button>
              <button className={`sort-btn`}>Ещё...</button>
            </div>

            <input type="text" className={`sort-search`} placeholder='Введите запрос' />


          </div>

          <div className="flex justify-between max-w-[788px] w-full max-xl:max-w-[400px]">
            <Heading subtitle="блог" title="актуальное" />
          </div>
        </div>

        {/* Карточки блог-постов */}
        <div
          className={`${styles.blogsGrid} mt-20 grid grid-cols-3 gap-5 ${fadeMode === 'out' ? styles.fadeOut : styles.fadeIn}
          max-xl:grid-cols-2 max-xl:mt-12
          max-md:grid-cols-1
          `}
          style={
            {
              '--fade-duration': `${Math.floor(TRANSITION_DURATION_MS / 2)}ms`,
            } as React.CSSProperties
          }
        >
          {currentPosts.map(post => (
            <BlogsCard
              key={post.id}
              data={post}
              from="/blogs"
              fromLabel="Блог"
            />
          ))}
        </div>

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className={`flex gap-[1.5625rem] max-w-full w-full justify-center items-center mt-20 max-md:mt-10`}>
            <button
              className={`${styles.btnPrev} ${styles.btn}`}
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.5 0C11.8645 0 0 11.8645 0 26.5C0 41.1355 11.8645 53 26.5 53C41.1355 53 53 41.1355 53 26.5C53 11.8645 41.8645 0 26.5 0ZM24.4238 15.6875C25.0487 15.0632 26.0609 15.0628 26.6855 15.6875C27.3102 16.3122 27.3099 17.3243 26.6855 17.9492L19.2344 25.4004H37.999C38.8826 25.4004 39.5995 26.1174 39.5996 27.001C39.5996 27.8846 38.8827 28.6016 37.999 28.6016H19.2344L26.6855 36.0527C27.31 36.6775 27.3101 37.6897 26.6855 38.3145C26.0608 38.9392 25.0487 38.939 24.4238 38.3145L14.2412 28.1318C13.6164 27.507 13.6164 26.495 14.2412 25.8701L24.4238 15.6875Z" fill="#ACD9CF" />
              </svg>
            </button>

            <div className={`flex gap-[1.5625rem] items-center`}>
              {pageNumbers.map(page => (
                <button
                  key={page}
                  className={`${styles.btnNumber} ${currentPage === page ? styles.active : ''}`}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className={`${styles.btnNext} ${styles.btn}`}
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.5 0C11.8645 0 0 11.8645 0 26.5C0 41.1355 11.8645 53 26.5 53C41.1355 53 53 41.1355 53 26.5C53 11.8645 41.8645 0 26.5 0ZM24.4238 15.6875C25.0487 15.0632 26.0609 15.0628 26.6855 15.6875C27.3102 16.3122 27.3099 17.3243 26.6855 17.9492L19.2344 25.4004H37.999C38.8826 25.4004 39.5995 26.1174 39.5996 27.001C39.5996 27.8846 38.8827 28.6016 37.999 28.6016H19.2344L26.6855 36.0527C27.31 36.6775 27.3101 37.6897 26.6855 38.3145C26.0608 38.9392 25.0487 38.939 24.4238 38.3145L14.2412 28.1318C13.6164 27.507 13.6164 26.495 14.2412 25.8701L24.4238 15.6875Z" fill="#ACD9CF" />
              </svg>
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}