import Container from '@/components/Container';
import styles from './DepartmentHero.module.css';
import Image from 'next/image';
import type { DepartmentHeroData } from '@/lib/constants';

interface DepartmentHeroProps {
  data: DepartmentHeroData;
}

export default function DepartmentHero({ data }: DepartmentHeroProps) {
  return (
    <section className={`${styles.hero} mt-20`}>
      <Container>
        <div className={`flex items-start justify-between`}>

          {/* Оглавнение */}
          <div className={`flex flex-col gap-3`}>
            <h1 className={`font-[Circe] text-[3.75rem] font-bold uppercase leading-[100%]`}>{data.heading.title}</h1>
            <p className={`font-[Circe] text-[3.75rem] font-normal uppercase leading-[100%]`}>{data.heading.brandTitle}</p>
          </div>

          {/* Врачи */}
          <div className={`flex gap-[19px] items-center max-w-197 w-full`}>

            {/* Фото со врачами */}
            <div className={`${styles.doctorImageCards} flex`}>
              {/* Профильный врач (справа, z-index: 3) */}
              <div className={`${styles.doctorImageWrap}`}>
                <Image 
                  src={data.featuredDoctor.photo} 
                  alt={data.featuredDoctor.name} 
                  width={114}
                  height={114}
                  className={`w-full h-full object-cover`}
                />
              </div>
              {/* Статичное фото 1 (центр, z-index: 2) */}
              <div className={`${styles.doctorImageWrap}`}>
                <Image 
                  src={data.staticDoctorPhotos[0]} 
                  alt="Doctor" 
                  width={114}
                  height={114}
                  className={`w-full h-full object-cover`}
                />
              </div>
              {/* Статичное фото 2 (слева, z-index: 1) */}
              <div className={`${styles.doctorImageWrap}`}>
                <Image 
                  src={data.staticDoctorPhotos[1]} 
                  alt="Doctor" 
                  width={114}
                  height={114}
                  className={`w-full h-full object-cover`}
                />
              </div>
            </div>

            {/* Информаиция о враче */}
            <div className={`flex flex-col gap-[1.3125rem] max-w-[26.7rem]`}>
              <h2 className={`font-[Circe] font-bold text-[2.5rem] leading-[87%]`}>{data.featuredDoctor.name}</h2>
              <p className={`font-medium  text-[1.25rem] leading-0`}>{data.featuredDoctor.role}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Изображение */}
      <div className={`w-full h-[66vh] mt-[2.875rem]`}>
        <Image src={data.heroImage} alt={data.heading.title} className={`w-full h-full object-cover`} />
        
        {/* Украшение */}
        <div className={`absolute bottom-[5%] right-[4.69%] w-[35.25px] h-[35.25px] bg-[url('/images/dep-plus.svg')] bg-no-repeat bg-center bg-cover`}></div>
      </div>
    </section>
  );
}


