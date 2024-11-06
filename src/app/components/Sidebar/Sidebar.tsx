"use client";
import React from 'react';
import Button from '../Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
  onClose: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab, onClose }) => {
  const t = useTranslations('Dashboard');

  return (
    <div className="w-64 bg-tertiary h-screen p-4 flex flex-col justify-between relative">
   

      <div>
        <div className="flex justify-between">
          <Link href="/" onClick={onClose}>
            <button className='w-full cursor-pointer flex items-center py-3'>
              <IoIosArrowBack className='text-secondary me-2' />
              <p className="text-secondary">{t('back')}</p>
            </button>
          </Link>
          <button
            className="md:hidden text-secondary px-3"
            onClick={onClose}
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
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
              onClick={() => { setActiveTab('questionaries'); onClose(); }}
            >
              Questionaries
            </li>
            <li
              className={`p-4 border-b border-secondary cursor-pointer text-secondary ${activeTab === 'profile' ? 'font-bold' : ''}`}
              onClick={() => { setActiveTab('profile'); onClose(); }}
            >
              Profile
            </li>
          </ul>
        </div>
      </div>
      <Button variant='link' className='text-secondary' onClick={() => { signOut(auth); onClose(); }} label='LogOut' />
    </div>
  );
};

export default Sidebar;
