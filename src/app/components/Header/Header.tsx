"use client";
import React from 'react';
import VerticalGallery from '../VerticalGallery/VericalGallery';
import Button from '../Button/Button';
import { useTranslations } from 'next-intl';

const Header: React.FC = () => {
  const t = useTranslations('Header');

  return (
    <div className="bg-darkGreen">
      <div className="lg:container mx-auto py-10 lg:py-0 px-0 lg:px-4">
        <div className="overflow-hidden flex flex-col lg:flex-row items-center">
          
          <div className="container px-4 sm:px-0 md:px-8 lg:px-0 w-full lg:w-1/2 mb-20 lg:mb-0 text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-tertiary font-medium leading-tight">{t('title')}</h1>
            <p className="text-white mt-8 mb-10">{t('subtitle')}</p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Button
                label="Request treatment"
                variant="white"
                onClick={() => console.log("here")}
              />
              <Button
                label="Check live inventory"
                variant="tertiary"
                onClick={() => console.log("here")}
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
