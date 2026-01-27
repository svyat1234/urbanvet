import doctor1 from '@/assets/images/doctors/doctor-1.jpg';
import doctor2 from '@/assets/images/doctors/doctor-2.jpg';
import doctor3 from '@/assets/images/doctors/doctor-3.jpg';
import doctor4 from '@/assets/images/doctors/doctor-4.jpg';
import doctor5 from '@/assets/images/doctors/doctor-5.jpg';
import doctor6 from '@/assets/images/doctors/doctor-6.jpg';
import doctor7 from '@/assets/images/doctors/doctor-7.jpg';
import doctor8 from '@/assets/images/doctors/doctor-8.jpg';
import doctor9 from '@/assets/images/doctors/doctor-9.jpg';
import departmentHero from '@/assets/images/department-hero.png';
import serviceImage1 from '@/assets/images/services-1.png';
import newsImage1 from '@/assets/images/news/news-1.png';
import blogImage1 from '@/assets/images/blogs/image-1.png';
import aboutHeroImage from '@/assets/images/about-hero.png';
import aboutInfoImage from '@/assets/images/about-info.png';
import type { StaticImageData } from 'next/image';

export interface Doctor {
  id: number;
  /**
   * BACKEND:
   * Уникальный slug для URL страницы врача `/doctors/[slug]`.
   * Если slug не задан (на моках/во время миграции) — используем `id` как fallback.
   */
  slug?: string;
  name: string;
  position: string;
  experience: string;
  services: string[];
  department: string;
  photo: string | StaticImageData;
}

// Независимые данные карточек (могут использоваться в разных местах)
export const DOCTORS: Doctor[] = [
  {
    id: 1,
    // BACKEND: slug для страницы врача `/doctors/[slug]` (уникальный).
    slug: 'visheva-anastasiya-yurevna-1',
    name: "Вишева Анастасия Юрьевна",
    position: "Терапевт",
    experience: "Опыт: 4 года",
    services: ["Терапия", "Диагностика", "Профилактика", "УЗИ", "Лаборатория", "Вакцинация"],
    department: "Терапевтическое отделение",
    photo: doctor1
  },
  {
    id: 2,
    // BACKEND: slug для страницы врача `/doctors/[slug]` (уникальный).
    slug: 'vlasov-aleksey-maksimovich-2',
    name: "Власов Алексей Максимович",
    position: "Хирург",
    experience: "Опыт: 5 лет",
    services: ["Хирургия", "Диагностика", "УЗИ", "Лаборатория", "Травматология", "Ортопедия"],
    department: "Хирургическое отделение",
    photo: doctor2
  },
  {
    id: 3,
    name: "Винорова Ирина Алексеевна",
    position: "Дерматолог",
    experience: "Опыт: 8 лет",
    services: ["Дерматология", "Диагностика", "Лаборатория", "Аллергология", "Трихология", "Профилактика"],
    department: "Дерматологическое отделение",
    photo: doctor3
  },
  {
    id: 4,
    name: "Вишева Анастасия Юрьевна",
    position: "Кардиолог",
    experience: "Опыт: 4 года",
    services: ["Кардиология", "ЭКГ", "УЗИ сердца"],
    department: "Кардиологическое отделение",
    photo: doctor4
  },
  {
    id: 5,
    name: "Власов Алексей Максимович",
    position: "Офтальмолог",
    experience: "Опыт: 5 лет",
    services: ["Офтальмология", "Микрохирургия глаза", "Диагностика зрения"],
    department: "Офтальмологическое отделение",
    photo: doctor5
  },
  {
    id: 6,
    name: "Винорова Ирина Алексеевна",
    position: "Стоматолог",
    experience: "Опыт: 8 лет",
    services: ["Стоматология", "Чистка зубов", "Удаление зубов"],
    department: "Стоматологическое отделение",
    photo: doctor6
  },
  {
    id: 7,
    name: "Вишева Анастасия Юрьевна",
    position: "Эндокринолог",
    experience: "Опыт: 4 года",
    services: ["Эндокринология", "Диабетология", "Гормональные нарушения"],
    department: "Эндокринологическое отделение",
    photo: doctor7
  },
  {
    id: 8,
    name: "Власов Алексей Максимович",
    position: "Онколог",
    experience: "Опыт: 5 лет",
    services: ["Онкология", "Химиотерапия", "Паллиативная помощь"],
    department: "Онкологическое отделение",
    photo: doctor8
  },
  {
    id: 9,
    name: "Винорова Ирина Алексеевна",
    position: "Онколог",
    experience: "Опыт: 5 лет",
    services: ["Онкология", "Химиотерапия", "Паллиативная помощь"],
    department: "Онкологическое отделение",
    photo: doctor9
  },
  {
    id: 10,
    name: "Винорова Ирина Алексеевна",
    position: "Онколог",
    experience: "Опыт: 5 лет",
    services: ["Онкология", "Химиотерапия", "Паллиативная помощь"],
    department: "Онкологическое отделение",
    photo: doctor9
  },
  {
    id: 11,
    name: "Белов Дмитрий Олегович",
    position: "Педиатр",
    experience: "Опыт: 6 лет",
    services: ["Педиатрия", "Детская терапия", "Вакцинация"],
    department: "Педиатрическое отделение",
    photo: doctor4
  },
  {
    id: 12,
    name: "Семенова Мария Аркадьевна",
    position: "Кардиолог",
    experience: "Опыт: 11 лет",
    services: ["Кардиология", "Стресс-тесты", "Мониторинг ЭКГ"],
    department: "Кардиологическое отделение",
    photo: doctor6
  },
  {
    id: 13,
    name: "Иванов Сергей Эдуардович",
    position: "Невролог",
    experience: "Опыт: 10 лет",
    services: ["Неврология", "Лечение мигрени", "Диагностика инсульта"],
    department: "Неврологическое отделение",
    photo: doctor7
  },
  {
    id: 14,
    name: "Полякова Анастасия Николаевна",
    position: "Дерматолог",
    experience: "Опыт: 8 лет",
    services: ["Дерматология", "Удаление новообразований", "Косметология"],
    department: "Дерматологическое отделение",
    photo: doctor1
  },
  {
    id: 15,
    name: "Алексеев Константин Григорьевич",
    position: "Хирург",
    experience: "Опыт: 18 лет",
    services: ["Хирургия", "Абдоминальные операции", "Миниинвазивная хирургия"],
    department: "Хирургическое отделение",
    photo: doctor2
  },
  {
    id: 16,
    name: "Петрова Любовь Васильевна",
    position: "Терапевт",
    experience: "Опыт: 13 лет",
    services: ["Терапия", "Диагностика", "Профилактика"],
    department: "Терапевтическое отделение",
    photo: doctor3
  },
  {
    id: 17,
    name: "Тихонов Роман Владимирович",
    position: "Уролог",
    experience: "Опыт: 9 лет",
    services: ["Урология", "Лечение простаты", "УЗИ органов мочеполовой системы"],
    department: "Урологическое отделение",
    photo: doctor4
  },
  {
    id: 18,
    name: "Гладкова Юлия Михайловна",
    position: "Гинеколог",
    experience: "Опыт: 7 лет",
    services: ["Гинекология", "Планирование семьи", "УЗИ малого таза"],
    department: "Гинекологическое отделение",
    photo: doctor5
  },
  {
    id: 19,
    name: "Иванова Елена Сергеевна",
    position: "Анестезиолог-реаниматолог",
    experience: "Опыт: 12 лет",
    services: ["Анестезиология", "Реанимация", "Мониторинг состояния"],
    department: "Анестезиология и реанимация",
    photo: doctor6
  },
  {
    id: 20,
    name: "Лебедев Павел Александрович",
    position: "Реабилитолог",
    experience: "Опыт: 4 года",
    services: ["Реабилитация", "Лечебная физкультура", "Массаж"],
    department: "Отделение реабилитации",
    photo: doctor7
  },
  {
    id: 21,
    name: "Мартынова Софья Владимировна",
    position: "Эндоскопист",
    experience: "Опыт: 9 лет",
    services: ["Эндоскопия", "Колоноскопия", "Биопсия"],
    department: "Эндоскопическое отделение",
    photo: doctor8
  },
  {
    id: 22,
    name: "Соколов Артём Сергеевич",
    position: "Физиотерапевт",
    experience: "Опыт: 5 лет",
    services: ["Физиотерапия", "Лечение токами", "Ультразвук"],
    department: "Физиотерапевтическое отделение",
    photo: doctor9
  },
  {
    id: 23,
    name: "Волкова Наталья Михайловна",
    position: "Психотерапевт",
    experience: "Опыт: 8 лет",
    services: ["Психотерапия", "Консультации", "Психологическая помощь"],
    department: "Психотерапевтическое отделение",
    photo: doctor1
  },
  {
    id: 24,
    name: "Гордеев Владимир Сергеевич",
    position: "Отоларинголог (ЛОР)",
    experience: "Опыт: 14 лет",
    services: ["ЛОР", "Аудиометрия", "Операции на ЛОР-органах"],
    department: "ЛОР-отделение",
    photo: doctor2
  },
  {
    id: 25,
    name: "Егоров Денис Андреевич",
    position: "Инфекционист",
    experience: "Опыт: 6 лет",
    services: ["Инфектология", "Вакцинация", "Профилактика инфекций"],
    department: "Инфекционное отделение",
    photo: doctor3
  },
  {
    // Добавили ещё одного врача для "Хирургического отделения" (по просьбе) — в конце массива.
    id: 26,
    name: "Кузнецов Артём Павлович",
    position: "Хирург",
    experience: "Опыт: 7 лет",
    services: ["Абдоминальная хирургия", "Операции мягких тканей", "Послеоперационное наблюдение"],
    department: "Хирургическое отделение",
    photo: doctor2
  },
  {
    // Добавили ещё одного врача для "Хирургического отделения" (по просьбе) — в конце массива.
    id: 27,
    name: "Кузнецов Артём Павлович",
    position: "Хирург",
    experience: "Опыт: 7 лет",
    services: ["Абдоминальная хирургия", "Операции мягких тканей", "Послеоперационное наблюдение"],
    department: "Хирургическое отделение",
    photo: doctor2
  }
];

// Данные страницы "Врачи"
export interface DoctorsPageData {
  heading: {
    subtitle: string;
    title: string;
  };
  doctors: Doctor[];
  // Здесь могут быть другие блоки страницы:
  // textBlock1: { title: string; content: string };
  // textBlock2: { title: string; content: string };
}

export const DOCTORS_PAGE_DATA: DoctorsPageData = {
  heading: {
    subtitle: 'Врачи',
    title: 'Наши специалисты'
  },
  doctors: DOCTORS
};

// -----------------------------
// Услуги (единый список)
// -----------------------------

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  /**
   * До 3-х тегов под карточку.
   * (Ограничение лучше валидировать на бэкенде/в CMS, а здесь держать простым.)
   */
  tags: string[];
  /**
   * Пока простой флаг.
   * Если дальше понадобятся скидки/периоды/условия — лучше заменить на объект `promo?: { ... }`.
   */
  isPromo: boolean;
  /**
   * Опционально: если у карточки есть изображение.
   * Если нет — можно показывать просто цвет/градиент.
   */
  image?: StaticImageData;
  /**
   * Цвет фона для карточки (используется, если `image` не задана).
   * BACKEND: можно отдавать с бэка как "theme"/"color", либо генерировать на фронте.
   */
  bgColor?: '#E3E993' | '#F2C1D5' | '#ACD9CF';
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'therapy-consultation',
    title: 'Приём терапевта',
    description: 'Осмотр, сбор анамнеза и план лечения для питомца.',
    tags: ['Терапия', 'Диагностика'],
    isPromo: false,
    bgColor: '#E3E993',
    image: serviceImage1,
  },
  {
    id: 'vaccination',
    title: 'Вакцинация',
    description: 'Плановая вакцинация с подбором схемы и отметкой в паспорте.',
    tags: ['Профилактика'],
    isPromo: true,
    bgColor: '#F2C1D5',
  },
  {
    id: 'ultrasound',
    title: 'УЗИ',
    description: 'Ультразвуковая диагностика органов брюшной полости.',
    tags: ['Диагностика', 'УЗИ'],
    isPromo: false,
    bgColor: '#ACD9CF',
    image: serviceImage1,
  },
  {
    id: 'surgery',
    title: 'Хирургия',
    description: 'Плановые и экстренные вмешательства, послеоперационное ведение.',
    tags: ['Хирургия'],
    isPromo: false,
    bgColor: '#F2C1D5',
  },
  {
    id: 'dentistry',
    title: 'Стоматология',
    description: 'Профессиональная чистка, лечение и удаление зубов.',
    tags: ['Стоматология'],
    isPromo: true,
    bgColor: '#E3E993',
    image: serviceImage1,
  },
  {
    id: 'lab-tests',
    title: 'Анализы',
    description: 'Базовые лабораторные исследования для точной диагностики.',
    tags: ['Лаборатория', 'Диагностика'],
    isPromo: false,
    bgColor: '#ACD9CF',
  },
  {
    id: '2',
    title: 'Анализы',
    description: 'Базовые лабораторные исследования для точной диагностики.',
    tags: ['Лаборатория', 'Диагностика'],
    isPromo: false,
    bgColor: '#ACD9CF',
  },
  {
    id: '3',
    title: 'Анализы',
    description: 'Базовые лабораторные исследования для точной диагностики.',
    tags: ['Лаборатория', 'Диагностика'],
    isPromo: false,
    bgColor: '#ACD9CF',
  },
  {
    id: '4',
    title: 'Анализы',
    description: 'Базовые лабораторные исследования для точной диагностики.',
    tags: ['Лаборатория', 'Диагностика'],
    isPromo: false,
    bgColor: '#ACD9CF',
  },
  {
    id: '5',
    title: 'Анализы',
    description: 'Базовые лабораторные исследования для точной диагностики.',
    tags: ['Лаборатория', 'Диагностика'],
    isPromo: false,
    bgColor: '#ACD9CF',
  },
  {
    id: '6',
    title: 'Анализы',
    description: 'Базовые лабораторные исследования для точной диагностики.',
    tags: ['Лаборатория', 'Диагностика'],
    isPromo: false,
    bgColor: '#ACD9CF',
  },
];

// -----------------------------
// Акции
// -----------------------------

export interface PromotionItem {
  id: string;
  title: string;
  description: string;
  /**
   * До 3-х тегов под карточку.
   */
  tags: string[];
  /**
   * Опционально: изображение акции.
   */
  image?: StaticImageData;
  /**
   * Цвет фона для карточки (используется, если `image` не задана).
   */
  bgColor?: '#E3E993' | '#F2C1D5' | '#ACD9CF';
  /**
   * Дата начала акции
   */
  startsAt?: string;
  /**
   * Дата окончания акции
   */
  expiresAt?: string;
  /**
   * Условия акции
   */
  conditions?: string[];
}

export const PROMOTIONS: PromotionItem[] = [
  {
    id: 'vaccination-discount',
    title: 'Скидка 20% на вакцинацию',
    description: 'Плановая вакцинация со скидкой 20% для новых клиентов.',
    tags: ['Вакцинация', 'Скидка'],
    bgColor: '#E3E993',
    startsAt: '12.01.25',
    expiresAt: '25.01.25',
    conditions: ['Для студентов ВУЗов'],
  },
  {
    id: 'sterilization-promo',
    title: 'Акция на стерилизацию',
    description: 'Стерилизация котов и собак со скидкой до 30%.',
    tags: ['Хирургия', 'Стерилизация'],
    bgColor: '#F2C1D5',
    startsAt: '15.01.25',
    expiresAt: '28.01.25',
  },
  {
    id: 'complex-exam',
    title: 'Комплексный осмотр',
    description: 'Полный осмотр питомца с консультацией и рекомендациями.',
    tags: ['Диагностика', 'Осмотр'],
    bgColor: '#ACD9CF',
    startsAt: '10.01.25',
    expiresAt: '20.01.25',
    conditions: ['Для пенсионеров'],
  },
  {
    id: 'lab-tests-discount',
    title: 'Скидка на анализы',
    description: 'Лабораторные исследования со скидкой 15%.',
    tags: ['Лаборатория', 'Анализы'],
    bgColor: '#E3E993',
    startsAt: '18.01.25',
    expiresAt: '30.01.25',
  },
  {
    id: 'first-visit-free',
    title: 'Первичный приём бесплатно',
    description: 'Бесплатная консультация для новых клиентов.',
    tags: ['Консультация', 'Бесплатно'],
    bgColor: '#F2C1D5',
    startsAt: '01.01.25',
    expiresAt: '15.01.25',
    conditions: ['Только для новых клиентов'],
  },
  {
    id: 'dental-care',
    title: 'Уход за зубами',
    description: 'Профессиональная чистка зубов со скидкой 25%.',
    tags: ['Стоматология', 'Уход'],
    bgColor: '#ACD9CF',
    startsAt: '20.01.25',
    expiresAt: '05.02.25',
  },
];

export interface CardsSectionData<TItem> {
  heading: {
    title: string;
    subtitle: string;
  };
  items: TItem[];
}

// -----------------------------
// Новости
// -----------------------------

export interface NewsItem {
  id: string;
  /**
   * Для будущей страницы новости: `/news/[slug]`
   */
  slug: string;
  title: string;
  excerpt: string;
  /**
   * ISO строка, чтобы удобно сортировать/фильтровать.
   * UI форматируем на фронте.
   */
  publishedAt: string;
  tag: string;
  image: StaticImageData;
  /**
   * Задел под будущую страницу новости (потом можно расширять: блоки, seo, галерея и т.д.).
   */
  content?: {
    subtitle?: string;
    body?: string[];
  };
}

// BACKEND: в будущем заменить на данные из API (например, `/api/news`).
// Варианты интеграции:
// - общий список новостей для всего сайта
// - либо endpoint вида `/api/departments/:slug/news` (тогда новости фильтруются по отделению на бэке)
// - либо общий список + фильтрация на фронте по `tag`/`departmentId`
export const NEWS: NewsItem[] = [
  {
    id: 'news-1',
    slug: 'novye-chasy-priyoma',
    title: 'Новые часы приёма',
    excerpt: 'Расширили расписание: теперь принимаем пациентов и в вечерние часы.',
    publishedAt: '2026-01-12',
    tag: 'Терапия',
    image: newsImage1,
    content: {
      subtitle: 'Обновили график работы',
      body: ['Мы добавили вечерние окна записи для вашего удобства.', 'Записаться можно по телефону или через форму на сайте.'],
    },
  },
  {
    id: 'news-2',
    slug: 'profilaktika-posle-operatsii',
    title: 'Памятка после операции твоего пса для операции',
    excerpt: 'Собрали короткие правила ухода, чтобы восстановление прошло спокойно.',
    publishedAt: '2026-01-10',
    tag: 'Хирургия',
    image: newsImage1,
    content: {
      subtitle: 'Как ухаживать за питомцем',
      body: ['Следите за швом и ограничьте активность.', 'При любых сомнениях — сразу пишите или звоните в клинику.'],
    },
  },
  {
    id: 'news-3',
    slug: 'den-vaktsinatsii',
    title: 'День вакцинации',
    excerpt: 'Проводим профилактический день с консультацией и подбором схемы.',
    publishedAt: '2026-01-08',
    tag: 'Профилактика',
    image: newsImage1,
  },
  {
    id: 'news-4',
    slug: 'urologiya-kogda-nuzhno',
    title: 'Когда нужна урология',
    excerpt: 'На что обратить внимание: симптомы, которые нельзя игнорировать.',
    publishedAt: '2026-01-06',
    tag: 'Урология',
    image: newsImage1,
  },
  {
    id: 'news-5',
    slug: 'kak-podgotovit-k-uzi',
    title: 'Подготовка к УЗИ',
    excerpt: 'Несколько простых шагов, чтобы обследование было точным.',
    publishedAt: '2026-01-04',
    tag: 'Диагностика',
    image: newsImage1,
  },
  {
    id: 'news-6',
    slug: 'stomatologiya-profilaktika',
    title: 'Профилактика зубов',
    excerpt: 'Почему чистка важна и как понять, что пора на осмотр.',
    publishedAt: '2026-01-03',
    tag: 'Стоматология',
    image: newsImage1,
  },
  {
    id: 'news-7',
    slug: 'mini-chek-list-dlya-doma',
    title: 'Мини-чек-лист для дома',
    excerpt: 'Что держать в аптечке и как быстро оценить состояние питомца.',
    publishedAt: '2026-01-01',
    tag: 'Полезное',
    image: newsImage1,
  },
];

// -----------------------------
// Блог
// -----------------------------

export interface BlogPost {
  id: string;
  /**
   * Для страницы статьи: `/blog/[slug]`
   */
  slug: string;
  title: string;
  excerpt: string;
  /**
   * ISO строка (YYYY-MM-DD)
   */
  publishedAt: string;
  /**
   * Тэги (может быть несколько)
   */
  tags: string[];
  image: StaticImageData;
  /**
   * Контент статьи (будет много со временем)
   */
  content?: ArticleSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'kak-ponyat-chto-pet-boleet',
    title: 'Как понять, что ваш питомец приболел?',
    excerpt: 'Основные признаки недомогания, на которые стоит обратить внимание каждому владельцу.',
    publishedAt: '2026-01-15',
    tags: ['Здоровье', 'Советы'],
    image: blogImage1,
    // BACKEND: Массив секций статьи. Каждая секция содержит заголовок/подзаголовок и блоки контента.
    // Структура позволяет гибко управлять контентом через CMS:
    // - title/subtitle: заголовки секции (рендерятся через Heading компонент)
    // - blocks: массив блоков контента разных типов (paragraph, list, image и т.д.)
    // - Каждый блок имеет type, content и опциональные className/alt/level
    content: [
      {
        // BACKEND: Секция с заголовком "Почему важно вовремя замечать недомогания" и подзаголовком "Введение"
        id: 'intro-section',
        title: 'Почему важно вовремя замечать недомогания',
        subtitle: 'Введение',
        blocks: [
          {
            // BACKEND: Простой текстовый абзац
            type: 'paragraph',
            content: 'Здоровье вашего питомца напрямую зависит от того, насколько внимательно вы относитесь к его поведению и внешнему виду. Многие проблемы можно предотвратить или вылечить на ранней стадии, если вовремя заметить тревожные сигналы.',
            className: 'mb-6'
          },
          {
            // BACKEND: Маркированный список. content - массив строк
            type: 'bullet-list',
            content: [
              'Регулярные осмотры помогают поддерживать здоровье питомца',
              'Раннее обнаружение проблем снижает стоимость лечения',
              'Профилактика лучше, чем лечение'
            ]
          }
        ]
      },
      {
        // BACKEND: Вторая секция статьи с заголовком и подзаголовком
        id: 'symptoms-section',
        title: 'Основные признаки недомогания',
        subtitle: 'Что должно насторожить',
        blocks: [
          {
            // BACKEND: Заголовок внутри секции (h4 по умолчанию, можно указать level)
            type: 'heading',
            content: 'Изменения в поведении',
            level: 4
          },
          {
            // BACKEND: Нумерованный список с описаниями после каждого пункта
            type: 'list',
            content: [
              {
                text: 'Вялость и апатия - питомец стал меньше двигаться',
                description: 'Вы могли часто замечать, что ваш питомец стал менее активным и предпочитает проводить больше времени в спокойствии. Это может быть признаком различных заболеваний или просто возрастных изменений.'
              },
              {
                text: 'Изменение аппетита - отказ от еды или наоборот повышенный интерес к пище',
                description: 'Изменения в аппетите могут свидетельствовать о проблемах с пищеварением, зубами или даже о гормональных нарушениях. Важно следить за этими изменениями и своевременно обращаться к ветеринару.'
              },
              {
                text: 'Чрезмерная сонливость или бессонница',
                description: 'Нарушения сна могут быть вызваны стрессом, болевыми ощущениями или гормональными изменениями. Если ваш питомец спит значительно больше или меньше обычного, это повод для беспокойства.'
              }
            ]
          },
          {
            // BACKEND: Изображение. content - путь к картинке, alt - описание для accessibility
            type: 'image',
            content: blogImage1,
            alt: 'Питомец на осмотре у ветеринара',
            className: 'my-8 rounded-lg'
          },
          {
            // BACKEND: Ещё один заголовок внутри секции
            type: 'heading',
            content: 'Физические изменения',
            level: 4
          },
          {
            // BACKEND: Маркированный список
            type: 'bullet-list',
            content: [
              'Изменение веса (резкая потеря или набор)',
              'Проблемы с шерстью - выпадение, тусклость',
              'Изменения в работе ЖКТ'
            ]
          },
          {
            // BACKEND: Заключительный абзац с дополнительными стилями
            type: 'paragraph',
            content: 'Если вы заметили хотя бы один из этих признаков, рекомендуется обратиться к ветеринару для профессиональной консультации. Не занимайтесь самолечением - это может навредить вашему питомцу.',
            className: 'mt-6'
          }
        ]
      }
    ],
  },
  {
    id: 'blog-2',
    slug: 'pravilnoe-pitanie-koshek',
    title: 'Правильное питание кошек: мифы и реальность',
    excerpt: 'Разбираемся, чем лучше кормить домашних кошек и каких продуктов стоит избегать.',
    publishedAt: '2026-01-10',
    tags: ['Питание', 'Кошки'],
    image: blogImage1,
    content: [
      {
        id: 'cat-food-section',
        blocks: [
          {
            type: 'paragraph',
            content: 'Сухой корм или натуралка?',
          },
          {
            type: 'paragraph',
            content: 'Вредные продукты для кошек...',
          }
        ]
      }
    ],
  },
  {
    id: 'blog-3',
    slug: 'stress-u-sobak-v-gorode',
    title: 'Стресс у собак в городской среде',
    excerpt: 'Как помочь собаке адаптироваться к шуму машин и большому количеству людей.',
    publishedAt: '2026-01-05',
    tags: ['Психология', 'Собаки'],
    image: blogImage1,
    content: [
      {
        id: 'dog-stress-section',
        blocks: [
          {
            type: 'paragraph',
            content: 'Признаки стресса у собак...',
          },
          {
            type: 'paragraph',
            content: 'Упражнения для расслабления...',
          }
        ]
      }
    ],
  },
  {
    id: 'blog-4',
    slug: 'podgotovka-k-pervomu-vizitu',
    title: 'Подготовка к первому визиту в клинику',
    excerpt: 'Что нужно взять с собой и как подготовить питомца к осмотру ветеринара.',
    publishedAt: '2026-01-01',
    tags: ['Клиника', 'Полезное'],
    image: blogImage1,
    content: [
      {
        id: 'clinic-visit-section',
        blocks: [
          {
            type: 'paragraph',
            content: 'Документы, которые могут понадобиться...',
          },
          {
            type: 'paragraph',
            content: 'Как перевозить питомца...',
          }
        ]
      }
    ],
  },
  {
    id: 'blog-5',
    slug: 'podgotovka-k-pervomu-vizituddd',
    title: 'Подготовка к первому визиту в клинику',
    excerpt: 'Что нужно взять с собой и как подготовить питомца к осмотру ветеринара.',
    publishedAt: '2026-01-01',
    tags: ['Клиника', 'Полезное'],
    image: blogImage1,
    content: [
      {
        id: 'clinic-prep-section',
        blocks: [
          {
            type: 'paragraph',
            content: 'Документы, которые могут понадобиться...',
          },
          {
            type: 'paragraph',
            content: 'Как перевозить питомца...',
          }
        ]
      }
    ],
  },
  {
    id: 'blog-6',
    slug: 'podgotovka-k-pervomu-vizituda',
    title: 'Подготовка к первому визиту в клинику',
    excerpt: 'Что нужно взять с собой и как подготовить питомца к осмотру ветеринара.',
    publishedAt: '2026-01-01',
    tags: ['Клиника', 'Полезное'],
    image: blogImage1,
    content: [
      {
        id: 'clinic-visit-tips',
        blocks: [
          {
            type: 'paragraph',
            content: 'Документы, которые могут понадобиться...',
          },
          {
            type: 'paragraph',
            content: 'Как перевозить питомца...',
          }
        ]
      }
    ],
  },
  {
    id: 'blog-7',
    slug: 'podgotovka-k-pervomu-vizitudasd',
    title: 'Подготовка к первому визиту в клинику',
    excerpt: 'Что нужно взять с собой и как подготовить питомца к осмотру ветеринара.',
    publishedAt: '2026-01-01',
    tags: ['Клиника', 'Полезное'],
    image: blogImage1,
    content: [
      {
        id: 'first-visit-prep',
        blocks: [
          {
            type: 'paragraph',
            content: 'Документы, которые могут понадобиться...',
          },
          {
            type: 'paragraph',
            content: 'Как перевозить питомца...',
          }
        ]
      }
    ],
  },
  {
    id: 'blog-8',
    slug: 'podgotovka-k-pervomu-vizituvcx',
    title: 'Подготовка к первому визиту в клинику',
    excerpt: 'Что нужно взять с собой и как подготовить питомца к осмотру ветеринара.',
    publishedAt: '2026-01-01',
    tags: ['Клиника', 'Полезное'],
    image: blogImage1,
    content: [
      {
        id: 'clinic-preparation',
        blocks: [
          {
            type: 'paragraph',
            content: 'Документы, которые могут понадобиться...',
          },
          {
            type: 'paragraph',
            content: 'Как перевозить питомца...',
          }
        ]
      }
    ],
  },
  {
    id: 'blog-9',
    slug: 'podgotovka-k-pervomu-vizituwer',
    title: 'Подготовка к первому визиту в клинику',
    excerpt: 'Что нужно взять с собой и как подготовить питомца к осмотру ветеринара.',
    publishedAt: '2026-01-01',
    tags: ['Клиника', 'Полезное'],
    image: blogImage1,
    content: [
      {
        id: 'vet-clinic-visit',
        blocks: [
          {
            type: 'paragraph',
            content: 'Документы, которые могут понадобиться...',
          },
          {
            type: 'paragraph',
            content: 'Как перевозить питомца...',
          }
        ]
      }
    ],
  },
  {
    id: 'blog-10',
    slug: 'podgotovka-k-pervomu-vizituhfg',
    title: 'Подготовка к первому визиту в клинику',
    excerpt: 'Что нужно взять с собой и как подготовить питомца к осмотру ветеринара.',
    publishedAt: '2026-01-01',
    tags: ['Клиника', 'Полезное'],
    image: blogImage1,
    content: [
      {
        id: 'clinic-visit-guide',
        blocks: [
          {
            type: 'paragraph',
            content: 'Документы, которые могут понадобиться...',
          },
          {
            type: 'paragraph',
            content: 'Как перевозить питомца...',
          }
        ]
      }
    ],
  },
];

// -----------------------------
// Страница блога (мок-данные)
// -----------------------------

export interface BlogHeroContent {
  /**
   * BACKEND:
   * Контент hero-блока на странице блога.
   * Заголовок и изображение блога НЕ дублируем здесь — берём из `BLOG_POSTS`.
   */
  description: string[];
  cta: {
    label: string;
    href: string;
  };
}

/**
 * Страница блога:
 * - общие данные секций (одинаковые для всех блогов)
 * - и персональные данные (например, тексты hero) по ключу блога.
 */
export interface BlogPagesData {
  hero: {
    cta: {
      label: string;
      href: string;
    };
  };
  pages: Record<
    string,
    {
      hero: {
        description: string[];
      };
    }
  >;
}

// BACKEND:
// В будущем это будет приходить с API, например `/api/blogs/:slug`,
// где в одном ответе будет и профиль блога, и контент блоков страницы.
/**
 * Секция статьи - универсальная структура для разных типов контента
 */
export interface ArticleSection {
  id: string;
  /**
   * Заголовок секции (опционально)
   */
  title?: string;
  /**
   * Подзаголовок секции (опционально)
   */
  subtitle?: string;
  /**
   * Массив блоков контента в этой секции
   */
  blocks: ContentBlock[];
}

/**
 * Элемент списка с опциональным описанием
 */
export interface ListItem {
  /**
   * Текст пункта списка
   */
  text: string;
  /**
   * Описание после пункта (опционально)
   */
  description?: string;
}

/**
 * Универсальный блок контента
 */
export interface ContentBlock {
  /**
   * Тип блока контента
   */
  type: 'paragraph' | 'list' | 'bullet-list' | 'image' | 'heading';
  /**
   * Содержимое блока
   * - для paragraph, heading: string
   * - для list, bullet-list: string[] | ListItem[]
   * - для image: string (URL изображения)
   */
  content: string | string[] | ListItem[];
  /**
   * Дополнительные CSS классы
   */
  className?: string;
  /**
   * Для изображений - alt текст
   */
  alt?: string;
  /**
   * Для заголовков - уровень (h1, h2, h3...)
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const BLOG_PAGES: BlogPagesData = {
  hero: {
    // UI: CTA одинаковый для всех страниц блога (не дублируем в каждом ключе).
    cta: {
      label: 'Читать далее',
      href: '#',
    },
  },
  pages: {
    // Ключ должен совпадать с `blogPost.slug`.
    'kak-ponyat-chto-pet-boleet': {
      hero: {
        description: [
          'В этой статье мы расскажем о ключевых признаках, которые помогут вам вовремя заметить проблемы со здоровьем у вашего питомца.',
          'Важно помнить, что раннее обращение к ветеринару может значительно улучшить прогноз лечения.',
        ],
      },
    },
    'pravilnoe-pitanie-koshek': {
      hero: {
        description: [
          'Правильное питание — основа здоровья вашей кошки. Разбираемся в мифах и реальности кошачьего рациона.',
          'Узнайте, какие продукты действительно полезны, а каких стоит избегать.',
        ],
      },
    },
    'stress-u-sobak-v-gorode': {
      hero: {
        description: [
          'Городская среда может быть стрессовой для собак. Узнайте, как помочь вашему питомцу адаптироваться.',
          'Практические советы по снижению стресса и созданию комфортной среды для собаки в городе.',
        ],
      },
    },
    'podgotovka-k-pervomu-vizitu': {
      hero: {
        description: [
          'Первый визит к ветеринару — важное событие. Подготовьтесь заранее, чтобы всё прошло гладко.',
          'Собрали список всего необходимого и рекомендации по подготовке питомца к осмотру.',
        ],
      },
    },
  },
};

// -----------------------------
// Данные страниц "Акции"
// -----------------------------

export interface PromotionHeroContent {
  description: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface AboutHeroData {
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  image: StaticImageData;
  imageAlt: string;
}

export interface AboutStatData {
  number: string;
  label: string;
}

export interface AboutInfoData {
  heading: {
    subtitle: string;
    title: string;
  };
  description: string[];
  image: StaticImageData;
  imageAlt: string;
}

export interface AboutPageData {
  hero: AboutHeroData;
  stats: AboutStatData[];
  info: AboutInfoData;
}

export interface PromotionPagesData {
  hero: {
    // UI: CTA одинаковый для всех страниц акций (не дублируем в каждом ключе).
    cta: {
      label: string;
      href: string;
    };
  };
  promotions: {
    heading: {
      subtitle: string;
      title: string;
    };
  };
  blogs: {
    heading: {
      subtitle: string;
      title: string;
    };
  };
  pages: Record<
    string,
    {
      hero: {
        description: string[];
      };
    }
  >;
}

export const PROMOTION_PAGES: PromotionPagesData = {
  hero: {
    // UI: CTA одинаковый для всех страниц акций (не дублируем в каждом ключе).
    cta: {
      label: 'Узнать подробнее',
      href: '#',
    },
  },
  promotions: {
    heading: {
      subtitle: 'АКЦИИ',
      title: 'подборка АКЦИЙ',
    },
  },
  blogs: {
    heading: {
      subtitle: 'блог',
      title: 'актуальное',
    },
  },
  pages: {
    // Ключ должен совпадать с `promotion.id`.
    'vaccination-discount': {
      hero: {
        description: [
          'Специальное предложение на вакцинацию для новых клиентов нашей клиники.',
          'Качественная вакцинация с использованием проверенных препаратов по доступным ценам.',
        ],
      },
    },
    'sterilization-promo': {
      hero: {
        description: [
          'Акционная цена на стерилизацию котов и собак с полным послеоперационным уходом.',
          'Современное оборудование и опытные хирурги гарантируют безопасность процедуры.',
        ],
      },
    },
    'complex-exam': {
      hero: {
        description: [
          'Комплексное обследование питомца включает осмотр, анализы и консультацию специалиста.',
          'Полная диагностика состояния здоровья вашего питомца для своевременного лечения.',
        ],
      },
    },
    'lab-tests-discount': {
      hero: {
        description: [
          'Лабораторные исследования по сниженным ценам для точной диагностики заболеваний.',
          'Современное оборудование и квалифицированные лаборанты обеспечивают точные результаты.',
        ],
      },
    },
    'first-visit-free': {
      hero: {
        description: [
          'Бесплатная первичная консультация для новых клиентов клиники.',
          'Возможность познакомиться с врачом и получить ответы на все вопросы по уходу за питомцем.',
        ],
      },
    },
    'dental-care': {
      hero: {
        description: [
          'Профессиональная чистка зубов и лечение стоматологических заболеваний.',
          'Предотвращение и лечение проблем с зубами и деснами у домашних животных.',
        ],
      },
    },
  },
};

// -----------------------------
// Данные страницы "О нас"
// -----------------------------

export const ABOUT_PAGE: AboutPageData = {
  hero: {
    title: 'здоровье питомца — спокойствие хозяина',
    description: 'Мы используем современное оборудование и работаем с командой опытных ветеринарных хирургов. Наше отделение включает операционную с анестезиологическим и реанимационным оснащением.',
    cta: {
      label: 'Записаться на приём',
      href: '#',
    },
    image: aboutHeroImage,
    imageAlt: 'Ветеринарная клиника Фонда защиты городских животных',
  },
  stats: [
    {
      number: '60000+',
      label: 'пациентов в год',
    },
    {
      number: '150',
      label: 'врачей',
    },
    {
      number: '17',
      label: 'отделений',
    },
    {
      number: '440+',
      label: 'персонала',
    },
  ],
  info: {
    heading: {
      subtitle: 'О нас',
      title: 'Наша <br> миссия',
    },
    description: [
      'Мы используем современное оборудование и работаем с командой опытных ветеринарных хирургов. Наше отделение включает операционную с анестезиологическим и реанимационным оснащением.',
      'Хирурги проводят все виды операций, от плановой кастрации до остеосинтеза. Перед каждой операцией наши специалисты – хирург и анестезиолог – оценивают сложность вмешательства и степень риска.',
    ],
    image: aboutInfoImage,
    imageAlt: 'Ветеринарная клиника - наша миссия',
  },
};

// -----------------------------
// Данные страниц "Отделения"
// -----------------------------

export interface DepartmentHeroData {
  heading: {
    title: string;
    brandTitle: string;
  };
  /**
   * Первые 2 фото — статичные декоративные (как в макете).
   * Третье фото — фото профильного врача (заполняется данными).
   */
  staticDoctorPhotos: [StaticImageData, StaticImageData];
  featuredDoctor: {
    name: string;
    role: string;
    photo: StaticImageData;
  };
  heroImage: StaticImageData;
}

export interface DepartmentAboutData {
  heading: {
    title: string;
    subtitle: string;
  };
  description: string[];
  cards: {
    title: string;
    description: string;
  }[];
  image: StaticImageData;
  // Здесь можно добавить дополнительные поля:
  // description?: string;
  // image?: StaticImageData;
  // features?: string[];
  // etc.
}

export interface DepartmentPageData {
  slug: string;
  /**
   * BACKEND:
   * Короткое название для UI-навигации (исторические "крошки"/ссылка-возврат).
   * Пример: "Хирургия" вместо "Отделение хирургии".
   *
   * Важно: это не обязательно канонические крошки (иерархия сайта),
   * а именно короткий label, который фронт может передавать как `fromLabel`.
   *
   * Если не задано — используем fallback на `hero.heading.title`.
   */
  breadcrumbTitle?: string;
  hero: DepartmentHeroData;
  about?: DepartmentAboutData;
  /**
   * Секция "врачи" (переиспользуем блок `Doctors`).
   * BACKEND: позже заменить на данные из API (например, /departments/:slug/doctors).
   */
  doctors?: DoctorsPageData;
  /**
   * Временная фронтовая структура для "сетки карточек" на странице отделения.
   * BACKEND: позже заменить на данные из API (например, /departments/:slug/services).
   *
   * Важно: это не обязательно "услуги" — здесь может быть любой список (услуги/акции/документы),
   * главное, чтобы фронт получил `heading` и массив `items`.
   */
  services?: CardsSectionData<ServiceItem>;
  // Здесь позже можно добавить остальные блоки страницы отделения:
  // services?: ...
  // doctors?: ...
  // faq?: ...
}

export const DEPARTMENTS: Record<string, DepartmentPageData> = {
  hirurgiya: {
    slug: 'hirurgiya',
    breadcrumbTitle: 'Хирургия',
    hero: {
      heading: {
        title: 'Отделение хирургии',
        brandTitle: 'Urbanvet',
      },
      staticDoctorPhotos: [doctor1, doctor2],
      featuredDoctor: {
        name: 'Новиков Илья Владимирович',
        role: 'профильный специалист',
        photo: doctor3,
      },
      heroImage: departmentHero,
    },
    doctors: {
      heading: {
        title: 'Врачи отделения',
        subtitle: 'врачи',
      },
      // BACKEND: позже это будет список врачей, привязанных к отделению в CMS/БД.
      doctors: DOCTORS.filter(d => d.department === 'Хирургическое отделение'),
    },
    about: {
      heading: {
        title: 'Плановая и экстренная хирургия ',
        subtitle: 'о нас',
      },
      description: [
        'Плановая и экстренная хирургия — это комплексная медицинская помощь, которая включает в себя диагностику, лечение и реабилитацию заболеваний, связанных с нарушениями в работе различных систем организма. Наша команда специалистов готова предоставить вам высококвалифицированную помощь в кратчайшие сроки и обеспечить максимальный комфорт на протяжении всего лечения.',
        'Наша команда специалистов готова предоставить вам высококвалифицированную помощь в кратчайшие сроки и обеспечить максимальный комфорт на протяжении всего лечения.',
      ],
      cards: [
        {
          title: '124+',
          description: 'консультаций в год',
        },
        {
          title: '25+',
          description: 'лет опыта в хирургии',
        },
        {
          title: '10+',
          description: 'лет практики в хирургии',
        },
      ],
      image: departmentHero,
    },
    services: {
      heading: {
        title: 'Хирургические услуги',
        subtitle: 'услуги',
      },
      // BACKEND: тут сейчас используем общий список SERVICES.
      // Позже это будет "услуги конкретного отделения" (в идеале по связям в БД/CMS).
      items: SERVICES,
    },
  },
};

// ---------------------------
// Страница врача (мок-данные)
// ---------------------------

export interface DoctorHeroContent {
  /**
   * BACKEND:
   * Контент hero-блока на странице врача.
   * Имя и фото врача НЕ дублируем здесь — берём из `DOCTORS`.
   */
  description: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface DoctorPageData {
  /**
   * BACKEND:
   * Уникальный ключ страницы врача. Рекомендуем использовать `doctor.slug`.
   * На период миграции допускается хранить по `id` (строкой).
   */
  slug: string;
  hero: DoctorHeroContent;
}

/**
 * Страница врача:
 * - общие данные секций (одинаковые для всех врачей)
 * - и персональные данные (например, тексты hero) по ключу врача.
 */
export interface DoctorPagesData {
  hero: {
    cta: {
      label: string;
      href: string;
    };
  };
  services: {
    heading: {
      subtitle: string;
      title: string;
    };
  };
  otherDoctors: {
    heading: {
      subtitle: string;
      title: string;
    };
  };
  pages: Record<
    string,
    {
      hero: {
        description: string[];
      };
    }
  >;
  blogs: {
    heading: {
      subtitle: string;
      title: string;
    }
  }
}

// BACKEND:
// В будущем это будет приходить с API, например `/api/doctors/:slug`,
// где в одном ответе будет и профиль врача, и контент блоков страницы.
export const DOCTOR_PAGES: DoctorPagesData = {
  hero: {
    // UI: CTA одинаковый для всех страниц врача (не дублируем в каждом ключе).
    cta: {
      label: 'Записаться на приём',
      href: '#',
    },
  },
  services: {
    // UI: секция "Услуги врача" одинаковая для всех страниц врача.
    heading: {
      subtitle: 'услуги',
      title: 'услуги врача',
    },
  },
  otherDoctors: {
    // UI: секция "Другие врачи" одинаковая для всех страниц врача.
    heading: {
      subtitle: 'врачи',
      title: 'другие врачи',
    },
  },
  blogs: {
    heading: {
      subtitle: 'блог',
      title: 'актуальное',
    },
  },
  pages: {
    // Ключ должен совпадать с `doctor.slug` (или `id` как fallback).
    'visheva-anastasiya-yurevna-1': {
      hero: {
        description: [
          'Мы используем современное оборудование и работаем с командой опытных ветеринарных специалистов. Перед каждым приёмом оцениваем состояние питомца и составляем план обследования.',
          'На консультации вы получите понятные рекомендации, варианты лечения и ответы на вопросы по уходу, профилактике и питанию.',
        ],
      },
    },
    'vlasov-aleksey-maksimovich-2': {
      hero: {
        description: [
          'Хирурги проводят все виды операций, от плановой кастрации до сложных вмешательств. Перед операцией оцениваем риски и подбираем анестезиологическое сопровождение.',
          'После операции даём подробный план восстановления и сопровождаем пациента до полного выздоровления.',
        ],
      },
    },
  },
};

export interface BlogsPageData {
  services: {
    hero: {
      subtitle: string;
      title: string;
    };
  };
}