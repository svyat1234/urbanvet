import styles from './Card.module.css';
import Image from 'next/image';
import Link from 'next/link';
import type { ServiceItem } from '@/lib/constants';

interface CardProps {
  data: ServiceItem;
  href?: string;
}

export default function Card({ data, href }: CardProps) {
  const hasImage = Boolean(data.image);
  const hasBgColor = Boolean(data.bgColor);
  const hasHoverBackground = hasImage || hasBgColor;
  const isInternal = href != null && href !== '#' && href.startsWith('/');
  const linkHref = href ?? '#';

  const className = `${styles.card} ${hasImage ? styles.cardWithImage : ''} relative flex flex-col justify-between p-[3.125rem] h-[374px] bg-white overflow-hidden`;

  const content = (
    <>
      {/* Фон-слой (появляется ТОЛЬКО при наведении/фокусе)
          Если не задан ни цвет, ни картинка — карточка остаётся белой */}
      {hasHoverBackground && (
        hasImage ? (
          <span className={styles.bgLayer}>
            <Image src={data.image!} alt={data.title} fill className={`object-cover`} />
          </span>
        ) : (
          <span className={styles.bgLayer} style={{ backgroundColor: data.bgColor }} />
        )
      )}

      {/* Теги. Первый статичный, дальше динамические */}
      <span className={`relative z-10 flex h-fit gap-[5px] items-center flex-wrap`}>
        <span className={`${styles.tag}`}>Теги</span>
        {data.tags.slice(0, 3).map((tag) => (
          <span key={tag} className={`${styles.tag}`}>
            {tag}
          </span>
        ))}
      </span>

      {/* Текст, заголовок и иконка */}
      <span className={`relative z-10 flex flex-col gap-[1.875rem]`}>
        <p className={`text-[0.9375rem] leading-[100%] max-w-[350px]`}>{data.description}</p>
        <span className={`flex justify-between`}>
          <h3 className={`font-[Circe] font-bold text-[2.5rem] leading-[90%] max-w-[350px]`}>{data.title}</h3>
          <span className={styles.icon}>
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M26.5 0C41.1355 0 53 11.8645 53 26.5C53 41.1355 41.1355 53 26.5 53C11.8645 53 0 41.1355 0 26.5C0 11.8645 11.8645 0 26.5 0ZM19.5996 17.4004C18.7161 17.4006 18 18.1165 18 19C18 19.8835 18.7161 20.5994 19.5996 20.5996H30.1367L16.8682 33.8682C16.2433 34.493 16.2433 35.507 16.8682 36.1318C17.493 36.7567 18.507 36.7567 19.1318 36.1318L32.4004 22.8633V33.4004C32.4006 34.2839 33.1165 35 34 35C34.8835 35 35.5994 34.2839 35.5996 33.4004V19C35.5996 18.1163 34.8837 17.4004 34 17.4004H19.5996Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </span>
      </span>
    </>
  );

  return isInternal ? (
    <Link href={linkHref} className={className}>
      {content}
    </Link>
  ) : (
    <a href={linkHref} className={className}>
      {content}
    </a>
  );
}