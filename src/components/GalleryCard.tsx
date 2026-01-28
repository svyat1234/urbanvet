'use client';

import styles from './GalleryCard.module.css';
import Image from 'next/image';
import { formatRuDateLong } from '@/lib/dateUtils';
import type { GalleryItem } from '@/lib/constants';

interface GalleryCardProps {
  item: GalleryItem;
  onClick?: () => void;
}

export default function GalleryCard({ item, onClick }: GalleryCardProps) {
  const formattedDate = formatRuDateLong(item.date);

  return (
    <article
      className='h-[564px] flex relative cursor-pointer'
      onClick={onClick}
    >
      <div className='flex flex-wrap gap-1 max-w-full h-[42px] absolute z-10 top-[1.875rem] left-[1.875rem]'>
        <span className='px-[1.875rem] h-full text-[0.875rem] bg-white flex items-center rounded-[100px]'>
          {formattedDate}
        </span>
          {item.tags.map((tag) => (
            <div
              key={tag}
              className="px-[1.25rem] h-full flex items-center border border-white rounded-[100px] text-white text-[0.75rem] ba"
            >
              {tag}
            </div>
          ))}
      </div>

      {/* Фоновое изображение */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
        <Image src={item.image} alt={item.tags.join(', ')} className={`object-cover ${styles.image ?? ''}`} fill />
      </div>
    </article>
  );
}