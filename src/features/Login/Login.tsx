import React from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../store/store";
import {Navigate} from "react-router-dom";
import {BasicButton} from "../../components/Button";
import {loginTC} from "../../store/reducers/auth-reducer";


export const Login = () => {
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const {
        control,
        handleSubmit,
        formState:{errors}, reset} = useForm<Inputs>({
        mode: "onBlur"
        }
    )

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(loginTC(data))
    }

    if (isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return (
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{marginTop: '80px'}}>
                        <Controller
                            control={control}
                            name={'email'}
                            rules={{
                                required: 'Email required',
                                pattern:
                                    {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Incorrect email'
                                    }
                            }}
                            render={({field}) =>
                                <TextField
                                    {...field}
                                    type="email"
                                    error={!!errors.email}
                                    // sx={SM.}
                                    label="Email"
                                    variant="outlined"
                                    size="small"
                                    helperText={errors.email ? errors.email.message : ''}
                                />}
                        />
                        <Controller
                            control={control}
                            name={'password'}
                            rules={{
                                required: 'Password required',
                            }}
                            render={({field}) =>
                                <TextField
                                    {...field}
                                    type="password"
                                    error={!!errors.password}
                                    // sx={SM.}
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    helperText={errors.password ? errors.password.message : ''}
                                />}
                        />
                        <Controller
                            control={control}
                            name={'rememberMe'}
                            render={({field}) =>
                                <TextField
                                    {...field}
                                    type="checkbox"
                                    // sx={SM.}
                                    // label="check"
                                    variant="outlined"
                                    size="small"
                                    helperText={'me'}
                                />}
                        />
                        <BasicButton
                            title="Login"
                            type="submit"
                            color="success"
                            variant="contained"
                        />
                    </form>
                </Grid>
            </Grid>
    )
}


type Inputs = {
    email: string
    password: string
    rememberMe: boolean
}