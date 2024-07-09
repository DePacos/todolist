const initialState = {
    status: 'idle' as RequestStatusType,
    error: null
}

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.payload.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.payload.error }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', payload: {status}} as const)

export const setAppErrorAC = (error: string | null) =>
    ({ type: 'APP/SET-ERROR', payload: {error} } as const)


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>

type ActionsType =
    | SetAppStatusType
    | SetAppErrorType
