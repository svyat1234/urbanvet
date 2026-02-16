import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import Vacancies from '@/blocks/Vacancies';

export default function VacanciesPage() {
    return (
      <>
        <Header />
        <main>
          <Vacancies />
        </main>
        <Footer />
      </>
    );
  }