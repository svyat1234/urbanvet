'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
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

  // Карточка врача
  return (
    <a 
      // BACKEND: ссылка на страницу врача.
      // Когда API начнёт отдавать `doctor.slug`, URL останется тем же.
      href={getDoctorHref(doctor, { from, fromLabel })}
      className={`${styles.card} ${className || ''} relative flex flex-col justify-between p-[3.25rem]`}
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
      <span className={`flex flex-col gap-[0.3125rem]`}>
        <span className={`py-[0.875rem] px-[1.875rem] text-[0.875rem] leading-[90%] text-[#1D1D1D] font-medium bg-[#ffffff] rounded-4xl w-fit`}>{experience}</span>
        <span className={`py-[0.875rem] px-[1.875rem] border border-[#ffffff] rounded-4xl font-[0.875rem] leading-[90%] text-[#ffffff] w-fit backdrop-blur-[34px]`}>{position}</span>
      </span>

      {/* Имя врача */}
      <h3 className={`font-["Circe"] font-bold text-[2.5rem] leading-[90%] text-[#ffffff]`}>{name}</h3>
    </a>
  );
}
