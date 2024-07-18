import React from 'react';
import {MenuButton} from "./MenuButton";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch'
import {LinearProgress, Theme} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../store/store";
import {RequestStatusType} from "../store/reducers/app-reducers";
import {ErrorSnackbar} from "./ErrorSnackbar/ErrorSnackbar";
import {Link} from "react-router-dom";
import {logoutTC} from "../store/reducers/auth-reducer";


export const Header = React.memo(( {changeModeHandler, theme}: HeaderProps) => {
    const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logoutTC())
    }

    return (
                <AppBar position="fixed" >
                    <ErrorSnackbar />
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            <Link to='/todolists'>TodoList</Link>
                        </Typography>
                        <MenuButton color="inherit">Faq</MenuButton>
                        {isLoggedIn
                            ?<MenuButton onClick={handleLogout} background={theme.palette.primary.dark} color="inherit">Logout</MenuButton>
                            :<MenuButton background={theme.palette.primary.dark} color="inherit"><Link to="/login">Login</Link></MenuButton>
                        }
                        <Switch color={'default'} onChange={changeModeHandler} />
                    </Toolbar>
                    {status === 'loading' && <LinearProgress />}
                </AppBar>
    );
})


type HeaderProps = {
    changeModeHandler: () => void
    theme: Theme
}