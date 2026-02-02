import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import Hero from '@/blocks/Hero'
import Stats from '@/blocks/Stats';
import About from '@/blocks/About';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero/>
        <Stats/>
        <About/>
      </main>
      <Footer />
    </>
  );
}
