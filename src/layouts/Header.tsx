import styles from './Header.module.css';
import Container from '@/components/Container';
import Image from 'next/image';
import { BASE_PATH } from '@/lib/basePath';

export default function Header() {
  return (
    <header className={`${styles.header} mt-6.75 mb-[3.125rem] h-19.25`}>
      <Container className="flex items-center justify-between h-full border border-solid border-[#1D1D1D]">
        <div className={` min-w-46 flex items-center h-full justify-center`}>
          <a href="/" className="block w-[7.987rem]">
            <Image src={`${BASE_PATH}/images/logo.svg`} alt="Logo" width={100} height={100} className='w-full h-auto object-contain'/>
          </a>
        </div>
        <div className={`${styles.info} flex items-center justify-between h-full max-w-full w-full border-l border-r border-solid border-[#1D1D1D] px-5`}>
          <p className='text-[0.8125rem] font-medium leading-[100%] max-w-58.75'>Ветеринарная клиника <br />
          Фонда защиты городских животных</p>
          <p className={`max-w-[13.2rem] text-[0.8125rem] font-medium leading-[100%] text-right`}>м. Сокол и Панфиловская, Улица Врубеля, 8 (10:00—22:00)</p>
        </div>
        <div className={`flex items-center max-w-[25.375rem] gap-[3.75rem] w-full h-full border-r border-solid border-[#1D1D1D] px-5`}>
          <div className={`flex gap-4`}>
            <a href="" style={{ backgroundImage: `url('${BASE_PATH}/images/telegram.svg')` }} className="block w-[1.625rem] h-[1.625rem] bg-no-repeat bg-center bg-contain hover:opacity-50 transition-opacity duration-300"></a>
            <a href="" style={{ backgroundImage: `url('${BASE_PATH}/images/whatsapp.svg')` }} className="block w-[1.625rem] h-[1.625rem] bg-no-repeat bg-center bg-contain hover:opacity-50 transition-opacity duration-300"></a>
          </div>
          <a href="tel:+79267111844" className={`${styles.phone}`}>+7 (926) 711-18-44</a>
        </div>
        <div className={`${styles.searchWrap} min-w-[5.1675rem] h-full flex items-center justify-center border-r border-solid border-[#1D1D1D] px-5`}>
          <button style={{ backgroundImage: `url('${BASE_PATH}/images/search.svg')` }} className={`block bg-no-repeat bg-center bg-contain w-[1.41rem] h-[1.41rem] hover:opacity-50 transition-opacity duration-300`}></button>
        </div>
        <div className={`${styles.langWrap} min-w-[5.1675rem] flex items-center justify-center`}>
          <button style={{ backgroundImage: `url('${BASE_PATH}/images/burger-menu.svg')` }} className={`block bg-no-repeat bg-center bg-contain w-[1.313rem] h-[1.063rem] hover:opacity-50 transition-opacity duration-300`}></button>
        </div>
      </Container>
    </header>
  );
}

 