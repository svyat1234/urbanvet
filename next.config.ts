import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Для GitHub Pages: репозиторий в подпапке (username.github.io/repo-name)
  // Включаем только в продакшене, чтобы не ломать локальную разработку на localhost:3000
  basePath: process.env.NODE_ENV === 'production' ? '/urbanvet' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/urbanvet' : '',
  
  // Статический экспорт для GitHub Pages
  output: 'export',

  // Обязательно для GitHub Pages: маршруты вида /promotions/id/ с index.html внутри,
  // иначе статический хостинг отдаёт 404 при прямом заходе на страницу акции/блога
  trailingSlash: true,
  
  // Отключаем оптимизацию изображений (GitHub Pages не поддерживает)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
