'use client';

import styles from './AboutInfo.module.css';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Image from 'next/image';
import { ABOUT_PAGE } from '@/lib/constants';

export default function AboutInfo() {
  return (
    <section className='py-[3.125rem] bg-[#F9F9F9]'>
      <Container className='flex gap-[20px] h-[425px] 
      max-xl:h-auto
      max-md:flex-col
      '>
      {/* Изображение */}
      <div className={`max-w-full w-full self-stretch relative
        max-xl:max-w-[40%]
        max-lg:max-w-[60%]
        max-md:max-w-full max-md:h-[300px]
        max-sm:h-[200px]
        `}>
          <Image
            src={ABOUT_PAGE.info.image}
            alt={ABOUT_PAGE.info.imageAlt}
            fill
            className="w-full h-full object-cover"
          />
      </div>

        {/* Контент */}
        <div className={`flex flex-col gap-[3.125rem] max-w-[797px] w-full
          max-xl:gap-[2rem]
          max-lg:max-w-[40%] max-lg:gap-[1.5rem]
          max-md:max-w-full max-md:p-0
          `}>
            <Heading
              subtitle={ABOUT_PAGE.info.heading.subtitle}
              title={ABOUT_PAGE.info.heading.title}
            />
            <div className='flex gap-[3.75rem] 
            max-2xl:gap-[2rem]
            max-lg:flex-col
            max-lg:gap-[1rem]
            '>
                {ABOUT_PAGE.info.description.map((paragraph, index) => (
                  <p key={index} className='text-[0.9375rem] leading-[120%] max-w-[369px] opacity-50 max-md:max-w-full'>
                    {paragraph}
                  </p>
                ))}
            </div>

        </div>
      </Container>
    </section>
  );
}

