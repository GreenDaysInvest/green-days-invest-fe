"use client";
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import Button from '../Button/Button';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

const Navbar: React.FC = () => {

  const locale = useLocale();
  const t = useTranslations('Navbar');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setDropdownOpen(menu);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(null);
  };

  return (
    <nav className="bg-white p-4 md:p-8 relative">
      <div className="container mx-auto flex items-center justify-between">
          <Link href="/" legacyBehavior>
            <Image className='cursor-pointer' src={'/logo.svg'} alt="logo" width={180} height={24} />
          </Link>

          <div className="hidden md:flex items-center space-x-10 ml-10">
            <Link href="/" legacyBehavior>
              <p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">{t('home')}</p>
            </Link>
            <Link href="/cannabis" legacyBehavior>
              <p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">{t('cannabisAvailability')}</p>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('diseases')}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/diseases" legacyBehavior>
                <p className="flex items-center space-x-1 text-secondary font-normal hover:text-gray-500 cursor-pointer">
                  <span>{t('diseases')}</span>
                  <FaChevronDown className="text-sm" />
                </p>
              </Link>
              <div
                className={`absolute left-0 right-0 mt-2 shadow-lg bg-white py-2 transition-all duration-500 ease-in-out transform origin-top z-50 max-h-0 overflow-hidden ${
                  dropdownOpen === 'diseases'
                    ? 'max-h-screen opacity-100'
                    : 'opacity-0'
                }`}
              >
                <ul className="p-4">
                  <li className="py-2 hover:text-gray-500">
                    <Link href="/diseases/disease1">
                      <p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">{t('disease1')}</p>
                      </Link>
                  </li>
                  <li className="py-2 hover:text-gray-500">
                    <Link href="/diseases/disease2">
                      <p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">{t('disease2')}</p>
                      </Link>
                  </li>
                  <li className="py-2 hover:text-gray-500">
                    <Link href="/diseases/disease3">
                      <p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">{t('disease3')}</p>
                      </Link>
                  </li>
                </ul>
              </div>
            </div>

            <Link href="/accessories-shop" legacyBehavior>
              <p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">{t('blog')}</p>
            </Link>
          </div>

        <div className="flex items-center space-x-4">
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
          {locale === 'en'
            ? <Link href="/" locale="de">
              <p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">DE</p>
            </Link>
            : <Link href="/" locale="en">
              <p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">ENG</p>
            </Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
