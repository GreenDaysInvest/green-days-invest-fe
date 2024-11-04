"use client";
import React from 'react';
import VerticalGallery from '../VerticalGallery/VericalGallery';
import Button from '../Button/Button';
import { useTranslations } from 'next-intl';

const Header: React.FC = () => {

  const t = useTranslations('Header')

  return (
    <div className="bg-darkGreen">
      <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-4">
        <div className="overflow-hidden flex flex-row items-center">
              <div className="w-full lg:w-1/2 mb-8 lg:mb-0 text-left order-2 lg:order-1">
                <h1 className="text-5xl text-tertiary font-medium leading-tight">{t('title')}</h1>
                <p className="text-white mt-8 mb-10">{t('subtitle')}</p>
                <div className="flex space-x-4">
                  <Button
                    label="Request treatment"
                    variant="white"
                    onClick={() => console.log("here")} />
                  <Button 
                    label="Check live inventory"
                    variant="tertiary"
                    onClick={() => console.log("here")} />
                </div>
              </div>
              <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end my-[-100px]">
                <VerticalGallery />
              </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
