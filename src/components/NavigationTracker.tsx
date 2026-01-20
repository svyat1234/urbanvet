'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * UI:
 * Нужен как fallback для кнопки "Назад", когда страница открыта в новом табе
 * и в history браузера нет предыдущей записи.
 *
 * BACKEND:
 * Это НЕ "хлебные крошки". Крошки (иерархия сайта) лучше отдавать с CMS/API.
 * Этот трекер хранит только "предыдущий посещённый путь" на фронте.
 */
export default function NavigationTracker() {
  const pathname = usePathname();
  const hasInitRef = useRef(false);

  useEffect(() => {
    try {
      // Важно: используем только pathname без query (для простоты/стабильности).
      const LAST_KEY = 'uv:lastPath';
      const PREV_KEY = 'uv:prevPath';

      const last = sessionStorage.getItem(LAST_KEY);

      // На первом рендере мы просто фиксируем текущий путь как lastPath.
      // prevPath появится только после первой навигации внутри SPA.
      if (!hasInitRef.current) {
        hasInitRef.current = true;
        sessionStorage.setItem(LAST_KEY, pathname);
        return;
      }

      if (last && last !== pathname) {
        sessionStorage.setItem(PREV_KEY, last);
      }

      sessionStorage.setItem(LAST_KEY, pathname);
    } catch {
      // ignore
    }
  }, [pathname]);

  return null;
}

