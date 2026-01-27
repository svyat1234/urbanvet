'use client';

import styles from './AboutInfo.module.css';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Image from 'next/image';
import { ABOUT_PAGE } from '@/lib/constants';

export default function AboutInfo() {
  return (
    <section className='py-[3.125rem] bg-[#F9F9F9]'>
      <Container className='flex gap-[20px] h-[425px] '>
      <div className={`max-w-full w-full h-full relative`}>
          <Image
            src={ABOUT_PAGE.info.image}
            alt={ABOUT_PAGE.info.imageAlt}
            fill
            className="w-full h-full object-cover"
          />
        </div>

        <div className={`flex flex-col gap-[3.125rem] max-w-[797px] w-full`}>
            <Heading
              subtitle={ABOUT_PAGE.info.heading.subtitle}
              title={ABOUT_PAGE.info.heading.title}
            />
            <div className='flex gap-[3.75rem]'>
                {ABOUT_PAGE.info.description.map((paragraph, index) => (
                  <p key={index} className='text-[0.9375rem] leading-[120%] max-w-[369px] opacity-50'>
                    {paragraph}
                  </p>
                ))}
            </div>

        </div>
      </Container>
    </section>
  );
}

