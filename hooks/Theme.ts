// src/theme.ts
import { useThemeContext } from '../app/context/ThemeContext';

export const lightTheme = {
  background: '#f4f4f9',
  text: '#222',
  card: '#fff',
  subtext: '#666',
  primary: '#5a4fcf',
};

export const darkTheme = {
  background: '#121212',
  text: '#f4f4f9',
  card: '#1e1e1e',
  subtext: '#aaa',
  primary: '#7b6ef6',
};

export const useTheme = () => {
  const { darkMode } = useThemeContext();
  return darkMode ? darkTheme : lightTheme;
};
