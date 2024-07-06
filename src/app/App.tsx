import React from 'react';
import './App.css';
import {Header} from "../components/Header";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {TodoListsList} from "../features/Todolists/TodoListsList";


export const App = () => {
    const [themeMode, setThemeMode] = React.useState<ThemeMode>('light')
    const changeModeHandler = React.useCallback(() => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }, [themeMode])

    const theme = React.useMemo(() => {
        return createTheme({
            palette: {
                mode: themeMode === 'light' ? 'light' : 'dark',
                primary: {
                    main: '#087EA4',
                },
            },
        })
    }, [themeMode])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <Header theme={theme} changeModeHandler={changeModeHandler}/>
                <TodoListsList/>
            </div>
        </ThemeProvider>
    );
}


type ThemeMode = 'dark' | 'light'