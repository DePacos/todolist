import { authAPI, LoginParams } from "features/auth/api/authAPI"
import {
  asyncThunkCreator,
  buildCreateSlice,
  isFulfilled,
} from "@reduxjs/toolkit"
import { appActions } from "app/appSlice"
import { ResultCode } from "common/enums/commonEnums"
import { RejectAppError, RejectCatchError } from "common/types"
import { todolistActions } from "features/Todolists/model/todolistSlice"

const createAuthSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

export const sliceAuth = createAuthSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: (creators) => {
    return {
      setIsLoggedIn: creators.asyncThunk(
        async (data: LoginParams, { rejectWithValue }): Promise<any> => {
          try {
            const res = await authAPI.login(data)
            if (res.data.resultCode === ResultCode.Success) {
              return { isLoggedIn: true }
            } else {
              return rejectWithValue({
                error: res.data,
                type: "appError",
              } satisfies RejectAppError)
            }
          } catch (error) {
            return rejectWithValue({
              error,
              type: "catchError",
            } satisfies RejectCatchError)
          }
        },
      ),

      initializeApp: creators.asyncThunk(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            const res = await authAPI.me()
            if (res.data.resultCode === ResultCode.Success) {
              return { isLoggedIn: true }
            } else {
              return rejectWithValue({
                error: res.data,
                type: "appError",
              } satisfies RejectAppError)
            }
          } catch (error) {
            return rejectWithValue({
              error,
              type: "catchError",
            } satisfies RejectCatchError)
          } finally {
            dispatch(appActions.setIsInitialized({ isInitialized: true }))
          }
        },
      ),

      logout: creators.asyncThunk(async (_, { dispatch, rejectWithValue }) => {
        try {
          const res = await authAPI.logout()
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(todolistActions.clearingTodolistWhenLogout())
            return { isLoggedIn: false }
          } else {
            return rejectWithValue({
              error: res.data,
              type: "appError",
            } satisfies RejectAppError)
          }
        } catch (error) {
          return rejectWithValue({
            error,
            type: "catchError",
          } satisfies RejectCatchError)
        }
      }),
    }
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      isFulfilled(
        authActions.setIsLoggedIn,
        authActions.initializeApp,
        authActions.logout,
      ),
      (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      },
    )
  },
})

export const authActions = sliceAuth.actions
export const authSlice = sliceAuth.reducer
