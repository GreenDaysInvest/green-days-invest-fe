"use client";
import ProtectedRoute from '@/app/components/ProtectedRoute/ProtectedRoute';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import Questionaries from '@/app/components/Questionaries/Questionaries';
import Profile from '@/app/components/Profile/Profile';
import { useState } from 'react';
import QuestionnaireList from '@/app/components/QuestionaireList/QuestionaireList';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('questionaries');
  const [showSidebar, setShowSidebar] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'questionaries':
        return <Questionaries />;
      case 'questionariesList':
        return <QuestionnaireList />;
      case 'profile':
        return <Profile />;
      default:
        return <Questionaries />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed md:static z-10 ${showSidebar ? 'block' : 'hidden md:block'}`}>
          <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} onClose={() => setShowSidebar(false)} />
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6">
          {/* Mobile toggle button */}
          <button
            className="md:hidden mb-4 text-secondary"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "Close Sidebar" : "Open Sidebar"}
          </button>
          {renderContent()}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
