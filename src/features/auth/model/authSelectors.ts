import { AppRootState } from "app/store"

export const selectAuthIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn