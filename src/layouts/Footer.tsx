import Image from 'next/image';
import styles from './Footer.module.css';
import Container from '@/components/Container';
import Link from 'next/link';
import telegramIcon from '@/assets/images/telegram.svg';

export default function Footer() {
  const navLinks = [
    { href: '/', label: 'Акции' },
    { href: '/', label: 'Услуги и врачи' },
    { href: '/', label: 'Врачи' },
    { href: '/', label: 'Вакансии' },
    { href: '/', label: 'База знаний' },
    { href: '/', label: 'Новости' },
  ];

  const socialLinksLeft = [
    { href: '', label: 'Telegram' },
    { href: '', label: 'WhatsApp' },
  ];

  const socialLinksRight = [
    { href: '', label: 'VK' },
    { href: '', label: 'YouTube' },
  ];

  const documentLinks = [
    { href: '#', label: 'Политика конфиденциальности' },
    { href: '#', label: 'Прайс-лист' },
    { href: '#', label: 'Договор оказания услуг' },
    { href: '#', label: 'Правила приема' },
  ];

  return (
    <footer className={`mt-[9.375rem] pt-[3.4375rem]
    max-md:mt-[5rem]
    `}>
        <Container className={`flex flex-col`}>
            <div className={`flex justify-between gap-10 w-full
              max-sm:flex-col max-sm:justify-start
              `}>

                <a href="https://yandex.ru/maps/-/CDqWeY0Y" className={`text-[0.9375rem] font-medium leading-[110%] max-w-[265px] transition-opacity duration-200 ease-in-out underline hover:opacity-70`}>
                    Москва, м. Сокол и Панфиловская, ул. Панфилова, 6Б (10:00–22:00)
                </a>
                <div className={`flex gap-[2.5rem] flex-wrap
                  max-lg:gap-x-[2rem] max-lg:gap-y-[1rem]
                  `}>
                    {navLinks.map((link) => (
                      <Link key={link.label} href={link.href} className={`${styles.link}`}>
                        {link.label}
                      </Link>
                    ))}
                </div>    

            </div>
            <div className={`flex items-center justify-between gap-[3.4375rem] mt-[3.75rem]
              max-md:gap-[2rem] max-md:mt-[2rem]
              max-sm:flex-col max-sm:items-start 
              `}>

                <div className={`flex gap-[5px] flex-wrap`}>
                    <a href="mailto:info@urbanvet.ru" className={`${styles.contactLink}`}>info@urbanvet.ru</a>
                    <a href="tel:+79267111844" className={`${styles.contactLink}`}>+7 (926) 711-18-44</a>
                </div>

                <div className={`flex items-center justify-between gap-[10px] flex-1
                  max-md:justify-start
                  `}>
                    <div className="flex items-center gap-[10px]">
                        {socialLinksLeft.map((link) => (
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
                    <div className="flex gap-[10px]">
                        {socialLinksRight.map((link) => (
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
            
            <div className={`mt-[4.375rem] py-10 border-t border-[#1d1d1d] flex justify-between gap-10
              max-sm:mt-[3rem]
              `}>
                <div className={`flex gap-10 items-center flex-wrap
                  max-lg:gap-y-5
                  max-sm:gap-y-2
                  `}>
                    {documentLinks.map((link) => (
                      <a key={link.label} href={link.href} className={`${styles.documentLink}`}>
                        {link.label}
                      </a>
                    ))}
                </div>
                <span className={`text-[0.8125rem] font-medium flex shrink-0`}>@UrbanVet, 2025</span>
            </div>
        </Container>
    </footer>
  );
}

