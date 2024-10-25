"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import Button from '../Button/Button';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { IoBag } from 'react-icons/io5';
import Modal from '../Modal/Modal';

const Navbar: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations('Navbar');
  const tHomePage = useTranslations('HomePage');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number>(0);
  const [dropdownOffset, setDropdownOffset] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleMouseEnter = (menu: string) => {
    setDropdownOpen(menu);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(null);
  };

  const dropdownItems = [
    {
      href: "sleep-disorder",
      icon: <IoBag className='text-white' />,
      text: tHomePage('Disease.list.sleepDisorder'),
    },
    {
      href: "migrane",
      icon: <IoBag className='text-white' />,
      text: tHomePage('Disease.list.migraine'),
    },
    {
      href: "chronic-pain",
      icon: <IoBag className='text-white' />,
      text: tHomePage('Disease.list.chronicPain'),
    },
    {
      href: "adhd",
      icon: <IoBag className='text-white' />,
      text: tHomePage('Disease.list.adhd'),
    },
    {
      href: "depresion",
      icon: <IoBag className='text-white' />,
      text: tHomePage('Disease.list.depresion'),
    },
    {
      href: "further-complaints",
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
    <>
      <nav className="bg-white p-4 md:p-8 relative">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" legacyBehavior>
            <Image className='cursor-pointer' src={'/logo.svg'} alt="logo" width={180} height={24} />
          </Link>

          <div className="hidden md:flex items-center space-x-10 ml-10">
            <Link href="/" legacyBehavior>
              <p className="cursor-pointer text-secondary font-normal hover:text-gray-500">{t('home')}</p>
            </Link>
            <Link href="/cannabis" legacyBehavior>
              <p className="cursor-pointer text-secondary font-normal hover:text-gray-500">{t('cannabisAvailability')}</p>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('diseases')}
              onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
            >
              <Link href="/diseases" legacyBehavior>
                <p className="cursor-pointer flex items-center space-x-1 text-secondary font-normal hover:text-gray-500">
                  <span>{t('diseases')}</span>
                  <FaChevronDown className="text-sm" />
                </p>
              </Link>
              <div
                className={`bg-tertiary absolute w-full mt-11 shadow-lg py-6 transition-all duration-500 ease-in-out transform origin-top z-50 overflow-hidden ${
                  dropdownOpen === 'diseases' ? 'opacity-100 max-h-screen visible' : 'opacity-0 max-h-0 invisible'
                }`}
                style={{
                  width: `${dropdownWidth}px`,
                  left: 0, 
                  transform: `translateX(-${dropdownOffset}px)`,
                }}
              >
                <div className="container mx-auto py-4">
                  <div className="grid grid-cols-3 gap-4">
                    {dropdownItems.map((item, _id) => (
                      <Link key={_id} href={`/disease/${item.href}`}>
                        <div className='flex items-center bg-white rounded-md p-4'>
                          <span className='flex items-center justify-center bg-main rounded-md w-[38px] h-[38px] mr-4'>{item.icon}</span>
                          <p className='text-main font-medium'>{item.text}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

              <Link href="/blog" legacyBehavior>
                <p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">{t('blog')}</p>
              </Link>
            </div>

          <div className="flex items-center space-x-4">
            <Button 
              label='Register'
              type='secondary' 
              onClick={() => setIsRegisterModalOpen(true)} 
            />
            <Button 
              label='Login'
              type='outline' 
              onClick={() => setIsLoginModalOpen(true)}
            />
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
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <h2 className="text-xl font-bold">Login Modal Title</h2>
        <p className="mt-4 text-gray-600">This is the modal content.</p>
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="mt-6 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
        >
          Close Modal
        </button>
      </Modal>
      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
        <h2 className="text-xl font-bold">Register Modal Title</h2>
        <p className="mt-4 text-gray-600">This is the modal content.</p>
        <button
          onClick={() => setIsRegisterModalOpen(false)}
          className="mt-6 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
        >
          Close Modal
        </button>
      </Modal>
    </>
  );
};

export default Navbar;
