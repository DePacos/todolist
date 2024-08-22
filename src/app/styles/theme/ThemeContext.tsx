import React, { createContext, useMemo, useState, useContext, ReactNode } from "react"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { getTheme } from "app/styles/theme/theme"

type ThemeContext = {
  themeMode: string;
  toggleTheme: () => void;
}

type ThemeProvider = {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContext | null>(null)

export const ThemeProvider = ({ children }: ThemeProvider) => {
  const [themeMode, setThemeMode] = useState("light")
  const theme = useMemo(() => getTheme(themeMode), [themeMode])
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = (): ThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};