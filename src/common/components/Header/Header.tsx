import React from "react"
import { MenuButton } from "common/components/Buttons/MenuButton"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { LinearProgress } from "@mui/material"
import { useSelector } from "react-redux"
import { useAppDispatch } from "common/hooks"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { Link } from "react-router-dom"
import { authActions } from "features/auth/authSlice"
import { selectAppStatus } from "app/appSelectors"
import { selectAuthIsLoggedIn } from "features/auth/authSelectors"
import ThemeToggleButton from "theme/ThemeToggleButton"

export const Header = () => {
  const status = useSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectAuthIsLoggedIn)
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <AppBar position="fixed">
      <ErrorSnackbar />
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/todolists">TodoList</Link>
        </Typography>
        <MenuButton color="inherit">Faq</MenuButton>
        {isLoggedIn ? (
          <MenuButton
            onClick={handleLogout}
            color="inherit"
          >
            Logout
          </MenuButton>
        ) : (
          <MenuButton
            color="inherit">
            <Link to="/login">Login</Link>
          </MenuButton>
        )}
        <ThemeToggleButton/>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
