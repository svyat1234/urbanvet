import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import AboutHero from '@/blocks/AboutHero';
import AboutStat from '@/blocks/AboutStat';
import AboutInfo from '@/blocks/AboutInfo';
import AboutHistory from '@/blocks/AboutHistory';
export default function AboutePage() {
  return (
    <>
      <Header />
      <AboutHero/>
      <AboutStat/>
      <AboutInfo/>
      <AboutHistory/>
      <Footer />
    </>
  );
}