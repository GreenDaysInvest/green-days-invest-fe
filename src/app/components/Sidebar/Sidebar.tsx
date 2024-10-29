"use client";
import React from 'react';

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab }) => {
  return (
    <div className="w-64 bg-secondary h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul>
        <li
          className={`p-2 cursor-pointer ${activeTab === 'questionaries' ? 'bg-gray-300' : ''}`}
          onClick={() => setActiveTab('questionaries')}
        >
          Questionaries
        </li>
        <li
          className={`p-2 cursor-pointer ${activeTab === 'profile' ? 'bg-gray-300' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
