
import React, { createContext, useContext, useState, useEffect } from 'react';

type LayoutContextType = {
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  isMobile: boolean;
  branding: {
    logo: string;
    name: string;
    primaryColor: string;
  };
  updateBranding: (branding: Partial<{ logo: string; name: string; primaryColor: string }>) => void;
};

const defaultBranding = {
  logo: '', // Default to empty, will be replaced with placeholder
  name: 'API Portal',
  primaryColor: '221.2 83% 53.3%', // Default blue
};

const LayoutContext = createContext<LayoutContextType>({
  sidebarExpanded: true,
  setSidebarExpanded: () => {},
  isMobile: false,
  branding: defaultBranding,
  updateBranding: () => {},
});

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [branding, setBranding] = useState(defaultBranding);

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarExpanded(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Load branding from localStorage if available
  useEffect(() => {
    const savedBranding = localStorage.getItem('apiPortalBranding');
    if (savedBranding) {
      setBranding(JSON.parse(savedBranding));
      
      // Apply the primary color as CSS variable
      const brandColor = JSON.parse(savedBranding).primaryColor;
      if (brandColor) {
        document.documentElement.style.setProperty('--brand', brandColor);
        document.documentElement.style.setProperty('--primary', brandColor);
        document.documentElement.style.setProperty('--sidebar-primary', brandColor);
        document.documentElement.style.setProperty('--ring', brandColor);
      }
    }
  }, []);

  const updateBranding = (newBranding: Partial<typeof branding>) => {
    const updatedBranding = { ...branding, ...newBranding };
    setBranding(updatedBranding);
    localStorage.setItem('apiPortalBranding', JSON.stringify(updatedBranding));
    
    // Apply the primary color as CSS variable if changed
    if (newBranding.primaryColor) {
      document.documentElement.style.setProperty('--brand', newBranding.primaryColor);
      document.documentElement.style.setProperty('--primary', newBranding.primaryColor);
      document.documentElement.style.setProperty('--sidebar-primary', newBranding.primaryColor);
      document.documentElement.style.setProperty('--ring', newBranding.primaryColor);
    }
  };

  return (
    <LayoutContext.Provider 
      value={{ 
        sidebarExpanded, 
        setSidebarExpanded, 
        isMobile,
        branding,
        updateBranding
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
