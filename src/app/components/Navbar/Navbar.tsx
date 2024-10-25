"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import Button from '../Button/Button';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { IoBag } from 'react-icons/io5';

const Navbar: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations('Navbar');
  const tHomePage = useTranslations('HomePage');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number>(0);
  const [dropdownOffset, setDropdownOffset] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (menu: string) => {
    setDropdownOpen(menu);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(null);
  };

  const dropdownItems = [
    {
      icon: <IoBag className='text-white' />,
      text: tHomePage('Disease.list.sleepDisorder'),
    },
    {
      icon: <IoBag className='text-white' />,
      text: tHomePage('Disease.list.migraine'),
    },
    {
      icon: <IoBag className='text-white' />,
      text: tHomePage('Disease.list.chronicPain'),
    },
    {
      icon: <IoBag className='text-white' />,
      text: tHomePage('Disease.list.adhd'),
    },
    {
      icon: <IoBag className='text-white' />,
      text: tHomePage('Disease.list.depresion'),
    },
    {
      icon: <IoBag className='text-white' />,
      text: tHomePage('Disease.list.furtherComplaints'),
    }
  ];

  useEffect(() => {
    const updateDropdownDimensions = () => {
      const viewportWidth = window.innerWidth;
      setDropdownWidth(viewportWidth);

      if (dropdownRef.current) {
        const dropdownOffsetLeft = dropdownRef.current.getBoundingClientRect().left;
        setDropdownOffset(dropdownOffsetLeft);
      }
    };

    updateDropdownDimensions();

    window.addEventListener('resize', updateDropdownDimensions);

    return () => {
      window.removeEventListener('resize', updateDropdownDimensions);
    };
  }, []);

  return (
    <nav className="bg-white p-4 md:p-8 relative">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" legacyBehavior>
          <Image className='cursor-pointer' src={'/logo.svg'} alt="logo" width={180} height={24} />
        </Link>

        <div className="hidden md:flex items-center space-x-10 ml-10">
          <Link href="/" legacyBehavior>
            <p className="text-secondary font-normal hover:text-gray-500">{t('home')}</p>
          </Link>
          <Link href="/cannabis" legacyBehavior>
            <p className="flex items-center space-x-1 text-secondary font-normal hover:text-gray-500">{t('cannabisAvailability')}</p>
          </Link>

          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('diseases')}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
          >
            <Link href="/diseases" legacyBehavior>
              <p className="flex items-center space-x-1 text-secondary font-normal hover:text-gray-500">
                <span>{t('diseases')}</span>
                <FaChevronDown className="text-sm" />
              </p>
            </Link>
            <div
              className={`bg-tertiary absolute w-full mt-11 shadow-lg py-6 transition-all duration-500 ease-in-out transform origin-top z-50 max-h-0 overflow-hidden ${
                dropdownOpen === 'diseases'
                  ? 'max-h-screen opacity-100'
                  : 'opacity-0'
              }`}
              style={{
                width: `${dropdownWidth}px`,
                left: 0, 
                transform: `translateX(-${dropdownOffset}px)`,
              }}
            >
              <div className="container mx-auto py-4">
                <div className="grid grid-cols-3 gap-4">
                  {dropdownItems.map((item) => (
                    <div className='flex items-center bg-white rounded-md p-4' key={item.text}>
                      <span className='flex items-center justify-center bg-main rounded-md w-[38px] h-[38px] mr-4'>{item.icon}</span>
                      <p className='text-main font-medium'>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link href="/accessories-shop" legacyBehavior>
            <p className="text-secondary font-normal hover:text-gray-500">{t('blog')}</p>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {locale === 'en'
            ? <Link href="/" locale="de">
              <Image src='/de.png' alt='de' width={30} height={30} />
            </Link>
            : <Link href="/" locale="en">
              <Image src='/en.png' alt='de' width={30} height={30} />
            </Link>
          }
          <Link href="/register" legacyBehavior>
            <Button 
              label='Register'
              type='secondary' 
              onClick={() => console.log("here")} 
            />
          </Link>
          <Link href="/login" legacyBehavior>
            <Button 
              label='Login'
              type='outline' 
              onClick={() => console.log("here")} 
            />
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
