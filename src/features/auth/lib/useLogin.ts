import { SubmitHandler, useForm } from "react-hook-form"
import { authActions } from "features/auth/model/authSlice"
import { RejectAppError } from "common/types"
import { useAppDispatch } from "common/hooks"

export const useLogin = () => {
  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    reset
  } = useForm<Inputs>({
    mode: "onBlur"
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(authActions.setIsLoggedIn(data))
      .unwrap()
      .catch((reason: RejectAppError) => {
        reason.error.fieldsErrors?.forEach((el) => {
          if (el.field === "email") {
            setError("email", {
              type: "manual",
              message: el.error
            })
          } else if (el.field === "password") {
            setError("password", {
              type: "manual",
              message: el.error
            })
          } else {
            reset()
          }
        })
      })
  }
  return {control, handleSubmit, onSubmit, errors, isValid}
}

type Inputs = {
  email: string
  password: string
  rememberMe: boolean
}