import React from "react"
import { BasicButton } from "common/components/Buttons/BasicButton"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { SM } from "app/styles/material-styles"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import InputAdornment from "@mui/material/InputAdornment"
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck"

export const AddItemForm =
  ({ addItem, inputLabel, disable = false }: Props) => {
    const {
      control,
      handleSubmit,
      setError,
      formState: { errors },
      reset,
    } = useForm<Input>({
      mode: "onChange",
      defaultValues: {
        inputName: "",
      },
    })

    const onSubmit: SubmitHandler<Input> = async (data) => {
      const res = await addItem(data.inputName)
      if (res.payload.error) {
        setError("inputName", {
          type: "manual",
          message: res.payload.error.messages[0]
        })
      }else{
        reset()
      }
    }

    return (
      <Box component="form" sx={SM.itemForm} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={"inputName"}
          rules={{
            required: 'Please enter a value',
            minLength: {
              value: 3,
              message: "Minimum value 3 letters",
            },
            maxLength: {
              value: 102,
              message: "Maximum 20 letters",
            }
          }}
          render={({ field: { onChange, value } }) => (
            <TextField
              error={!!errors.inputName}
              onChange={onChange}
              sx={SM.itemInput}
              value={value || ""}
              label={inputLabel || ""}
              variant="outlined"
              size="small"
              helperText={errors.inputName ? errors.inputName.message : ""}
              FormHelperTextProps={{
                sx: { position: "absolute", bottom: "-25px", width: "max-content" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PlaylistAddCheckIcon />
                  </InputAdornment>
                ),
              }}
              disabled={disable}
            />
          )}
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
  }

type Input = {
  inputName: string
}

type Props = {
  addItem: (inputValue: string) => Promise<any>
  inputLabel?: string
  disable?: boolean
}
