import React from 'react';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Image from 'next/image';
import type { ArticleSection, ContentBlock } from '@/lib/constants';
import styles from './BlogSection.module.css';

interface BlogSectionProps {
  section: ArticleSection;
  className?: string;
}

export default function BlogSection({ section, className }: BlogSectionProps) {
  return (
    <section className={`py-[3.125rem] ${className || ''}`}>
      <Container>
        {/* Заголовок секции */}
        {section.title && (
            <Heading
                title={section.title}
                subtitle={section.subtitle}
                level={2}
                className={`${styles.heading} mb-8`}
            />
            )}
        <div className='flex justify-end'>
            <div className="max-w-[50%] w-full">
                {/* Контент секции */}
                <div className={`${styles['blog-section']} space-y-6`}>
                {section.blocks.map((block, index) => (
                    <ContentBlockRenderer key={`${section.id}-${index}`} block={block} />
                ))}
                </div>
            </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Компонент для рендеринга отдельных блоков контента
 */
function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  const baseClasses = block.className || '';

  switch (block.type) {
    case 'paragraph':
      return (
        <p className={`text-lg leading-relaxed ${baseClasses}`}>
          {block.content as string}
        </p>
      );

    case 'heading':
      const level = block.level || 3;
      const HeadingTag = React.createElement(`h${level}`, {
        className: `font-[Circe] font-bold text-[1.25rem] mt-8 mb-4 text-[#1D1D1D] ${baseClasses}`
      }, block.content as string);
      return HeadingTag;

    case 'list':
      return (
        <ol className={`space-y-6 text-lg leading-relaxed ${baseClasses}`}>
          {(block.content as any[]).map((item, idx) => {
            // Проверяем, является ли элемент объектом ListItem или строкой
            const isListItem = typeof item === 'object' && item.text;
            const text = isListItem ? item.text : item;
            const description = isListItem ? item.description : null;

            return (
              <li key={idx} className="font-semibold text-lg">
                <span className="block mb-2">{text}</span>
                {description && (
                  <span className="block text-base font-normal text-gray-700 leading-relaxed mt-2">
                    {description}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      );

    case 'bullet-list':
      return (
        <ul className={`space-y-2 text-lg leading-relaxed ${baseClasses}`}>
          {(block.content as string[]).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );

    case 'image':
      return (
        <div className={`my-8 ${baseClasses}`}>
          <Image
            src={block.content as string}
            alt={block.alt || 'Изображение статьи'}
            width={800}
            height={400}
            className="w-full h-auto"
          />
        </div>
      );

    default:
      return (
        <div className={`text-red-500 ${baseClasses}`}>
          Неизвестный тип блока: {block.type}
        </div>
      );
  }
}