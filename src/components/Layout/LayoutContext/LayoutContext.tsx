import React, { createContext, useContext, useState, ReactNode } from 'react';
import styles from './LayoutContext.module.css';

interface LayoutContextProps {
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
}

const LayoutContext = createContext<LayoutContextProps>({
  backgroundColor: styles.background,
  setBackgroundColor: () => {},
});

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(styles.background);

  return (
    <LayoutContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  return useContext(LayoutContext);
};