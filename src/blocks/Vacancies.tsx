'use client';

import { useRef, useState } from 'react';
import styles from './Vacancies.module.css';
import Container from '@/components/Container';
import CtaButton from '@/components/CtaButton';
import Heading from '@/components/Heading';
import Image from 'next/image';
import { ABOUT_PAGE } from '@/lib/constants';

export default function Vacancies() {
  const { heading, vacancies } = ABOUT_PAGE.vacancies;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const vacancy = vacancies[selectedIndex];

  return (
    <section className="py-12.5">
      <Container>
        <div className="flex justify-between items-end gap-5
        max-lg:flex-col max-lg:items-start max-lg:justify-start
        ">
          {/* Кнопки вакансий — заголовок вакансии, привязаны к своей вакансии */}
          <div className="flex flex-wrap gap-1 max-lg:order-2">
            {vacancies.map((v, index) => (
              <button
                key={v.id}
                type="button"
                className={selectedIndex === index ? `${styles.sortBtnActive} sort-btn` : 'sort-btn'}
                onClick={() => {
                  setSelectedIndex(index);
                  contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {v.title}
              </button>
            ))}
          </div>

          {/* Оглавление секции */}
          <div className="max-w-[788px] w-full justify-start items-start
          max-2xl:max-w-[600px] 
          max-xl:max-w-[450px]
          ">
            <Heading className={`${styles.heading}`} subtitle={heading.subtitle} title={heading.title} />
          </div>
        </div>

        {/* Контент выбранной вакансии */}
        <div ref={contentRef} className="flex mt-[5.1875rem] p-[4.375rem] bg-[#F9F9F9] gap-5
        max-2xl:mt-[4rem]
        max-xl:p-[3rem] max-xl:mt-[3rem]
        max-lg:flex-col max-lg:mt-[2rem]
        max-md:p-[2rem]
        max-sm:p-[1rem]
        ">
          {/* Заголовок и картинка */}
          <div className="flex flex-col self-stretch justify-between gap-[5.125rem] max-w-[931px] w-full
          max-xl:gap-[3rem]
          max-lg:gap-[1rem]
          ">
            <h3 className="text-[3.75rem] font-[Circe] font-normal leading-[110%] uppercase max-w-[842px]
            max-2xl:text-[3.5rem]
            max-xl:text-[2.5rem]
            max-lg:text-[2rem]
            max-sm:text-[1.5rem]
            ">
              {vacancy.title}
            </h3>

            {/* Изображение */}
            <div className="relative w-full h-full
            max-lg:h-[400px]
            max-md:h-[300px]
            max-sm:h-[200px]
            ">
              <Image
                src={vacancy.image}
                alt={vacancy.title}
                className="object-cover"
                fill
              />
            </div>
          </div>

          {/* Текста */}
          <div className="flex flex-col justify-between bg-white px-[4.375rem] pt-[4.375rem] pb-[3.125rem] max-w-[727px] w-full text-[0.9375rem] min-h-[727px]
          max-xl:p-[2rem]
          max-lg:max-w-full max-lg:min-h-auto
          max-sm:px-[1rem] max-sm:py-[2rem]
          ">
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
            <CtaButton href={vacancy.applyCta.href} label={vacancy.applyCta.label} className={`${styles.link} mt-10`} />
          </div>
        </div>
      </Container>
    </section>
  );
}
