import { createTheme } from "@mui/material/styles"

export const getTheme = (themeMode: string) => {
  return createTheme({
    palette: {
      mode: themeMode === 'light' ? 'dark' : 'light',
      primary: {
        main: '#087EA4',
      },
      secondary: {
        main: '#26843f',
      },
    },
  })
}