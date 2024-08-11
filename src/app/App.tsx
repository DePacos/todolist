import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { authActions } from "features/auth/authSlice"
import { Outlet } from "react-router-dom"
import { Header } from "components/Header/Header"
import "./App.css"
import { SM } from "styles/material-styles"
import Box from "@mui/material/Box"
import { CircularProgress, CssBaseline } from "@mui/material"
import { useAppDispatch } from "common/hooks"
import { selectIsInitialized } from "app/appSelectors"
import { ThemeProvider } from "theme/ThemeContext"

export const App = () => {
    const isInitialized = useSelector(selectIsInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authActions.initializeApp())
    }, [])

    if (!isInitialized) {
        return (
            <Box sx={SM.wrapCircularProgress}>
                <CircularProgress />
            </Box>
        )
    }
    return (
        <ThemeProvider>
            <CssBaseline />
            <div className="App">
                <Header/>
                <Outlet/>
            </div>
        </ThemeProvider>
    )
}