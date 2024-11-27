"use client";
import React from 'react';
import Button from '../Button/Button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import AuthService from '@/app/services/authServices';
import { useAuth } from '@/app/context/AuthContext';
import { useApp } from '@/app/context/AppContext';

interface SidebarProps {
  onClose: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({  onClose }) => {
  const { user, setUser } = useAuth();
  const { activeTab, setActiveTab } = useApp();
  const t = useTranslations('Dashboard');
  const handleLogout = async () => {
    try {
      AuthService.logout();
      onClose();
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
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
            {!user?.isAdmin && <li
              className={`p-4 border-b border-secondary cursor-pointer text-secondary ${activeTab === 'questionaries' ? 'font-bold' : ''}`}
              onClick={() => { setActiveTab('questionaries'); onClose(); }}
            >
              {t('Sidebar.questionnaires')}
            </li>}
            {user?.isAdmin && <li
              className={`p-4 border-b border-secondary cursor-pointer text-secondary ${activeTab === 'questionariesList' ? 'font-bold' : ''}`}
              onClick={() => { setActiveTab('questionariesList'); onClose(); }}
            >
              {t('Sidebar.questionnaireList')}
            </li>}
            <li
              className={`p-4 border-b border-secondary cursor-pointer text-secondary ${activeTab === 'profile' ? 'font-bold' : ''}`}
              onClick={() => { setActiveTab('profile'); onClose(); }}
            >
              {t('Sidebar.profile')}
            </li>
            {((user && !user?.isAdmin) && user.questionnaires && user.questionnaires?.length > 0 && user?.questionnaires[user.questionnaires.length - 1]?.status === "accepted") && <li
              className={`p-4 border-b border-secondary cursor-pointer text-secondary ${activeTab === 'basket' ? 'font-bold' : ''}`}
              onClick={() => { setActiveTab('basket'); onClose(); }}
            >
              {t('Sidebar.basket')}
            </li>}
            {(user && !user?.isAdmin) && <li
              className={`p-4 border-b border-secondary cursor-pointer text-secondary ${activeTab === 'verificationForm' ? 'font-bold' : ''}`}
              onClick={() => { setActiveTab('verificationForm'); onClose(); }}
            >
              {t('Sidebar.verificationPage')}
            </li>}
          </ul>
        </div>
      </div>
      <Button variant='link' className='text-secondary' onClick={handleLogout} label={t('logout')} />
    </div>
  );
};

export default Sidebar;
