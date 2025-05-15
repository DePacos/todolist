import { createContext } from 'react';

type Props = {
  theme: string;
  toggleTheme: () => void;
} | null;

export const ThemeContext = createContext<Props>(null);
