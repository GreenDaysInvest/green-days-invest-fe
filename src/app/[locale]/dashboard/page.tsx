"use client";
import ProtectedRoute from '@/app/components/ProtectedRoute/ProtectedRoute';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import Questionaries from '@/app/components/Questionaries/Questionaries';
import Profile from '@/app/components/Profile/Profile';
import { useState } from 'react';
import QuestionnaireList from '@/app/components/QuestionaireList/QuestionaireList';
import { useApp } from '@/app/context/AppContext';

const Dashboard: React.FC = () => {
  
  const { activeTab } = useApp();
  const [showSidebar, setShowSidebar] = useState(false);
console.log(activeTab,"actvetab")
  const renderContent = () => {
    switch (activeTab) {
      case 'questionariesList':
        return <QuestionnaireList />;
      case 'questionaries':
        return <Questionaries />;
      case 'profile':
        return <Profile />;
      default:
        return <QuestionnaireList />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed md:static z-10 ${showSidebar ? 'block' : 'hidden md:block'}`}>
          <Sidebar onClose={() => setShowSidebar(false)} />
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
