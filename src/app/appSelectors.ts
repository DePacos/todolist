import { AppRootState } from "store/store"

export const selectIsInitialized = (state: AppRootState) => state.app.isInitialized