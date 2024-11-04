"use client";
import ProtectedRoute from '@/app/components/ProtectedRoute/ProtectedRoute';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import Questionaries from '@/app/components/Questionaries/Questionaries';
import Profile from '@/app/components/Profile/Profile';
import { useState } from 'react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('questionaries');

  const renderContent = () => {
    switch (activeTab) {
      case 'questionaries':
        return <Questionaries />;
      case 'profile':
        return <Profile />;
      default:
        return <Questionaries />;
    }
  };

  return (
    <ProtectedRoute>
        <div className="flex">
          <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
          <div className="flex-grow p-6">
            {renderContent()}
          </div>
        </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
