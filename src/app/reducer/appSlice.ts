import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: localStorage.getItem('theme') || ('light' as 'dark' | 'light'),
    error: null as string | null,
    isAppLoading: false,
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
  },
  selectors: {
    selectTheme: (state) => state.theme,
    selectError: (state) => state.error,
    selectLoading: (state) => state.isAppLoading,
  },
});

export const { selectTheme, selectError, selectLoading } = appSlice.selectors;
export const { setTheme, setError, setIsLoading } = appSlice.actions;
