'use client';

import { useEffect, useRef, useState } from 'react';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Doctor from '@/components/Doctor';
import type { DoctorsPageData } from '@/lib/constants';
import styles from './DoctorsHero.module.css';

export interface DoctorsProps {
  data?: DoctorsPageData | null;
  /**
   * UI:
   * Контекст "откуда пришли" для формирования ссылок на врачей.
   * Тогда на странице врача можно показать крошку/ссылку именно на источник перехода.
   *
   * BACKEND:
   * Это не заменяет нормальные хлебные крошки из CMS/API.
   * Это только UX-фича для возврата на страницу-источник.
   */
  linkFrom?: { href: string; label: string };
  /**
   * Сколько карточек показывать на одной странице.
   * Пример:
   * - /doctors: 9
   * - /departments/[slug]: 3
   */
  itemsPerPage?: number;
  /**
   * Включать ли автоскролл к началу секции при смене страницы.
   * На странице /doctors — да, на остальных страницах — обычно нет.
   */
  scrollToTopOnPageChange?: boolean;
  /**
   * Уровень заголовка (для SEO/семантики).
   * На странице /doctors обычно h1, а внутри других страниц — h2.
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

// Настройки перелистывания страниц со врачами
const DEFAULT_DOCTORS_PER_PAGE = 9;
const TRANSITION_DURATION_MS = 500;
const MOBILE_BREAKPOINT_PX = 768;
const MOBILE_DOCTORS_PER_PAGE = 6;

export default function Doctors({
  data,
  linkFrom,
  itemsPerPage = DEFAULT_DOCTORS_PER_PAGE,
  scrollToTopOnPageChange = true,
  headingLevel = 1,
}: DoctorsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeMode, setFadeMode] = useState<'in' | 'out'>('in');
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRafRef = useRef<number | null>(null);
  const timersRef = useRef<number[]>([]);

  const doctors = data?.doctors ?? [];

  // При экране <= 768px показываем по 6 врачей, иначе — переданное itemsPerPage
  const effectiveItemsPerPage = isMobile ? MOBILE_DOCTORS_PER_PAGE : itemsPerPage;

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // При смене effectiveItemsPerPage подправляем текущую страницу, чтобы не уйти в пустоту
  useEffect(() => {
    const maxPage = Math.ceil(doctors.length / effectiveItemsPerPage) || 1;
    setCurrentPage((prev) => Math.min(prev, maxPage));
  }, [effectiveItemsPerPage, doctors.length]);

  // Вычисляем количество страниц
  const totalPages = Math.ceil(doctors.length / effectiveItemsPerPage);

  // Получаем врачей для текущей страницы
  const startIndex = (currentPage - 1) * effectiveItemsPerPage;
  const endIndex = startIndex + effectiveItemsPerPage;
  const currentDoctors = doctors.slice(startIndex, endIndex);

  // Генерируем массив номеров страниц
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
      }
      for (const id of timersRef.current) {
        window.clearTimeout(id);
      }
      timersRef.current = [];
    };
  }, []);

  const clearTimers = () => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  };

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const smoothScrollTo = (targetY: number, durationMs: number) => {
    if (scrollRafRef.current !== null) {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    }

    const startY = window.scrollY || window.pageYOffset;
    const delta = targetY - startY;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const eased = easeInOutCubic(t);
      window.scrollTo(0, startY + delta * eased);

      if (t < 1) {
        scrollRafRef.current = requestAnimationFrame(step);
      } else {
        scrollRafRef.current = null;
      }
    };

    scrollRafRef.current = requestAnimationFrame(step);
  };

  const getSectionTop = () => {
    if (!sectionRef.current) return 0;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    return Math.max(0, rect.top + scrollTop);
  };

  const changePage = (newPage: number) => {
    // Проверяем валидность страницы ПЕРЕД всеми действиями
    if (newPage < 1 || newPage > totalPages) return;
    if (newPage === currentPage || isTransitioning) return;

    clearTimers();

    // Скролл и анимация стартуют одновременно и длятся одинаково.
    const half = Math.floor(TRANSITION_DURATION_MS / 2);
    setIsTransitioning(true);
    setFadeMode('out');

    // На некоторых страницах (например, отделения) скролл при пагинации не нужен.
    if (scrollToTopOnPageChange) {
      smoothScrollTo(getSectionTop(), TRANSITION_DURATION_MS);
    }

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

  // Обработчики сортировки (в будущем будут работать через бекенд, если не нужно - удалить)
  const handleSortByName = () => {
    // TODO: сортировка по ФИО через бекенд
  };

  const handleSortByDepartment = () => {
    // TODO: сортировка по отделению через бекенд
  };

  const handleSortByPosition = () => {
    // TODO: сортировка по должности через бекенд
  };

  const handleSortMore = () => {
    // TODO: дополнительные опции сортировки
  };

  if (!data || doctors.length === 0) return null;

  return (
    <section ref={sectionRef} className={`${styles.doctors} pt-25 pb-[3.125rem]`}>
      <Container>
        <div className={`flex items-end justify-between gap-5
          max-md:flex-col max-md:items-start max-md:justify-start
          `}>
          {/* Кнопки сортировки */}
          <div className={`flex gap-[4px] flex-wrap
            max-md:order-2
            max-md:mt-5
            `}>
            <button className={`sort-btn`} onClick={handleSortByName}>
              ФИО
            </button>
            <button className={`sort-btn`} onClick={handleSortByDepartment}>
              Отделение
            </button>
            <button className={`sort-btn`} onClick={handleSortByPosition}>
              Должность
            </button>
            <button className={`sort-btn`} onClick={handleSortMore}>
              Ещё...
            </button>
          </div>

          {/* Заголовок */}
          <Heading
            level={headingLevel} // SEO/семантика: h1 на странице /doctors, h2 внутри других страниц
            subtitle={data.heading.subtitle}
            title={data.heading.title}
          />
        </div>

        {/* Карточки врачей */}
        <div
          className={`${styles.doctorsGrid} mt-20 grid grid-cols-3 gap-5 ${fadeMode === 'out' ? styles.fadeOut : styles.fadeIn}
          max-md:grid-cols-2
          max-md:mt-10
          `}
          style={
            {
              '--fade-duration': `${Math.floor(TRANSITION_DURATION_MS / 2)}ms`,
            } as React.CSSProperties
          }
        >
          {currentDoctors.map(doctor => (
            <Doctor
              key={doctor.id}
              doctor={doctor}
              from={linkFrom?.href}
              fromLabel={linkFrom?.label}
            />
          ))}
        </div>

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className={`flex gap-[1.5625rem] max-w-full w-full justify-center items-center mt-20
          max-sm:mt-10
          `}>
            <button
              className={`${styles.btnPrev} ${styles.btn}`}
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.5 0C11.8645 0 0 11.8645 0 26.5C0 41.1355 11.8645 53 26.5 53C41.1355 53 53 41.1355 53 26.5C53 11.8645 41.1355 0 26.5 0ZM24.4238 15.6875C25.0487 15.0632 26.0609 15.0628 26.6855 15.6875C27.3102 16.3122 27.3099 17.3243 26.6855 17.9492L19.2344 25.4004H37.999C38.8826 25.4004 39.5995 26.1174 39.5996 27.001C39.5996 27.8846 38.8827 28.6016 37.999 28.6016H19.2344L26.6855 36.0527C27.31 36.6775 27.3101 37.6897 26.6855 38.3145C26.0608 38.9392 25.0487 38.939 24.4238 38.3145L14.2412 28.1318C13.6164 27.507 13.6164 26.495 14.2412 25.8701L24.4238 15.6875Z" fill="#ACD9CF" />
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
                <path d="M26.5 0C11.8645 0 0 11.8645 0 26.5C0 41.1355 11.8645 53 26.5 53C41.1355 53 53 41.1355 53 26.5C53 11.8645 41.1355 0 26.5 0ZM24.4238 15.6875C25.0487 15.0632 26.0609 15.0628 26.6855 15.6875C27.3102 16.3122 27.3099 17.3243 26.6855 17.9492L19.2344 25.4004H37.999C38.8826 25.4004 39.5995 26.1174 39.5996 27.001C39.5996 27.8846 38.8827 28.6016 37.999 28.6016H19.2344L26.6855 36.0527C27.31 36.6775 27.3101 37.6897 26.6855 38.3145C26.0608 38.9392 25.0487 38.939 24.4238 38.3145L14.2412 28.1318C13.6164 27.507 13.6164 26.495 14.2412 25.8701L24.4238 15.6875Z" fill="#ACD9CF" />
              </svg>
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}


