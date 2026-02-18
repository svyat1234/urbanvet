'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '@/components/PageNav.module.css'
import Link from 'next/link';

export interface PageNavItem {
  label: string;
  href: string;
}

interface PageNavProps {
  /**
   * BACKEND:
   * Хлебные крошки лучше отдавать с CMS/API как массив { label, href }.
   * Тогда навигация будет "канонической", а не зависящей от того, откуда пришёл пользователь.
   */
  items?: PageNavItem[];
  /**
   * UI:
   * Если страница открыта напрямую и нет ни history, ни from, ни prevPath —
   * можно показать "дефолтную" крошку (например, "Врачи" -> /doctors).
   */
  defaultItems?: PageNavItem[];
  className?: string;
}

function guessLabelByHref(href: string) {
  if (href.startsWith('/departments/')) return 'Отделение';
  if (href.startsWith('/doctors')) return 'Врачи';
  if (href.startsWith('/news')) return 'Новости';
  return 'Назад';
}

export default function PageNav({ items, defaultItems, className }: PageNavProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // UI (frontend-only):
  // Можно прокидывать "откуда пришли" через query param (например, при клике по карточке):
  // `/doctors/[slug]?from=/departments/hirurgiya&fromLabel=Хирургия`
  // Это НЕ обязательно для работы: кнопка back всё равно использует history, а from — fallback.
  const from = searchParams.get('from') || '';
  const fromLabel = searchParams.get('fromLabel') || '';

  const derivedItems = useMemo<PageNavItem[]>(() => {
    if (items && items.length > 0) return items;
    if (!from) return [];

    // BACKEND:
    // Лучше, чтобы label приходил с бэка (или из справочника на фронте).
    // Здесь — фронтовый эвристический fallback.
    return [
      {
        label: fromLabel || guessLabelByHref(from),
        href: from,
      },
    ];
  }, [items, from, fromLabel]);

  const finalItems = derivedItems.length > 0 ? derivedItems : (defaultItems || []);

  const handleBack = useCallback(() => {
    // UI:
    // 1) Пытаемся вернуться через history (идеально отражает "откуда пришёл").
    // 2) Если history пуст (страница открыта в новом табе) — fallback:
    //    - ?from=
    //    - sessionStorage (NavigationTracker)
    //    - /
    try {
      if (window.history.length > 1) {
        router.back();
        return;
      }
    } catch {
      // ignore
    }

    const prevPath =
      from ||
      (() => {
        try {
          return sessionStorage.getItem('uv:prevPath') || '';
        } catch {
          return '';
        }
      })();

    router.push(prevPath || '/');
  }, [router, from]);

  return (
    <div className={`flex items-center gap-[10px] flex-wrap ${className || ''}`}>
      <button type="button" onClick={handleBack} aria-label="Назад" className={`${styles.back} h-[2.375rem]`}>
        <svg
          width="60"
          height="38"
          viewBox="0 0 60 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="59" height="37" rx="18.5" stroke="#1D1D1D" />
          <path
            d="M39.2153 18.5014C39.4914 18.5014 39.7153 18.7253 39.7152 19.0014C39.7152 19.2775 39.4914 19.5014 39.2152 19.5014L39.2152 19.0014L39.2153 18.5014ZM20.4302 19.3539C20.235 19.1587 20.235 18.8421 20.4303 18.6468L23.6124 15.465C23.8077 15.2698 24.1243 15.2698 24.3195 15.465C24.5148 15.6603 24.5147 15.9769 24.3195 16.1722L21.4909 19.0004L24.3192 21.829C24.5144 22.0243 24.5144 22.3409 24.3191 22.5361C24.1239 22.7314 23.8073 22.7314 23.612 22.5361L20.4302 19.3539ZM39.2152 19.0014L39.2152 19.5014L20.7838 19.5004L20.7838 19.0004L20.7838 18.5004L39.2153 18.5014L39.2152 19.0014Z"
            fill="#1D1D1D"
          />
        </svg>
      </button>

      {finalItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${styles.link} h-[2.375rem] flex items-center px-[1.875rem] border border-[#1D1D1D] rounded-[100px]`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

