"use client";
import React from 'react';
import VerticalGallery from '../VerticalGallery/VericalGallery';
import Button from '../Button/Button';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useAuth } from '@/app/context/AuthContext';
import { useApp } from '@/app/context/AppContext';

const Header: React.FC = () => {

  const router = useRouter();
  const { user } = useAuth();
  const { setIsRegisterModalOpen, setActiveTab } = useApp();
  const t = useTranslations('Header');


  const handleRequestTreatment = () => {
    if(!user) {
      setIsRegisterModalOpen(true) 
    } else {
      router.push('/dashboard')
      if(!user.isAdmin) {
        setActiveTab('questionaries')
      } else {
        setActiveTab('questionariesList')
      }
    }
  }

  return (
    <div className="bg-darkGreen">
      <div className="lg:container mx-auto py-10 lg:py-0 px-0 lg:px-4">
        <div className="overflow-hidden flex flex-col lg:flex-row items-center">
          
          <div className="container px-4 sm:px-0 md:px-8 lg:px-0 w-full lg:w-1/2 mb-20 lg:mb-0 text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-tertiary font-medium leading-tight">{t('title')}</h1>
            <p className="text-white mt-8 mb-10">{t('subtitle')}</p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Button
                label={t('firstButton')}
                variant="white"
                onClick={handleRequestTreatment}
              />
              <Button
                label={t('secondButton')}
                variant="tertiary"
                onClick={() => router.push('/cannabis')}
              />
            </div>
          </div>
          
          <div className="w-full lg:container lg:w-1/2 flex justify-center lg:justify-end lg:my-[-100px] h-[280px] md:h-[360px] h-[400px] lg:h-auto">
            <VerticalGallery />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
