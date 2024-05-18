import React from 'react';
import {MenuButton} from "./MenuButton";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {SM} from '../styles/material-styles'
import Switch from '@mui/material/Switch'
import {Theme} from "@mui/material";

type HeaderProps = {
    changeModeHandler: () => void
    theme: Theme
}

export const Header = ({changeModeHandler, theme}:HeaderProps) => {
    return (
                <AppBar sx={SM.wrapHeader} position="fixed" >
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
                            TodoList
                        </Typography>
                        <MenuButton color="inherit">Faq</MenuButton>
                        <MenuButton background={theme.palette.primary.dark} color="inherit">Login</MenuButton>
                        {/*<Button color="inherit">Logout</Button>*/}
                        <Switch color={'default'} onChange={changeModeHandler} />
                    </Toolbar>
                </AppBar>
    );
}