import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ExpenseProvider } from '../contexts/ExpenseContext';
import Sidebar from './Sidebar';
import ExpensesPage from './ExpensesPage';
import DashboardPage from './DashboardPage';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleLogout = () => {
    logout();
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <DashboardPage />;
      case 'despesas':
        return <ExpensesPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />

        {/* Main Content */}
        <div className="ml-64">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {activeItem === 'dashboard' ? 'Dashboard' : 'Despesas'}
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-700">
                    Olá, <span className="font-medium">{user?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </ExpenseProvider>
  );
};

export default Dashboard; 