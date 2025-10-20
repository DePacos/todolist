import { createSlice } from '@reduxjs/toolkit';

import type { AppInitialState, ThemeMode } from '@/types';

import { SLICE_NAME, THEME_MODE } from '@/constants';

const themeMode = (localStorage.getItem('themeMode') || THEME_MODE.light) as ThemeMode;
const initialState: AppInitialState = {
  theme: themeMode,
  error: null,
  isAppLoading: false,
};

export const appSlice = createSlice({
  name: SLICE_NAME.app,
  initialState,
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
