const initialState = {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', payload: {status}} as const)

export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', payload: {error}} as const)

export const setIsInitializedAC = (isInitialized: boolean) =>
    ({type: 'APP/SET-IS-INITIALIZED', isInitialized}) as const

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    isInitialized: boolean
    status: RequestStatusType
    error: string | null
}

export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>

type ActionsType =
    | SetAppStatusType
    | SetAppErrorType
    | SetIsInitializedType
