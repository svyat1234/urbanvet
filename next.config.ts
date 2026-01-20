import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Для GitHub Pages: если репозиторий не в корне (username.github.io),
  // а в подпапке (username.github.io/repo-name), раскомментируй и укажи название репозитория:
  // basePath: '/urbanvet',
  // assetPrefix: '/urbanvet',
  
  // Статический экспорт для GitHub Pages
  output: 'export',
  
  // Отключаем оптимизацию изображений (GitHub Pages не поддерживает)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
