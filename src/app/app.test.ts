import { appActions, appReducer, RequestStatusType } from "app/appSlice"

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

test("correct status should be set", () => {
  const endState = appReducer(initialState, appActions.setStatus({ status: "failed" }))

  expect(endState.status).toBe("failed")
})

test("correct error message should be set", () => {
  const endState = appReducer(initialState, appActions.setError({ error: "error" }))

  expect(endState.error).toBe("error")
})
