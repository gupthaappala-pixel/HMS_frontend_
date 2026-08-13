import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AiAssistantWidget } from '../AiAssistantWidget';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 pl-64">
        {/* Fixed Header */}
        <Header />

        {/* Page View Container */}
        <main className="pt-20 px-8 pb-12 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Minimal AI Assistant & Voice Widget */}
      <AiAssistantWidget />
    </div>
  );
};
