// Константа для basePath (должна совпадать с next.config.ts)
// Для GitHub Pages: если репозиторий в подпапке, укажи путь
// В режиме разработки basePath не нужен
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/urbanvet' : '';
