'use client';

import { useState } from 'react';
import styles from './Vacancies.module.css';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Image from 'next/image';
import { ABOUT_PAGE } from '@/lib/constants';

export default function Vacancies() {
  const { heading, vacancies } = ABOUT_PAGE.vacancies;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const vacancy = vacancies[selectedIndex];

  return (
    <section className="py-25">
      <Container>
        <div className="flex justify-between items-end gap-5">
          {/* Кнопки вакансий — заголовок вакансии, привязаны к своей вакансии */}
          <div className="flex flex-wrap gap-1">
            {vacancies.map((v, index) => (
              <button
                key={v.id}
                type="button"
                className={selectedIndex === index ? `${styles.sortBtnActive} sort-btn` : 'sort-btn'}
                onClick={() => setSelectedIndex(index)}
              >
                {v.title}
              </button>
            ))}
          </div>

          {/* Оглавление секции */}
          <div className="max-w-[788px] w-full justify-start items-start">
            <Heading className={`${styles.heading}`} subtitle={heading.subtitle} title={heading.title} />
          </div>
        </div>

        {/* Контент выбранной вакансии */}
        <div className="flex mt-[5.1875rem] p-[4.375rem] bg-[#F9F9F9] gap-5">
          {/* Заголовок и картинка */}
          <div className="flex flex-col self-stretch justify-between gap-[5.125rem] max-w-[931px] w-full">
            <h3 className="text-[3.75rem] font-normal leading-[110%] uppercase max-w-[842px]">
              {vacancy.title}
            </h3>

            <div className="relative w-full h-[558px]">
              <Image
                src={vacancy.image}
                alt={vacancy.title}
                className="object-cover"
                fill
              />
            </div>
          </div>

          {/* Текста */}
          <div className="flex flex-col flex-1 justify-between bg-white px-[4.375rem] pt-[4.375rem] pb-[3.125rem] max-w-[727px] w-full text-[0.9375rem]">
            <div className="flex flex-col opacity-50">
              {vacancy.email && (
                <span className="font-semibold mb-4">
                  Пишите на почту{' '}
                  <a href={`mailto:${vacancy.email}`}>{vacancy.email}</a>
                </span>
              )}

              <div className="flex flex-col mt-5 gap-5">
                <h4 className="font-bold">Обязанности:</h4>
                <ul className="flex flex-col gap-[5px] list-disc">
                  {vacancy.responsibilities.map((item, i) => (
                    <li key={i} className="ml-7">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col mt-5 gap-5">
                <h4 className="font-bold">Требования:</h4>
                <ul className="flex flex-col gap-[5px] list-disc">
                  {vacancy.requirements.map((item, i) => (
                    <li key={i} className="ml-7">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col mt-5 gap-5">
                <h4 className="font-bold">Условия:</h4>
                <ul className="flex flex-col gap-[5px] list-disc">
                  {vacancy.conditions.map((item, i) => (
                    <li key={i} className="ml-7">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {vacancy.disabilityNote && (
                <span className="font-bold mt-5">{vacancy.disabilityNote}</span>
              )}
            </div>

            {/* Кнопка отклика */}
            <a
              href={vacancy.applyCta.href}
              className={`${styles.link} flex items-center gap-1 h-[2.625rem]`}
            >
              <span className="text-[0.875rem] text-white font-medium bg-[#1D1D1D] flex items-center justify-center px-7.5 h-full rounded-[100px]">
                {vacancy.applyCta.label}
              </span>
              <svg height="100%" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 0C32.598 0 42 9.40202 42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21C0 9.40202 9.40202 0 21 0ZM13.7754 13.2051C12.9025 13.2051 12.1944 13.9123 12.1943 14.7852C12.1943 15.6581 12.9025 16.3662 13.7754 16.3662L24.1836 16.3652L13.668 26.8818C13.0507 27.4991 13.0507 28.5 13.668 29.1172C14.2852 29.7343 15.2851 29.7343 15.9023 29.1172L26.4189 18.6006V29.0098C26.4189 29.8827 27.1271 30.5908 28 30.5908C28.8728 30.5907 29.5801 29.8826 29.5801 29.0098V14.7852C29.5801 13.9124 28.8727 13.2053 28 13.2051H13.7754Z"
                  fill="#1D1D1D"
                />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
