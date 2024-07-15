import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "../store/reducers/app-reducers";


let initialState: InitialStateType

beforeEach(() => {
    initialState = {
        isInitialized: false,
        status: 'idle',
        error: null
    }
})

test('correct status should be set', () => {
    const endState = appReducer(initialState, setAppStatusAC('failed'))

    expect(endState.status).toBe('failed')
})

test('correct error message should be set', () => {
    const endState = appReducer(initialState, setAppErrorAC('error'))

    expect(endState.error).toBe('error')
})