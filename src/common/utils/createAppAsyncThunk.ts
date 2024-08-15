import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppRootState, AppDispatch } from "app/store"
import { RejectAppError, RejectCatchError } from "common/types"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  dispatch: AppDispatch
  rejectValue: RejectCatchError | RejectAppError
}>()
