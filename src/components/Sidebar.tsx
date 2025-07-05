import React from 'react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-indigo-600">
        <div className="flex items-center">
          <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="ml-2 text-white font-bold text-lg">ContaCerta</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          <button
            onClick={() => onItemClick('dashboard')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeItem === 'dashboard'
                ? 'bg-indigo-100 text-indigo-700 border-r-2 border-indigo-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Dashboard
          </button>
          <button
            onClick={() => onItemClick('despesas')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeItem === 'despesas'
                ? 'bg-indigo-100 text-indigo-700 border-r-2 border-indigo-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Despesas
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 