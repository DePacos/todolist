import { appActions, appSlice, RequestStatusType } from "app/appSlice"

let initialState: {
  isInitialized: boolean
  status: RequestStatusType
  error: null | string
}

beforeEach(() => {
  initialState = {
    isInitialized: false,
    status: "idle",
    error: null,
  }
})

test("correct isInitialized should be set", () => {
  const endState = appSlice(initialState, appActions.setIsInitialized ({ isInitialized: true }))

  expect(endState.isInitialized).toBe(true)
})

test("correct error message should be set", () => {
  const endState = appSlice(initialState, appActions.setError({ error: "error" }))

  expect(endState.error).toBe("error")
})
