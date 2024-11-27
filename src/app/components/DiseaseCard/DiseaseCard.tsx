"use client";
import { FC } from 'react';
import { Link } from '@/i18n/routing';
import { FaArrowRight } from "react-icons/fa";
import { useTranslations } from 'next-intl';

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
    "Weitere Krankheiten": "further-complaints"
  }
  
  return (
    <div className="bg-lightGreen rounded-2xl p-6 flex flex-col items-start">
      <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white text-left mb-6">{title}</p>
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
