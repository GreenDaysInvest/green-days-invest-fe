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
  return (
    <div className="bg-lightGreen rounded-2xl p-5 flex flex-col items-start">
      <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white text-left mb-6">{title}</p>
      <Link href="">
        <div className='flex items-center flex-start rounded-lg bg-white p-3 flex-shrink-0'>
          <p className='text-xs md:text-sm text-secondary font-medium'>{t('readMore')}</p>
          <FaArrowRight className="text-secondary ms-2" />
        </div>
      </Link>
    </div>
  );
};

export default DiseaseCard;
