import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Для GitHub Pages: репозиторий в подпапке (username.github.io/repo-name)
  basePath: '/urbanvet',
  assetPrefix: '/urbanvet',
  
  // Статический экспорт для GitHub Pages
  output: 'export',
  
  // Отключаем оптимизацию изображений (GitHub Pages не поддерживает)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
