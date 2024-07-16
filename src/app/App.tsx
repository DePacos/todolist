import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../components/Header";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Outlet} from "react-router-dom";
import {AppRootState, useAppDispatch} from "../store/store";
import {meTC} from "../store/reducers/auth-reducer";
import {CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {SM} from "../styles/material-styles";


export const App = () => {
    const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized)
    const [themeMode, setThemeMode] = React.useState<ThemeMode>('light')
    const changeModeHandler = React.useCallback(() => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }, [themeMode])

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(meTC())
    }, [])

    const theme = React.useMemo(() => {
        return createTheme({
            palette: {
                mode: themeMode === 'light' ? 'light' : 'dark',
                primary: {
                    main: '#087EA4',
                },
                secondary: {
                    main: '#26843f',
                },
            },
        })
    }, [themeMode])

    if (!isInitialized) {
        return (
            <Box sx={SM.wrapCircularProgress}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <Header theme={theme} changeModeHandler={changeModeHandler}/>
                <Outlet/>
            </div>
        </ThemeProvider>
    );
}


type ThemeMode = 'dark' | 'light'