import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import Doctors from '@/blocks/Doctors';
import Appointmemt from '@/blocks/Appointment';
import { DOCTORS_PAGE_DATA } from '@/lib/constants';

export default function DoctorsPage() {
  // В будущем здесь будет:
  // const pageData = await fetchPageData('doctors');
  
  const pageData = DOCTORS_PAGE_DATA;

  return (
    <>
      <Header />
      <Doctors data={pageData} />
      <Appointmemt/>
      <Footer/>
    </>
  );
}

