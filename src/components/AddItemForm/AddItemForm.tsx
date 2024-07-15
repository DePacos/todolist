import React from "react";
import {BasicButton} from "../Button";
import {Controller, useForm, SubmitHandler} from "react-hook-form";
import {SM} from "../../styles/material-styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';


export const AddItemForm = React.memo(({addItem, inputLabel, disable = false, }:PropsType) => {
    const {
        control,
        handleSubmit,
        formState: {errors}, reset} = useForm<Input>({
        mode: "onChange",
        defaultValues: {
            inputName: '',
        }
    })

    const onSubmit: SubmitHandler<Input> = (data) => {
        addItem(data.inputName)
        reset()
    }

    return(
            <Box component="form" sx={SM.itemForm} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name={'inputName'}
                    rules={{
                        required: true,
                        minLength: 3,
                        maxLength: 20,
                    }}
                    render={({field: {onChange, value}}) =>
                        <TextField
                        error={!!errors.inputName}
                        onChange={onChange}
                        sx={SM.itemInput}
                        value={value || ''}
                        label={inputLabel || ''}
                        variant="outlined"
                        size="small"
                        helperText={errors.inputName ? 'Please enter a value between 3 and 20 characters' : ''}
                        FormHelperTextProps={{sx:{position:"absolute", bottom: '-25px', width: "max-content"}}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PlaylistAddCheckIcon/>
                                </InputAdornment>)
                        }}
                        disabled={disable}
                    />}
                />
                <BasicButton
                    title="Add"
                    type="submit"
                    color="success"
                    variant="contained"
                    disabled={!!errors.inputName || disable}
                />
            </Box>
    )
})


type Input = {
    inputName: string
}

type PropsType = {
    addItem: (inputValue: string) => void
    inputLabel?: string
    disable?: boolean
}