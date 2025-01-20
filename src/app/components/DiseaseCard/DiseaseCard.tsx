"use client";
import { FC } from 'react';
import { Link } from '@/i18n/routing';
import { FaArrowRight } from "react-icons/fa";
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface DiseaseCardProps {
  title: string;
}

const DiseaseCard: FC<DiseaseCardProps> = ({ title}) => {
  const t = useTranslations('HomePage')

  const diseases: Record<string, string> = {
    "Schlafstörungen": "sleep-disorder",
    "Migräne": "migrane",
    "Chronische Schmerzen": "chronic-pain",
    "ADHS": "adhd",
    "Depressionen": "depression",
    "Weitere Krankheiten": "../"
    // "Weitere Krankheiten": "further-complaints"
  }


  const diseasesImg: Record<string, string> = {
    "Schlafstörungen": "/icons/Sleep_disorders.png",
    "Migräne": "/icons/Migraine.png",
    "Chronische Schmerzen": "/icons/Chronic_pain.png",
    "ADHS": "/icons/ADHD.png",
    "Depressionen": "/icons/Depression.png",
    "Weitere Krankheiten": "/icons/Other_diseases.png"
  }
  
  return (
    <div className="bg-lightGreen rounded-2xl p-6 flex flex-col justify-between items-start h-[190px]">
      <div className='flex items-start'>
        <Image src={`${diseasesImg[title]}`} width={40} height={40} alt="disease-card-icon" />
        <p className="text-3xl font-medium text-white text-left mb-6 ms-2">{title}</p>
      </div>
      <Link href={`/disease/${diseases[title]}`}>
        <div className='flex items-center flex-start rounded-lg bg-white p-3 flex-shrink-0'>
          <p className='text-xs md:text-sm text-secondary font-medium'>{t('readMore')}</p>
          <FaArrowRight className="text-secondary ms-2" />
        </div>
      </Link>
    </div>
  );
};

export default DiseaseCard;
