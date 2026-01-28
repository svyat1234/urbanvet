import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import AboutHero from '@/blocks/AboutHero';
import AboutStat from '@/blocks/AboutStat';
import AboutInfo from '@/blocks/AboutInfo';
import AboutHistory from '@/blocks/AboutHistory';
import Gallery from '@/blocks/Gallery';
export default function AboutePage() {
  return (
    <>
      <Header />
      <AboutHero/>
      <AboutStat/>
      <AboutInfo/>
      <AboutHistory/>
      <Gallery/>
      <Footer />
    </>
  );
}