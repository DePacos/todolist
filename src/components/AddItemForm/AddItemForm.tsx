import React from "react";
import {BasicButton} from "../Button";
import {Controller, useForm, SubmitHandler} from "react-hook-form";
import {SM} from "../../styles/material-styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';


export const AddItemForm = React.memo(({addItem, disable = false}:PropsType) => {
    const {
        control,
        handleSubmit,
        formState: {errors}, reset} = useForm<Input>({
            defaultValues: {
                task: "",
            },
            mode: "onChange"
    })

    const onSubmit: SubmitHandler<Input> = (data) => {
        addItem(data.task)
        reset()
    }

    return(
        <Box sx={SM.wrapTaskInput}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name={'task'}
                    rules={{
                        required: true,
                        minLength: 3,
                        maxLength: 20,
                    }}
                    render={({field: {onChange, value}}) => <TextField
                        error={!!errors.task}
                        onChange={onChange}
                        sx={SM.addTaskInput}
                        value={value || ''}
                        label="Add task"
                        variant="outlined"
                        size={"small"}
                        // helperText={errors.task ? 'Please enter a value between 3 and 20 characters': ''}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PlaylistAddCheckIcon/>
                                </InputAdornment>)
                        }}
                        disabled={disable}
                    />}
                    control={control}
                />
                <BasicButton
                    disabled={!!errors.task || disable}
                    title="Add"
                    type={'submit'}
                    color={"success"}
                    variant={"contained"}
                />
                {errors.task && <span className='errorMassage'>Please enter a value between 3 and 20 characters</span>}
            </form>
        </Box>
    )
})


type Input = {
    task: string
}

type PropsType = {
    addItem: (inputValue: string) => void
    disable?: boolean
}