"use client";
import React, { useState } from 'react';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Button from '../Button/Button';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { IoBag } from 'react-icons/io5';
import LoginModal from '../AuthModal/LoginModal';
import RegisterModal from '../AuthModal/RegisterModal';
import { useApp } from '@/app/context/AppContext';
import { useAuth } from '@/app/context/AuthContext';

const Navbar: React.FC = () => {
  const { setIsLoginModalOpen, setIsRegisterModalOpen } = useApp();
  const { user } = useAuth();
  const locale = useLocale();
  const t = useTranslations('Navbar');
  const tHomePage = useTranslations('HomePage');

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMouseEnter = (menu: string) => setDropdownOpen(menu);
  const handleMouseLeave = () => setDropdownOpen(null);

  const dropdownItems = [
    { href: "sleep-disorder", icon: <IoBag className='text-white' />, text: tHomePage('Disease.list.sleepDisorder') },
    { href: "migrane", icon: <IoBag className='text-white' />, text: tHomePage('Disease.list.migraine') },
    { href: "chronic-pain", icon: <IoBag className='text-white' />, text: tHomePage('Disease.list.chronicPain') },
    { href: "adhd", icon: <IoBag className='text-white' />, text: tHomePage('Disease.list.adhd') },
    { href: "depresion", icon: <IoBag className='text-white' />, text: tHomePage('Disease.list.depresion') },
    { href: "further-complaints", icon: <IoBag className='text-white' />, text: tHomePage('Disease.list.furtherComplaints') },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  return (
    <>
      <nav className="bg-white px-4 py-8 relative">
        <div className="container mx-auto flex items-center justify-between md:px-8 lg:px-4">
          <Link href="/" onClick={closeMobileMenu}>
            <Image className="cursor-pointer" src={'/logo.svg'} alt="logo" width={180} height={24} sizes="(max-width: 600px) 100vw, 180px" style={{ width: "100%", height: "auto" }} />
          </Link>

          <div className="hidden lg:flex items-center space-x-10 ml-10">
            <Link href="/"><p className="cursor-pointer text-secondary font-normal hover:text-gray-500">{t('home')}</p></Link>
            <Link href="/cannabis"><p className="cursor-pointer text-secondary font-normal hover:text-gray-500">{t('cannabisAvailability')}</p></Link>

            <div className="relative" onMouseEnter={() => handleMouseEnter('diseases')} onMouseLeave={handleMouseLeave}>
              <Link href="">
                <p className="cursor-pointer flex items-center space-x-1 text-secondary font-normal hover:text-gray-500">
                  <span>{t('diseases')}</span>
                  <FaChevronDown className="text-sm" />
                </p>
              </Link>
              <div
                className={`bg-tertiary fixed top-[113px] left-0 w-full shadow-lg py-6 transition-all duration-500 ease-in-out transform origin-top z-50 overflow-hidden ${
                  dropdownOpen === 'diseases' ? 'opacity-100 max-h-screen visible' : 'opacity-0 max-h-0 invisible'
                }`}
              >
                <div className="container mx-auto py-4 px-4 sm:px-0 md:px-8 lg:px-4">
                  <div className="grid grid-cols-3 gap-4">
                    {dropdownItems.map((item, _id) => (
                      <Link key={_id} href={`/disease/${item.href}`}>
                        <div className="flex items-center bg-white rounded-md p-4">
                          <span className="flex items-center justify-center bg-main rounded-md w-[38px] h-[38px] mr-4">{item.icon}</span>
                          <p className="text-main font-medium">{item.text}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/blog"><p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">{t('blog')}</p></Link>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-secondary flex items-center justify-center border border-secondary rounded-lg w-[35px] h-[35px]">
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            {!user ? (
              <div className="hidden lg:flex space-x-4">
                <Button label='Register' variant='secondary' onClick={() => { setIsRegisterModalOpen(true); closeMobileMenu(); }} />
                <Button label='Login' variant='outline' onClick={() => { setIsLoginModalOpen(true); closeMobileMenu(); }} />
              </div>
            ) : (
              <Link href="/dashboard" className="hidden lg:flex" onClick={closeMobileMenu}>
                <span className="rounded-full bg-main w-[35px] h-[35px] my-[7px] text-white flex justify-center items-center cursor-pointer">
                  <p className="text-white font-medium">{user?.displayName?.charAt(0)}</p>
                </span>
              </Link>
            )}
            {locale === 'en' ? (
              <Link href="/" locale="de" className="hidden lg:flex" onClick={closeMobileMenu}><p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">DE</p></Link>
            ) : (
              <Link href="/" locale="en" className="hidden lg:flex" onClick={closeMobileMenu}><p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">ENG</p></Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg absolute top-full left-0 w-full pb-4 px-6 z-50 border-t border-lightGreen">
            <div className="flex flex-col items-center">
              <Link href="/" className='border-b border-lightGreen w-full text-center py-4' onClick={closeMobileMenu}><p className="cursor-pointer text-secondary font-normal hover:text-gray-500">{t('home')}</p></Link>
              <Link href="/cannabis" className='border-b border-lightGreen w-full text-center py-4' onClick={closeMobileMenu}><p className="cursor-pointer text-secondary font-normal hover:text-gray-500">{t('cannabisAvailability')}</p></Link>
              <button onClick={() => setDropdownOpen(dropdownOpen === 'symptoms' ? null : 'symptoms')} className="flex justify-center items-center text-secondary font-normal border-b border-lightGreen w-full text-center py-4">
                {t('diseases')} <FaChevronDown className="ml-1" />
              </button>
              {dropdownOpen === 'symptoms' && (
                <div className="bg-tertiary w-full py-4 px-6">
                  <div className="grid grid-cols-2 gap-4">
                    {dropdownItems.map((item, _id) => (
                      <Link key={_id} href={`/disease/${item.href}`} onClick={closeMobileMenu}>
                        <div className="flex justify-center items-center bg-white rounded-md p-4 shadow-sm">
                          <p className="text-main text-xs text-center">{item.text}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link href="/blog" className='border-b border-lightGreen w-full text-center py-4' onClick={closeMobileMenu}><p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">{t('blog')}</p></Link>

              {!user ? (
                <div className='flex justify-center space-x-4 py-4'>
                  <Button label='Register' variant='secondary' className='px-8' onClick={() => { setIsRegisterModalOpen(true); closeMobileMenu(); }} />
                  <Button label='Login' variant='outline' className='px-8' onClick={() => { setIsLoginModalOpen(true); closeMobileMenu(); }} />
                </div>
              ) : (
                <Link href="/dashboard" onClick={closeMobileMenu}>
                  <span className="rounded-full bg-main w-[35px] h-[35px] text-white flex justify-center items-center cursor-pointer">
                    <p className="text-white font-medium">{user?.displayName?.charAt(0)}</p>
                  </span>
                </Link>
              )}
              {locale === 'en' ? (
                <Link href="/" locale="de" onClick={closeMobileMenu}><p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">DE</p></Link>
              ) : (
                <Link href="/" locale="en" onClick={closeMobileMenu}><p className="text-secondary font-normal hover:text-gray-500 cursor-pointer">ENG</p></Link>
              )}
            </div>
          </div>
        )}
      </nav>
      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default Navbar;
