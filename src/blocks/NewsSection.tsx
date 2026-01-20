import Container from '@/components/Container';
import NewsCard from '@/components/NewsCard';
import FeaturedNewsCard from '@/components/FeaturedNewsCard';
import { NEWS } from '@/lib/constants';

export default function NewsSection() {
    // BACKEND: заменить на данные из API и сортировать/фильтровать на бэке.
    // Здесь — отображаем 4 последние новости.
    // В идеале: API уже отдаёт "latest 4" (сортировка/лимит на сервере), а фронт только рендерит.
    //
    // UI: карточки разделены на 2 компонента намеренно:
    // - `FeaturedNewsCard` — первая (самая свежая) новость, другая вёрстка + показываем excerpt и tag
    // - `NewsCard` — компактные карточки (без excerpt/tag), только то что нужно в сетке 3 колонки
    const latest = [...NEWS]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 4);

    const [featured, ...rest] = latest;

    return (
        <section className={`py-13 bg-[#F9F9F9]`}>
            <Container>
                <div className={`grid grid-cols-3 gap-5`}>
                    {featured && (
                      <div className={`col-span-3`}>
                        <FeaturedNewsCard data={featured} />
                      </div>
                    )}

                    {rest.map((item) => (
                      <NewsCard key={item.id} data={item} />
                    ))}
                </div>
            </Container>
        </section>
    )
}


