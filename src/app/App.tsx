import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../store/store"
import { authActions } from "../store/reducers/auth-reducer"
import { Outlet } from "react-router-dom"
import { selectIsInitialized } from "app/appSelectors"
import { Header } from "../components/Header"
import "./App.css"
import { SM } from "../styles/material-styles"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CircularProgress } from "@mui/material"


export const App = () => {
    const isInitialized = useSelector(selectIsInitialized)
    const [themeMode, setThemeMode] = React.useState<ThemeMode>('light')
    const changeModeHandler = React.useCallback(() => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }, [themeMode])

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authActions.initializeApp())
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