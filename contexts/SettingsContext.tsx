import React, { createContext, useContext, useState } from 'react';

type SettingsType = 'profile' | 'workspace' | 'help' | null;

interface SettingsContextType {
  settingsType: SettingsType;
  openSettings: (type: 'profile' | 'workspace' | 'help') => void;
  closeSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settingsType, setSettingsType] = useState<SettingsType>(null);

  const openSettings = (type: 'profile' | 'workspace' | 'help') => {
    setSettingsType(type);
  };

  const closeSettings = () => {
    setSettingsType(null);
  };

  return (
    <SettingsContext.Provider value={{ settingsType, openSettings, closeSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
