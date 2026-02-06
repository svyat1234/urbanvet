'use client';

import { useState } from 'react';
import styles from '@/blocks/Appointment.module.css';
import Container from '@/components/Container';
import Image from 'next/image';
import Heading from '@/components/Heading';
import doctor1 from '@/assets/images/doctors/doctor-1.jpg';
import doctor2 from '@/assets/images/doctors/doctor-2.jpg';
import doctor3 from '@/assets/images/doctors/doctor-3.jpg';
import formPetImage from '@/assets/images/gallery/dog.png';

// -----------------------------------------------------------------------------
// Для этого компоенениа сделан минимальный функционал для примера работы блока
// Кнопку назад не затронута
// -----------------------------------------------------------------------------

// ——— Демо-данные для вёрстки и проверки сценария записи. ———
// BACKEND: заменить на запросы к API; структуры полей можно использовать как ориентир.

/** Список врачей для шага «По врачу». Используется для отображения карточек с фото и специализацией. */
const DEMO_DOCTORS = [
  { id: '1', name: 'Власов Алексей', specialty: 'Терапевт/Стоматолог', image: doctor1 },
  { id: '2', name: 'Нитоврев Сергей', specialty: 'Онколог', image: doctor2 },
  { id: '3', name: 'Иванова Мария', specialty: 'Невролог', image: doctor3 },
];

/** Список специализаций для шага «По специализации». Отображаются текстовые карточки без фото. */
const DEMO_SPECIALIZATIONS = [
  { id: '1', name: 'Неврология' },
  { id: '2', name: 'Онкология' },
  { id: '3', name: 'Кардиология' },
  { id: '4', name: 'Стоматология' },
  { id: '5', name: 'Дерматология' },
];

/** Список услуг для шага «По услуге». Отображаются текстовые карточки без фото. */
const DEMO_SERVICES = [
  { id: '1', name: 'Приём терапевта' },
  { id: '2', name: 'Приём онколога' },
  { id: '3', name: 'УЗИ' },
  { id: '4', name: 'Вакцинация' },
  { id: '5', name: 'Приём стоматолога' },
];

/** Доступные даты приёма после выбора врача/специализации/услуги. available: false — карточка неактивна (класс cardNotActive). BACKEND: отдавать с учётом расписания и занятости. */
const DEMO_DATES = [
  { id: '1', label: 'Пн 10.11', available: true },
  { id: '2', label: 'Сб 15.11', available: true },
  { id: '3', label: 'Вс 16.11', available: true },
  { id: '4', label: 'Пн 17.11', available: false },
  { id: '5', label: 'Вт 18.11', available: false },
];

/** Доступные слоты времени после выбора даты. available: false — карточка неактивна (класс cardNotActive). BACKEND: отдавать свободные слоты на выбранную дату. */
const DEMO_TIMES = [
  { id: '1', label: '08:00', available: true },
  { id: '2', label: '09:00', available: true },
  { id: '3', label: '10:00', available: true },
  { id: '4', label: '11:00', available: false },
  { id: '5', label: '14:00', available: false },
];

/** Текущий шаг сценария записи: выбор типа → дата → время → форма. */
type Step = 'choose_type' | 'choose_date' | 'choose_time' | 'form';
/** Режим выбора на первом шаге: по врачу, по специализации или по услуге. */
type Mode = 'doctor' | 'specialization' | 'service';

export default function Appointment() {
  const [step, setStep] = useState<Step>('choose_type');
  const [mode, setMode] = useState<Mode>('doctor');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedSpecializationId, setSelectedSpecializationId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  /** Текст для пилюли в навигации: имя врача, название специализации или услуги. BACKEND: можно заменить на поле из ответа API. */
  const getSelectionLabel = (): string => {
    if (mode === 'doctor' && selectedDoctorId) {
      return DEMO_DOCTORS.find((d) => d.id === selectedDoctorId)?.name ?? '';
    }
    if (mode === 'specialization' && selectedSpecializationId) {
      return DEMO_SPECIALIZATIONS.find((s) => s.id === selectedSpecializationId)?.name ?? '';
    }
    if (mode === 'service' && selectedServiceId) {
      return DEMO_SERVICES.find((s) => s.id === selectedServiceId)?.name ?? '';
    }
    return '';
  };

  /** Выбор врача → переход к выбору даты. BACKEND: при интеграции здесь можно вызвать API за доступными датами. */
  const handleSelectDoctor = (id: string) => {
    setSelectedDoctorId(id);
    setSelectedSpecializationId(null);
    setSelectedServiceId(null);
    setStep('choose_date');
  };

  /** Выбор специализации → переход к выбору даты. BACKEND: аналогично врачу — запрос слотов по специализации. */
  const handleSelectSpecialization = (id: string) => {
    setSelectedSpecializationId(id);
    setSelectedDoctorId(null);
    setSelectedServiceId(null);
    setStep('choose_date');
  };

  /** Выбор услуги → переход к выбору даты. BACKEND: запрос слотов по услуге. */
  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    setSelectedDoctorId(null);
    setSelectedSpecializationId(null);
    setStep('choose_date');
  };

  /** Выбор даты → переход к выбору времени. BACKEND: по выбранной дате запрашивать свободные слоты времени. */
  const handleSelectDate = (label: string) => {
    setSelectedDate(label);
    setStep('choose_time');
  };

  /** Выбор времени → переход к форме записи. BACKEND: при отправке формы передать doctor/spec/service id, date, time. */
  const handleSelectTime = (label: string) => {
    setSelectedTime(label);
    setStep('form');
  };

  /** Навигация над контентом: на первом шаге — 3 кнопки режима, дальше — пилюли с выбранным (тип → дата → время). */
  const renderNavPills = () => {
    if (step === 'choose_type') {
      return (
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            className={mode === 'doctor' ? `${styles.sortBtnActive} sort-btn` : 'sort-btn'}
            onClick={() => setMode('doctor')}
          >
            По врачу
          </button>
          <button
            type="button"
            className={mode === 'specialization' ? `${styles.sortBtnActive} sort-btn` : 'sort-btn'}
            onClick={() => setMode('specialization')}
          >
            По специализации
          </button>
          <button
            type="button"
            className={mode === 'service' ? `${styles.sortBtnActive} sort-btn` : 'sort-btn'}
            onClick={() => setMode('service')}
          >
            По услуге
          </button>
        </div>
      );
    }

    const pills: string[] = [getSelectionLabel()];
    if (step === 'choose_time' || step === 'form') pills.push(selectedDate ?? '');
    if (step === 'form') pills.push(selectedTime ?? '');

    return (
      <div className="flex flex-wrap gap-1">
        {pills.map((label) => (
          <span key={label} className="sort-btn pointer-events-none">
            {label}
          </span>
        ))}
      </div>
    );
  };

  /** Контент блока в зависимости от шага: карточки врачей/специализаций/услуг, даты, времени или форма. BACKEND: данные подставлять из API вместо DEMO_*. */
  const renderContent = () => {
    if (step === 'choose_type') {
      if (mode === 'doctor') {
        return (
          <div className="grid grid-cols-4 gap-x-[20px] gap-y-[10px]">
            {DEMO_DOCTORS.map((doc) => (
              <button
                key={doc.id}
                type="button"
                className={`${styles.card} flex gap-[20px] items-center p-[5px] rounded-[8px] h-[116px] bg-white cursor-pointer text-left border border-transparent`}
                onClick={() => handleSelectDoctor(doc.id)}
              >
                <div className="h-full aspect-square relative rounded-[4px] overflow-hidden min-w-[100px]">
                  <Image src={doc.image} alt="" fill className="object-cover" sizes="100px" />
                </div>
                <div className="flex flex-col gap-[17px]">
                  <h3 className="text-[1.875rem] font-normal font-[Circe] leading-[100%]">{doc.name}</h3>
                  <span className="text-[0.875rem] font-medium">{doc.specialty}</span>
                </div>
              </button>
            ))}
          </div>
        );
      }
      if (mode === 'specialization') {
        return (
          <div className="grid grid-cols-4 gap-x-[20px] gap-y-[10px]">
            {DEMO_SPECIALIZATIONS.map((spec) => (
              <button
                key={spec.id}
                type="button"
                className={`${styles.card} flex justify-center items-center p-[5px] rounded-[8px] h-[116px] bg-white cursor-pointer border border-transparent`}
                onClick={() => handleSelectSpecialization(spec.id)}
              >
                <h3 className="text-[1.875rem] font-normal font-[Circe] leading-[100%]">{spec.name}</h3>
              </button>
            ))}
          </div>
        );
      }
      return (
        <div className="grid grid-cols-4 gap-x-[20px] gap-y-[10px]">
          {DEMO_SERVICES.map((svc) => (
            <button
              key={svc.id}
              type="button"
              className={`${styles.card} flex justify-center items-center p-[5px] rounded-[8px] h-[116px] bg-white cursor-pointer border border-transparent`}
              onClick={() => handleSelectService(svc.id)}
            >
              <h3 className="text-[1.875rem] font-normal font-[Circe] leading-[100%]">{svc.name}</h3>
            </button>
          ))}
        </div>
      );
    }

    if (step === 'choose_date') {
      return (
        <div className="grid grid-cols-4 gap-x-[20px] gap-y-[10px]">
          {DEMO_DATES.map((d) => (
            <button
              key={d.id}
              type="button"
              disabled={!d.available}
              className={`${styles.card} flex justify-center items-center p-[5px] rounded-[8px] h-[116px] bg-white border border-transparent ${!d.available ? styles.cardNotActive : 'cursor-pointer'}`}
              onClick={() => d.available && handleSelectDate(d.label)}
            >
              <span className="text-[1.875rem] font-normal font-[Circe] leading-[100%]">{d.label}</span>
            </button>
          ))}
        </div>
      );
    }

    if (step === 'choose_time') {
      return (
        <div className="grid grid-cols-4 gap-x-[20px] gap-y-[10px]">
          {DEMO_TIMES.map((t) => (
            <button
              key={t.id}
              type="button"
              disabled={!t.available}
              className={`${styles.card} flex justify-center items-center p-[5px] rounded-[8px] h-[116px] bg-white border border-transparent ${!t.available ? styles.cardNotActive : 'cursor-pointer'}`}
              onClick={() => t.available && handleSelectTime(t.label)}
            >
              <span className="text-[1.875rem] font-normal font-[Circe] leading-[100%]">{t.label}</span>
            </button>
          ))}
        </div>
      );
    }

    // step === 'form'
    return (
      <div className="flex gap-[20px]">
        <div className="w-[400px] shrink-0 h-[400px] relative rounded-[8px] overflow-hidden bg-[#eee]">
          <Image
            src={formPetImage}
            alt=""
            fill
            className="object-cover"
            sizes="400px"
          />
        </div>
        <form className="flex flex-col gap-4 flex-1" onSubmit={(e) => e.preventDefault()}>
          <input
            type="tel"
            placeholder="Введите телефонный номер"
            className="w-full max-w-[400px] h-12 px-4 border border-[#8E8E8E] rounded-[8px] text-[1rem]"
          />
          <input
            type="text"
            placeholder="Имя"
            className="w-full max-w-[400px] h-12 px-4 border border-[#8E8E8E] rounded-[8px] text-[1rem]"
          />
          <input
            type="text"
            placeholder="Фамилия"
            className="w-full max-w-[400px] h-12 px-4 border border-[#8E8E8E] rounded-[8px] text-[1rem]"
          />
          <input
            type="text"
            placeholder="Имя питомца"
            className="w-full max-w-[400px] h-12 px-4 border border-[#8E8E8E] rounded-[8px] text-[1rem]"
          />
          <input
            type="text"
            placeholder="Вид питомца"
            className="w-full max-w-[400px] h-12 px-4 border border-[#8E8E8E] rounded-[8px] text-[1rem]"
          />
          <button
            type="submit"
            className="mt-2 w-full max-w-[400px] h-12 bg-[#1D1D1D] text-white rounded-[8px] font-medium"
          >
            Записаться
          </button>
        </form>
      </div>
    );
  };

  return (
    <section className="pt-[6.25rem]">
      <Container>
        <div className="flex justify-between items-end">
          <div className="flex gap-[25px]">
            <button type="button" aria-label="Назад" className="h-full">
              <svg
                width="60"
                height="38"
                viewBox="0 0 60 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.5" y="0.5" width="59" height="37" rx="18.5" stroke="#1D1D1D" />
                <path
                  d="M39.2153 18.5014C39.4914 18.5014 39.7153 18.7253 39.7152 19.0014C39.7152 19.2775 39.4914 19.5014 39.2152 19.5014L39.2152 19.0014L39.2153 18.5014ZM20.4302 19.3539C20.235 19.1587 20.235 18.8421 20.4303 18.6468L23.6124 15.465C23.8077 15.2698 24.1243 15.2698 24.3195 15.465C24.5148 15.6603 24.5147 15.9769 24.3195 16.1722L21.4909 19.0004L24.3192 21.829C24.5144 22.0243 24.5144 22.3409 24.3191 22.5361C24.1239 22.7314 23.8073 22.7314 23.612 22.5361L20.4302 19.3539ZM39.2152 19.0014L39.2152 19.5014L20.7838 19.5004L20.7838 19.0004L20.7838 18.5004L39.2153 18.5014L39.2152 19.0014Z"
                  fill="#1D1D1D"
                />
              </svg>
            </button>
            {renderNavPills()}
          </div>
          <Heading subtitle="Запись" title="Запись на приём" />
        </div>

        <div className="p-[5rem] bg-[#F9F9F9] min-h-[654px] overflow-y-auto mt-[5rem]">
          {renderContent()}
        </div>
      </Container>
    </section>
  );
}
