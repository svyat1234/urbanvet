import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import BlogHero from '@/blocks/BlogHero';
import BlogSection from '@/blocks/BlogSection';
import BlogsCompact from '@/blocks/BlogsCompact';
import Appointment from '@/blocks/Appointment';
import { BLOG_POSTS, BLOG_PAGES } from '@/lib/constants';
import { notFound } from 'next/navigation';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// BACKEND: для статического экспорта Next.js требует предгенерировать все возможные slug'и.
// Потом, когда будет API, можно будет генерировать страницы динамически или использовать ISR.
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  // BACKEND:
  // Сейчас статья ищется в моках `constants.ts`.
  // Потом заменить на запрос к API, например:
  // const post = await fetch(`/api/blogs/${slug}`).then(r => r.json());
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  // BACKEND:
  // Сейчас контент страницы блога берём из мок-структуры `BLOG_PAGES`.
  // Заголовок/изображение/теги остаются в `BLOG_POSTS`, чтобы не дублировать профиль.
  const pageData = BLOG_PAGES.pages[slug];

  // UI: если нет контента в моках — показываем базовый fallback, чтобы страница не ломалась.
  const heroContent =
    pageData?.hero
      ? { description: pageData.hero.description, cta: BLOG_PAGES.hero.cta }
      : {
          description: ['Описание появится позже.', 'Описание появится позже.'],
          cta: BLOG_PAGES.hero.cta,
        };

  return (
    <>
      <Header />
      <main>
        <BlogHero
        blogPost={post}
        content={heroContent}
        // Передаем breadcrumbs: Статьи / ФИО автора (врача)
        breadcrumbs={[
          { label: 'Статьи', href: '/blogs' },
          { label: post.author, href: '#' }
        ]}
      />

      {/* Секции статьи */}
      {post.content && post.content.map((section) => (
        <BlogSection key={section.id} section={section} />
      ))}

      <Appointment/>

      {/* Другие статьи блога (исключая текущую) */}
      <BlogsCompact
        excludeSlug={slug}
        customTitle="Другие статьи"
        customSubtitle="Статьи"
      />
      </main>
      <Footer />
    </>
  );
}