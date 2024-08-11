import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { RejectActionError } from "common/types"
import axios from "axios"

export const sliceApp = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
    status: "idle" as RequestStatusType,
    error: null as null | string,
  },
  reducers: {
    setError(state, action: PayloadAction<{ error: null | string }>) {
      state.error = action.payload.error
    },
    setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(isPending, (state) => {
          state.status = "loading"
        }
      )
      .addMatcher(isFulfilled, (state) => {
          state.status = "succeeded"
        }
      )
      .addMatcher(isRejected, (state) => {
          state.status = "failed"
        }
      )
      .addMatcher(
        (action): action is PayloadAction<RejectActionError> => {
          return isRejected(action) && action.payload
        },
        (state, action: PayloadAction<RejectActionError>) => {
          const defaultMessage = "Some error occurred"

          switch (action.payload.type) {
            case "appError": {
              const error = action.payload.error
              state.error = error.messages.length ? error.messages[0] : defaultMessage
              break
            }

            case "catchError": {
              const error = action.payload.error
              if (axios.isAxiosError(error)) {
                state.error = error.response?.data?.message || error?.message || defaultMessage
              } else if (error instanceof Error) {
                state.error = `Native error: ${error.message}`
              } else {
                state.error = JSON.stringify(error)
              }
              break
            }

            default:
              state.error = defaultMessage
          }
        },
      )
      .addDefaultCase((state, action) => {
        console.log(action)
      })
  }
})

export const appSlice = sliceApp.reducer
export const appActions = sliceApp.actions

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"