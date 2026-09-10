import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { lightColors, darkColors, ColorTokens } from './colors';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { MantineThemeOverride } from '@mantine/core';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  colors: ColorTokens;
  mantineTheme: MantineThemeOverride;
  toggleThemeMode: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'hms_theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    }
    return 'light';
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
      const root = document.documentElement;
      if (mode === 'dark') {
        root.classList.add('dark');
        root.setAttribute('data-mantine-color-scheme', 'dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-mantine-color-scheme', 'light');
      }
    } catch (e) {
      console.error('Failed to save theme to localStorage', e);
    }
  }, [mode]);

  const toggleThemeMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const colors = useMemo(() => (mode === 'dark' ? darkColors : lightColors), [mode]);
  const mantineTheme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        isDark: mode === 'dark',
        colors,
        mantineTheme,
        toggleThemeMode,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};
