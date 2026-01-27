import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import AboutHero from '@/blocks/AboutHero';
import AboutStat from '@/blocks/AboutStat';
import AboutInfo from '@/blocks/AboutInfo';
export default function AboutePage() {
  return (
    <>
      <Header />
      <AboutHero/>
      <AboutStat/>
      <AboutInfo/>
      <Footer />
    </>
  );
}