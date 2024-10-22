"use client";
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import DropdownItem from './DropdownItem'; 
import Button from '../Button/Button';
import { FaPlus } from 'react-icons/fa6';
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

  const servicesItems = [
    {
      href: '/services/request-treatment',
      title: 'Request Treatment',
      description: 'In just three steps to therapy with medical cannabis',
      icon: <FaPlus className='text-secondary' />
    },
    {
      href: '/services/redeem-prescription',
      title: 'Redeem Prescription',
      description: 'In just three steps to therapy with medical cannabis',
      icon: <FaPlus className='text-secondary' />
    },
    {
      href: '/services/reports-forms',
      title: 'Reports & Forms',
      description: 'In just three steps to therapy with medical cannabis',
      icon: <FaPlus className='text-secondary' />
    },
    {
      href: '/services/another-service',
      title: 'Another Service',
      description: 'Description for another service.',
      icon: <FaPlus className='text-secondary' />
    },
  ];

  return (
    <nav className="bg-white p-4 md:p-8 relative">
      <div className="container mx-auto flex items-center justify-between">
          <Link href="/" legacyBehavior>
            <Image src={'/logo.svg'} alt="logo" width={180} height={24} />
          </Link>

          <div className="hidden md:flex items-center space-x-10 ml-10">
            <Link href="/how-it-works" legacyBehavior>
              <a className="text-secondary font-normal hover:text-gray-500">{t('home')}</a>
            </Link>
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('cannabisAvailability')}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/products" legacyBehavior>
                <a className="flex items-center space-x-1 text-secondary font-normal hover:text-gray-500">
                  <span>{t('cannabisAvailability')}</span>
                  <FaChevronDown className="text-sm" />
                </a>
              </Link>
              <div
                className={`absolute left-0 right-0 mt-2 shadow-lg bg-white w-screen py-2 transition-all duration-500 ease-in-out transform origin-top z-50 max-h-0 overflow-hidden ${
                  dropdownOpen === 'cannabisAvailability'
                    ? 'max-h-screen opacity-100'
                    : 'opacity-0'
                }`}
              >
                <div className="grid grid-cols-2 gap-4 mx-auto">
                  {servicesItems.map((item) => (
                    <DropdownItem
                      key={item.href}
                      href={item.href}
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('diseases')}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/diseases" legacyBehavior>
                <a className="flex items-center space-x-1 text-secondary font-normal hover:text-gray-500">
                  <span>{t('diseases')}</span>
                  <FaChevronDown className="text-sm" />
                </a>
              </Link>
              <div
                className={`absolute left-0 right-0 mt-2 shadow-lg bg-white w-screen py-2 transition-all duration-500 ease-in-out transform origin-top z-50 max-h-0 overflow-hidden ${
                  dropdownOpen === 'diseases'
                    ? 'max-h-screen opacity-100'
                    : 'opacity-0'
                }`}
              >
                <div className="grid grid-cols-2 gap-4 mx-auto">
                  {servicesItems.map((item) => (
                    <DropdownItem
                      key={item.href}
                      href={item.href}
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                    />
                  ))}
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
