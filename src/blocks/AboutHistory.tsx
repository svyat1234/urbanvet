'use client';

import { useEffect, useRef } from 'react';
import styles from './AboutHistory.module.css';
import Container from '@/components/Container';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutHistory() {
  const paragraphsRef = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const paragraphs = paragraphsRef.current;

    paragraphs.forEach((paragraph) => {
      if (!paragraph) return;

      gsap.fromTo(
        paragraph,
        { '--reveal': '0%' } as gsap.TweenVars,
        {
          '--reveal': '120%',
          ease: 'none',
          scrollTrigger: {
            trigger: paragraph,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1.2,
          },
        } as gsap.TweenVars
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className='py-[9.375rem]'>
      <Container className='flex justify-between gap-[20px]'>
        <span className='section-sub text-center py-[0.71rem] px-6.75 border border-[#8E8E8E] rounded-4xl font-[0.875rem] leading-[70%] text-[#8E8E8E] uppercase h-fit'>
          История основания
        </span>

        <div className='max-w-[1161px] w-full relative'>
          <div className='flex flex-col gap-[3.6875rem] relative'>
            <p
              ref={(el) => { if (el) paragraphsRef.current[0] = el; }}
              className={`${styles.text} ${styles.textReveal} text-[3.125rem] font-[Circe] font-normal leading-[100%]`}
              data-text="Мы используем современное оборудование и работаем с командой 120 опытных ветеринарных хирургов."
            >
              Мы используем современное оборудование и работаем с командой 120 опытных ветеринарных хирургов.
            </p>

            <p
              ref={(el) => { if (el) paragraphsRef.current[1] = el; }}
              className={`${styles.text} ${styles.textReveal} text-[3.125rem] font-[Circe] font-normal leading-[100%]`}
              data-text="Наше отделение включает операционную что то сюдас анестезиологическим и реанимационным ля ля ля оснащением возможно дописать интереснее."
            >
              Наше отделение включает операционную что то сюдас анестезиологическим и реанимационным ля ля ля оснащением возможно дописать интереснее.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}