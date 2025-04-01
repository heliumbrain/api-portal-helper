
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLayout } from '@/contexts/LayoutContext';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  BookOpen, 
  BarChart, 
  Settings, 
  Users,
  Lock
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { sidebarExpanded, setSidebarExpanded, isMobile, branding } = useLayout();
  
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  
  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'API Catalog', path: '/apis', icon: BookOpen },
    { name: 'Analytics', path: '/analytics', icon: BarChart },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'API Keys', path: '/keys', icon: Lock },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];
  
  return (
    <>
      {/* Mobile overlay */}
      {isMobile && sidebarExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarExpanded(false)}
        />
      )}
      
      <aside 
        className={`fixed top-0 left-0 h-full bg-sidebar z-30
                   transition-all duration-300 ease-in-out shadow-lg
                   ${sidebarExpanded ? 'w-64' : 'w-20'}
                   ${isMobile && !sidebarExpanded ? '-translate-x-full' : 'translate-x-0'}`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header with logo */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className={`flex items-center overflow-hidden ${!sidebarExpanded && 'justify-center w-full'}`}>
              {branding.logo ? (
                <img 
                  src={branding.logo} 
                  alt={`${branding.name} Logo`} 
                  className="h-8 w-auto" 
                />
              ) : (
                <div className="h-8 w-8 rounded bg-brand flex items-center justify-center text-brand-foreground font-bold">
                  {branding.name.charAt(0)}
                </div>
              )}
              
              {sidebarExpanded && (
                <span className="ml-2 font-semibold text-sidebar-foreground truncate">
                  {branding.name}
                </span>
              )}
            </div>
            
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {sidebarExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </Button>
            )}
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 py-4 px-2">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center py-2 px-4 rounded-md transition-colors
                      ${isActive 
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }
                      ${!sidebarExpanded && 'justify-center'}
                    `}
                  >
                    <item.icon size={20} />
                    {sidebarExpanded && <span className="ml-3">{item.name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile toggle at the bottom */}
          {isMobile && (
            <div className="p-4 border-t border-sidebar-border">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSidebar}
                className="w-full text-sidebar-foreground"
              >
                {sidebarExpanded ? 'Close Menu' : 'Menu'}
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
