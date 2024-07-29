import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const sliceApp = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
    status: "idle" as RequestStatusType,
    error: null as null | string,
  },
  reducers: {
    setStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setError(state, action: PayloadAction<{ error: null | string }>) {
      state.error = action.payload.error
    },
    setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = sliceApp.reducer
export const appActions = sliceApp.actions

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
