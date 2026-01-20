/**
 * BACKEND: `publishedAt` для новостей лучше отдавать в формате date-only `YYYY-MM-DD`
 * (или ISO datetime), но важно не ловить сдвиги даты из-за таймзоны.
 * Поэтому для карточек парсим строку как "date-only" и форматируем вручную.
 */

const RU_MONTHS_GENITIVE_CAP = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
] as const;

/**
 * Формат: `9 Июня 2025`
 */
export function formatRuDateLong(isoDate: string): string {
  // ожидаем `YYYY-MM-DD` (как в моках) — безопасно для таймзоны
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!m) return isoDate;

  const year = Number(m[1]);
  const month = Number(m[2]); // 1..12
  const day = Number(m[3]);

  const monthLabel = RU_MONTHS_GENITIVE_CAP[Math.min(12, Math.max(1, month)) - 1];
  return `${day} ${monthLabel} ${year}`;
}


