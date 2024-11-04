"use client";
import React from 'react';
import Button from '../Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab }) => {

  const t = useTranslations('Dashboard')

  return (
    <div className="w-64 bg-tertiary h-screen p-4 flex flex-col justify-between">
      <div>
        <Link href="/">
          <button className='w-full cursor-pointer flex items-center py-3'>
            <IoIosArrowBack className='text-secondary me-2' />
            <p className="text-secondary">{t('back')}</p>
          </button>
        </Link>
        <div> 
          <Image 
            className="mx-auto my-6" 
            src={'/logo.svg'} 
            alt="logo" 
            width={180} 
            height={24} 
          />
          <ul>
            <li
              className={`p-4 border-b border-secondary cursor-pointer text-secondary ${activeTab === 'questionaries' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('questionaries')}
            >
              Questionaries
            </li>
            <li
              className={`p-4 border-b border-secondary cursor-pointer text-secondary ${activeTab === 'profile' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </li>
          </ul>
        </div>
      </div>
      <Button variant='link' className='text-secondary' onClick={() => {
        signOut(auth)
      }} label='LogOut' />
    </div>
  );
};

export default Sidebar;
