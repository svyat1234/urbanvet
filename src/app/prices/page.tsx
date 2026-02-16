import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import Prices from '@/blocks/Prices';

export default function VacanciesPage() {
    return (
      <>
        <Header />
        <main>
          <Prices />
        </main>
        <Footer />
      </>
    );
  }