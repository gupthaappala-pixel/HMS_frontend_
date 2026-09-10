import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileSidebar } from './MobileSidebar';
import { AiAssistantWidget } from '../AiAssistantWidget';
import { useThemeMode } from '../../theme';

export const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark } = useThemeMode();

  return (
    <div
      className={`min-h-screen flex transition-colors duration-200 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Desktop Sidebar (hidden on mobile, fixed on >= lg) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 w-full lg:pl-64 flex flex-col min-h-screen">
        {/* Fixed Header */}
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Page View Container */}
        <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Clinical Assistant Widget */}
      <AiAssistantWidget />
    </div>
  );
};
