import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import Blogs from '@/blocks/Blogs';

export default function BlogsPage() {
  return (
    <>
      <Header />
      <main>
        <Blogs />
      </main>
      <Footer />
    </>
  );
}