import React from 'react';
import { useThemeContext } from 'app/styles/theme/ThemeContext';
import Switch from "@mui/material/Switch"

const ThemeToggleButton = () => {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <Switch onClick={toggleTheme}/>
  );
};

export default ThemeToggleButton;
