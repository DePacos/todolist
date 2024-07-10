import {setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../store/reducers/app-reducers";
import {ResponseType} from "../api/todolistsAPI"
import {Dispatch} from "redux";



export const handleServerAppError = <D> (data: ResponseType<D>, dispatch: Dispatch<SetAppErrorType | SetAppStatusType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<SetAppErrorType | SetAppStatusType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}