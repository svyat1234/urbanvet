'use client';

import styles from '@/blocks/Contacts.module.css';
import Container from '@/components/Container';
import Image from 'next/image';
import CtaButton from '@/components/CtaButton';
import { CONTACTS_BLOCK } from '@/lib/constants';
import telegramIcon from '@/assets/images/telegram.svg';

export default function Contacts() {
  const data = CONTACTS_BLOCK;

  return (
    <section className="pt-[6.25rem]">
      <Container className="flex gap-[20px] max-lg:flex-col">
        {/* Контент */}
        <div className="flex flex-col flex-1">
          <h2 className="section-sub text-center font-normal py-[0.71rem] px-6.75 border border-[#8E8E8E] rounded-4xl text-[0.875rem] leading-[70%] text-[#8E8E8E] uppercase w-fit">
            {data.heading}
          </h2>

          <div className="flex mt-[3.125rem] flex-1 justify-between items-end gap-[20px]
          max-xl:flex-col items-start justify-start
          ">
            <div className="flex items-end gap-[20px]
            max-2xl:flex-col max-2xl:items-start
            ">
              <div className="flex flex-col gap-[1.875rem]">
                <a
                  href={data.addressHref || '#'}
                  className="text-[1.5rem] max-w-[426px] leading-[120%]
                  max-2xl:max-w-[350px] max-2xl:text-[1.2rem]
                  "
                >
                  {data.address}
                </a>
                <div className="flex gap-[5px]">
                  <a href={`mailto:${data.email}`} className={styles.contactLink}>
                    {data.email}
                  </a>
                  <a href={`tel:${data.phone.replace(/\s/g, '')}`} className={styles.contactLink}>
                    {data.phone}
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-[12px]">
                <span>{data.socialPrompt}</span>
                <div className="flex items-center gap-[10px]">
                  {data.socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-label={link.label}
                      className={styles.socialLink}
                    >
                      <Image src={telegramIcon} alt="" fill />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <CtaButton href={data.cta.href} label={data.cta.label} />
          </div>

          {/* Карта */}
          <div className={`${styles.map}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <a
              href={data.map.link1.href}
              style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 0 }}
            >
              {data.map.link1.text}
            </a>
            <a
              href={data.map.link2.href}
              style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 14 }}
            >
              {data.map.link2.text}
            </a>
            <iframe
              src={data.map.iframeSrc}
              width={560}
              height={400}
              allowFullScreen
              style={{ position: 'relative' }}
              title={data.map.title}
            />
          </div>
        </div>

        {/* Изображение */}
        <div className="max-w-[788px] w-full relative min-h-[300px]
        max-[1860px]:max-w-[600px]
        max-[1660px]:max-w-[500px]
        max-lg:max-w-full max-lg:min-h-[400px]
        max-md:hidden
        ">
          <Image src={data.image} alt={data.imageAlt} fill className="object-cover" />
        </div>
      </Container>
    </section>
  );
}