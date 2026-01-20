import type { Doctor } from '@/lib/constants';

export interface DoctorHrefOptions {
  /**
   * UI:
   * "Откуда пришли" — фронтовый контекст (не каноническая иерархия сайта).
   * Используется для показа ссылки-крошки на странице врача и fallback-навигации.
   */
  from?: string;
  fromLabel?: string;
}

/**
 * BACKEND:
 * Не храним "готовые ссылки" на врача строками в разных местах UI.
 * Храним в данных врача стабильный идентификатор:
 * - `slug` (предпочтительно, человекочитаемый, уникальный)
 * - или `id` (fallback, если slug отсутствует)
 * А ссылку строим одной функцией — тогда при переходе на API не придётся переписывать компоненты.
 */
export function getDoctorHref(
  doctor: Pick<Doctor, 'id' | 'slug'>,
  opts?: DoctorHrefOptions,
): string {
  const slug = doctor.slug?.trim();
  const base = `/doctors/${slug && slug.length > 0 ? slug : String(doctor.id)}`;

  const from = opts?.from?.trim();
  const fromLabel = opts?.fromLabel?.trim();
  if (!from) return base;

  const params = new URLSearchParams();
  params.set('from', from);
  if (fromLabel) params.set('fromLabel', fromLabel);

  return `${base}?${params.toString()}`;
}

