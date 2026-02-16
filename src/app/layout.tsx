import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationTracker from "@/components/NavigationTracker";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const circe = localFont({
  src: [
    {
      path: "../../public/fonts/circe/Circe-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/circe/Circe-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/circe/Circe-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/circe/Circe-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/circe/Circe-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-circe",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UrbanVet - Ветеринарная клиника",
  description: "Ветеринарная клиника UrbanVet",
};

// Только для GitHub Pages (production): пути к картинкам из CSS, иначе 404 на /images/...
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/urbanvet' : '';
const imageVars =
  BASE_PATH &&
  ({
    ['--url-hero-bird' as string]: `url('${BASE_PATH}/images/hero-bird.svg')`,
    ['--url-hero-laps' as string]: `url('${BASE_PATH}/images/hero-laps.svg')`,
    ['--url-about-stars' as string]: `url('${BASE_PATH}/images/about-stars.png')`,
    ['--url-lightning' as string]: `url('${BASE_PATH}/images/lightning.png')`,
  } as React.CSSProperties);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${circe.variable} font-sans antialiased`}
        {...(imageVars ? { style: imageVars } : {})}
      >
        {/* UI: трекаем предыдущий путь для fallback кнопки "Назад" на некоторых страницах (например, врач/новость). */}
        <NavigationTracker />
        {children}
      </body>
    </html>
  );
}
