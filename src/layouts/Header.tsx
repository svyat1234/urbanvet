'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import Container from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { BASE_PATH } from '@/lib/basePath';

const HEADER_INFO = {
  clinicNameLine1: 'Ветеринарная клиника',
  clinicNameLine2: 'Фонда защиты городских животных',
  address: 'м. Сокол и Панфиловская, Улица Врубеля, 8 (10:00—22:00)',
  addressHref: 'https://maps.app.goo.gl/fDZM6ajsEupTQVuo6',
  phone: '+7 (926) 711-18-44',
  socialLinks: [
    { href: '', icon: 'telegram' as const },
    { href: '', icon: 'whatsapp' as const },
  ],
} as const;

const HEADER_NAV_LINKS = [
  { href: '/promotions', label: 'Акции' },
  { href: '/doctors', label: 'Врачи' },
  { href: '/vacancies', label: 'Вакансии' },
  { href: '#', label: 'База знаний' },
  { href: '#', label: 'Новости' },
] as const;

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSearchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchOpen]);

  return (
    <header className={`${styles.header} mt-6.75 mb-[3.125rem] h-19.25 relative`}>
      <Container className="flex items-center justify-between h-full border border-solid border-[#1D1D1D]">

        <div className={`min-w-46 flex items-center h-full justify-center
          max-md:min-w-39
          `}>
          <Link href="/" className="block w-[7.987rem]
          max-md:w-[6rem]
          ">
            <Image src={`${BASE_PATH}/images/logo.svg`} alt="Logo" width={100} height={100} className='w-full h-auto object-contain'/>
          </Link>
        </div>

        <div className={`${styles.info} flex items-center justify-between h-full max-w-full w-full border-l border-r border-solid border-[#1D1D1D] px-5
        max-xl:flex-col max-xl:items-start max-xl:justify-center max-xl:gap-2
        max-sm:hidden
        `}>
          <p className='text-[0.8125rem] font-medium leading-[100%] max-w-58.75'>
            {HEADER_INFO.clinicNameLine1} <br />
            {HEADER_INFO.clinicNameLine2}
          </p>
          <a
            href={HEADER_INFO.addressHref}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-[13.2rem] text-[0.8125rem] font-medium leading-[100%] text-right max-xl:text-left hover:opacity-70 transition-opacity"
          >
            {HEADER_INFO.address}
          </a>
        </div>

        <div className={`flex items-center max-w-[25.375rem] gap-[3.75rem] w-full h-full border-r border-solid border-[#1D1D1D] px-5
          max-2xl:max-w-[21rem] max-2xl:gap-[2rem]
          max-xl:gap-[1.5rem]
          max-lg:hidden
          `}>
          <div className={`flex gap-4`}>
            {HEADER_INFO.socialLinks.map((link) => (
              <a
                key={link.icon}
                href={link.href}
                style={{ backgroundImage: `url('${BASE_PATH}/images/${link.icon}.svg')` }}
                className="block w-[1.625rem] h-[1.625rem] bg-no-repeat bg-center bg-contain hover:opacity-50 transition-opacity duration-300"
              />
            ))}
          </div>
          <a href={`tel:${HEADER_INFO.phone.replace(/\s/g, '')}`} className={styles.phone}>
            {HEADER_INFO.phone}
          </a>
        </div>

        <div className="flex h-full">
          <div ref={searchWrapRef} className={`${styles.searchWrap} min-w-[5.1675rem] h-full flex items-center justify-center border-r border-solid border-[#1D1D1D] px-5`}>
            <button
              type="button"
              aria-label="Поиск"
              aria-expanded={isSearchOpen}
              style={{ backgroundImage: `url('${BASE_PATH}/images/search.svg')` }}
              className="block bg-no-repeat bg-center bg-contain w-[1.41rem] h-[1.41rem] hover:opacity-50 transition-opacity duration-300"
              onClick={() => setIsSearchOpen((v) => !v)}
            />
            {isSearchOpen && (
              <div className={styles.searchDropdown} onClick={(e) => e.stopPropagation()}>
                <div className={styles.searchInputWrap}>
                  <input
                    type="search"
                    placeholder="Поиск..."
                    className={styles.searchInput}
                    autoFocus
                    aria-label="Поле поиска"
                  />
                  <button
                    type="submit"
                    aria-label="Найти"
                    className={styles.searchSubmit}
                    style={{ backgroundImage: `url('${BASE_PATH}/images/search.svg')` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={`${styles.langWrap} min-w-[5.1675rem] flex items-center justify-center`}>
            <button
              type="button"
              aria-label="Открыть меню"
              style={{ backgroundImage: `url('${BASE_PATH}/images/burger-menu.svg')` }}
              className="block bg-no-repeat bg-center bg-contain w-[1.313rem] h-[1.063rem] hover:opacity-50 transition-opacity duration-300"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

        </div>


      </Container>

      {/* Модальное окно: открывается по бургеру, закрывается по клику на фон */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isModalOpen}
        aria-label="Меню"
        className={`${styles.modal} ${isModalOpen ? styles.modalOpen : ''}`}
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className={styles.modalPanel}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Закрыть меню"
            className={styles.modalClose}
            onClick={() => setIsModalOpen(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="max-w-80 flex flex-col items-start gap-10">
          
            <nav className='flex flex-col gap-5'>
              {HEADER_NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className='text-[1.5rem] hover:opacity-70 transition-all w-fit'
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className={`${styles.info} flex flex-col gap-3 items-start justify-between w-fit`}>
              <p className='text-[1rem] font-medium leading-[100%]'>
                {HEADER_INFO.clinicNameLine1} {HEADER_INFO.clinicNameLine2}
              </p>
              <a
                href={HEADER_INFO.addressHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[1rem] font-medium leading-[100%] hover:opacity-70 transition-opacity"
              >
                {HEADER_INFO.address}
              </a>
            </div>

            <div className={`flex items-center max-w-[25.375rem] gap-[3.75rem]`}>
              <div className="flex gap-4">
                {HEADER_INFO.socialLinks.map((link) => (
                  <a
                    key={link.icon}
                    href={link.href}
                    style={{ backgroundImage: `url('${BASE_PATH}/images/${link.icon}.svg')` }}
                    className="block w-[1.625rem] h-[1.625rem] bg-no-repeat bg-center bg-contain hover:opacity-50 transition-opacity duration-300"
                  />
                ))}
              </div>
              <a href={`tel:${HEADER_INFO.phone.replace(/\s/g, '')}`} className={styles.phone}>
                {HEADER_INFO.phone}
              </a>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

 