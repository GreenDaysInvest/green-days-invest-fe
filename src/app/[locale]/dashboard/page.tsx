"use client";
import ProtectedRoute from '@/app/components/ProtectedRoute/ProtectedRoute';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import Questionaries from '@/app/components/Questionaries/Questionaries';
import Profile from '@/app/components/Profile/Profile';
import { useState } from 'react';
import QuestionnaireList from '@/app/components/QuestionaireList/QuestionaireList';
import { useApp } from '@/app/context/AppContext';
import Basket from '@/app/components/Basket/Basket';
import Checkout from '@/app/components/Checkout/Checkout';
import StripeProvider from '@/app/components/StripeProvider/StripeProvider';
import VerificationForm from '@/app/components/VerificationForm/VerificationForm';

const Dashboard: React.FC = () => {
  
  const { activeTab } = useApp();
  const [showSidebar, setShowSidebar] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'questionariesList':
        return <QuestionnaireList />;
      case 'questionaries':
        return <Questionaries />;
      case 'profile':
        return <Profile />;
      case 'basket':
        return <Basket />;
      case 'verificationForm':
        return <VerificationForm />;
      case 'checkout':
        return <Checkout />;
      default:
        return <QuestionnaireList />;
    }
  };

  return (
    <ProtectedRoute>
      <StripeProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`fixed md:static z-10 h-full ${showSidebar ? 'block' : 'hidden md:block'}`}>
          <Sidebar onClose={() => setShowSidebar(false)} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen overflow-y-auto">
          {/* Mobile toggle button */}
          <button
            className="md:hidden mb-4 text-secondary"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "Close Sidebar" : "Open Sidebar"}
          </button>
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
      </StripeProvider>
    </ProtectedRoute>
  );
};

export default Dashboard;
