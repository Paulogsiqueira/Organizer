import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

interface LocalStorageContextProps {
  localStorageChanged: boolean;
  setLocalStorageChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocalStorageContext = createContext<LocalStorageContextProps | undefined>(undefined);

export const LocalStorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [localStorageChanged, setLocalStorageChanged] = useState<boolean>(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setLocalStorageChanged((prev) => !prev);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <LocalStorageContext.Provider value={{ localStorageChanged, setLocalStorageChanged }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorage = () => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error('useLocalStorage must be used within a LocalStorageProvider');
  }
  return context;
};
