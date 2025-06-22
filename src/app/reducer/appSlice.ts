import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: localStorage.getItem('theme') || 'light',
    error: null as string | null,
    isAppLoading: false,
    token: null as null | string,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isAppLoading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  selectors: {
    selectTheme: (state) => state.theme,
    selectError: (state) => state.error,
    selectLoading: (state) => state.isAppLoading,
    selectToken: (state) => state.token,
  },
});

export const { selectTheme, selectError, selectLoading, selectToken } = appSlice.selectors;
export const { setTheme, setError, setIsLoading, setToken } = appSlice.actions;
