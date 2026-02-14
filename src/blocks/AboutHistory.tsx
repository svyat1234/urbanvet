'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AboutHistory.module.css';
import Container from '@/components/Container';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_PAGE } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const BONE_COLORS = ['#F2C1D5', '#E3E993', '#ACD9CF'] as const;

export default function AboutHistory() {
  const paragraphsRef = useRef<HTMLParagraphElement[]>([]);
  const [boneColorIndex, setBoneColorIndex] = useState(0);
  const boneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const paragraphs = paragraphsRef.current.filter(Boolean);
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      paragraphs.forEach((el) => el.style.setProperty('--reveal', '120%'));
      return () => {
        paragraphs.forEach((el) => el.style.removeProperty('--reveal'));
      };
    }

    paragraphs.forEach((paragraph) => {
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
    <section className='py-[9.375rem]
    max-sm:py-[3.125rem]
    '>
      <Container className='flex justify-between gap-[20px]
      max-md:flex-col max-md:gap-[40px]
      '>
        <span className='section-sub text-center py-[0.71rem] px-6.75 border border-[#8E8E8E] rounded-4xl font-[0.875rem] leading-[70%] text-[#8E8E8E] uppercase h-fit w-fit'>
          {ABOUT_PAGE.history.heading.subtitle}
        </span>

        <div className='max-w-[1161px] w-full relative
        max-2xl:max-w-[900px]
        max-xl:max-w-[700px]
        max-lg:max-w-[450px]
        max-md:max-w-full
        '>
          {/* Картинка кости */}
          <div
            ref={boneRef}
            className="w-[107px] h-auto absolute left-[15.1875rem] top-[2px] z-10
            max-xl:w-[80px] max-xl:top-0
            max-lg:left-[7rem] max-lg:-top-[2px]
            max-md:left-0
            "
            onMouseEnter={() => {
              setBoneColorIndex((prev) => (prev + 1) % BONE_COLORS.length);
              if (boneRef.current) {
                gsap.fromTo(
                  boneRef.current,
                  { y: 0 },
                  {
                    y: -8,
                    duration: 0.25,
                    ease: 'power1.out',
                    yoyo: true,
                    repeat: 1,
                  }
                );
              }
            }}
          > 
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 107 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.14244 3.97212C3.35371 2.47386 5.41287 1.01344 6.87397 0.612389C8.29722 0.218908 10.6592 0.0751358 12.1127 0.279443C13.5663 0.491318 16.1251 1.30855 17.7906 2.09551C19.4561 2.89004 22.6054 5.07689 28.7677 10.404H77.6801L80.519 7.87666C82.0785 6.49191 84.7206 4.44883 86.3861 3.34406C88.0516 2.23172 91.1176 0.945335 93.1995 0.476184C96.5532 -0.288078 97.3935 -0.197274 100.581 1.22531C103.556 2.5571 104.457 3.45756 105.774 6.43137C106.94 9.06467 107.228 10.7294 106.834 12.6741C106.539 14.127 105.819 16.2608 105.237 17.4035C104.328 19.1893 104.328 19.7795 105.237 21.5653C105.819 22.7079 106.531 24.8342 106.811 26.2946C107.159 28.1183 106.894 29.9797 105.941 32.2725C105.176 34.1037 103.533 36.3133 102.284 37.1835C100.634 38.3336 98.8773 38.7574 95.8492 38.7271C93.0935 38.712 90.5953 38.1369 88.468 37.0397C86.6965 36.1241 83.8046 34.028 78.8156 29.3744L28.7677 29.3214L24.4147 32.6433C22.0225 34.4745 18.9564 36.5176 17.6013 37.1835C16.2462 37.8569 13.8615 38.6136 12.302 38.8709C10.2504 39.2114 8.46377 38.8936 5.8671 37.7358C3.5354 36.6916 1.8699 35.3371 1.13557 33.8616C0.507221 32.613 0 30.0554 0 28.1864C0 26.3173 0.507221 23.5932 1.13557 22.1328C2.14244 19.7795 2.14244 19.1893 1.13557 16.8359C0.507221 15.3831 0 12.4849 0 10.404C0 7.37724 0.431515 6.09086 2.14244 3.97212Z"
                fill={BONE_COLORS[boneColorIndex]}
                style={{ transition: 'fill 0.4s ease' }}
              />
            </svg>
          </div>
          <div className='flex flex-col gap-[3.6875rem] relative
          max-md:gap-[2rem]
          '>
            {ABOUT_PAGE.history.description.map((text, index) => (
              <p
                key={index}
                ref={(el) => {
                  if (el) paragraphsRef.current[index] = el;
                }}
                className={`${styles.text} ${styles.textReveal} text-[3.125rem] font-[Circe] font-normal leading-[100%]
                max-2xl:text-[2.9rem]
                max-xl:text-[2rem]
                max-lg:text-[1.7rem]
                `}
                data-text={text}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}