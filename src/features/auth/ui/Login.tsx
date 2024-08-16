import React from "react"
import TextField from "@mui/material/TextField"
import { Controller } from "react-hook-form"
import { useSelector } from "react-redux"
import { AppRootState } from "app/store"
import { Navigate } from "react-router-dom"
import { BasicButton } from "common/components/Buttons/BasicButton"
import { SM } from "app/styles/material-styles"
import Box from "@mui/material/Box"
import { Avatar, Container, FormControlLabel } from "@mui/material"
import Typography from "@mui/material/Typography"
import Checkbox from "@mui/material/Checkbox"
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined"
import { useLogin } from "features/auth/lib/useLogin"

export const Login = () => {
  const isLoggedIn = useSelector<AppRootState, boolean>((state) => state.auth.isLoggedIn)
  const {
    handleSubmit,
    onSubmit,
    control,
    errors,
    isValid
  } = useLogin()

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <Container component="main" maxWidth="xs" sx={SM.loginFormContainer}>
      <Avatar variant="square" sx={SM.loginAvatar}>
        <EventAvailableOutlinedIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5" sx={SM.loginTitle}>
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={SM.loginForm}>
        <Controller
          control={control}
          name={"email"}
          rules={{
            required: "Email required",
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Incorrect email"
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              error={!!errors.email}
              label="Email*"
              variant="outlined"
              size="small"
              helperText={errors.email ? errors.email.message : ""}
              FormHelperTextProps={{ sx: { position: "absolute", bottom: "-21px" } }}
            />
          )}
        />
        <Controller
          control={control}
          name={"password"}
          rules={{
            required: "Password required"
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              error={!!errors.password}
              label="Password*"
              variant="outlined"
              size="small"
              helperText={errors.password ? errors.password.message : ""}
              FormHelperTextProps={{ sx: { position: "absolute", bottom: "-21px" } }}
            />
          )}
        />
        <Controller
          control={control}
          name={"rememberMe"}
          render={({ field }) => (
            <FormControlLabel
              {...field}
              sx={SM.loginLabelCheckbox}
              control={<Checkbox {...field} />}
              label="Remember me"
            />
          )}
        />
        <BasicButton
          title="Login"
          type="submit"
          color="success"
          variant="contained"
          disabled={!isValid}
        />
      </Box>
    </Container>
  )
}
