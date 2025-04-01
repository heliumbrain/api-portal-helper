
import React from 'react';
import { Sidebar } from './Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useLayout } from '@/contexts/LayoutContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { sidebarExpanded, isMobile } = useLayout();
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarExpanded && !isMobile ? 'ml-64' : 'ml-0'
        }`}
      >
        <main className="container py-6">
          {children}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};
