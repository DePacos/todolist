import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: localStorage.getItem('theme') || ('light' as 'dark' | 'light'),
    error: null as string | null,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  selectors: {
    selectTheme: (state) => state.theme,
    selectError: (state) => state.error,
  },
});

export const { selectTheme, selectError } = appSlice.selectors;
export const { setTheme, setError } = appSlice.actions;
