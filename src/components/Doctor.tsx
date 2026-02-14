'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Doctor.module.css';
import type { Doctor as DoctorType } from '@/lib/constants';
import { getNextColor } from '@/lib/colorUtils';
import { getDoctorHref } from '@/lib/routes';

interface DoctorProps {
  doctor: DoctorType;
  className?: string;
  /**
   * UI:
   * Контекст "откуда пришли", чтобы на странице врача можно было показать ссылку-крошку.
   * Пример: с отделения -> { from: '/departments/hirurgiya', fromLabel: 'Хирургия' }
   *
   * BACKEND:
   * Это не заменяет канонические хлебные крошки из CMS/API — это именно "история клика" пользователя.
   */
  from?: string;
  fromLabel?: string;
}

export default function Doctor({ 
  doctor,
  className,
  from,
  fromLabel,
}: DoctorProps) {
  const { name, position, experience, photo } = doctor;
  const [gradientColor, setGradientColor] = useState('');

  const handleMouseEnter = () => {
    const color = getNextColor();
    setGradientColor(color);
  };

  // Карточка врача. Link нужен для basePath (GitHub Pages: /urbanvet/).
  const href = getDoctorHref(doctor, { from, fromLabel });
  return (
    <Link
      href={href}
      className={`${styles.card} ${className || ''} relative flex flex-col justify-between p-[3.25rem]
      max-2xl:p-[3rem]
      max-xl:p-[1.5rem]
      max-lg:p-[1rem]
      max-sm:justify-end
      `}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      style={
        gradientColor
          ? ({ '--gradient-color': gradientColor } as CSSProperties)
          : undefined
      }
    >
      {/* Фото врача */}
      <span className={styles.imageWrapper}>
        <Image 
          src={photo} 
          alt={name}
          width={300}
          height={400}
          className={`w-full h-full object-cover`}
        />
      </span>

      {/* Градиент при наведении */}
      <span className={styles.gradient}></span>

      {/* Информация о враче */}
      <span className={`flex flex-col gap-[0.3125rem] max-sm:hidden`}>
        <span className={`py-[0.875rem] px-[1.875rem] text-[0.875rem] leading-[90%] text-[#1D1D1D] font-medium bg-[#ffffff] rounded-4xl w-fit
          max-lg:py-[0.6rem] max-lg:px-[1.3rem] max-lg:text-[0.6rem]
          `}>{experience}</span>
        <span className={`py-[0.875rem] px-[1.875rem] border border-[#ffffff] rounded-4xl font-[0.875rem] leading-[90%] text-[#ffffff] w-fit backdrop-blur-[34px]
          max-lg:py-[0.6rem] max-lg:px-[1.3rem] max-lg:text-[0.6rem]
          `}>{position}</span>
      </span>

      {/* Имя врача */}
      <h3 className={`font-["Circe"] font-bold text-[2.5rem] leading-[90%] text-[#ffffff]
        max-2xl:text-[2rem]
        max-lg:text-[1.5rem]
        max-sm:text-[1rem]
        `}>{name}</h3>
    </Link>
  );
}
