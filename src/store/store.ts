import { configureStore } from '@reduxjs/toolkit';

import { todolistApi } from '@/app/api/todolistApi.ts';
import { appSlice } from '@/app/reducer/appSlice.ts';
import { loadingMiddleware } from '@/utils/loadingMiddleware.ts';

export const store = configureStore({
  reducer: {
    [todolistApi.reducerPath]: todolistApi.reducer,
    [appSlice.name]: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todolistApi.middleware).concat(loadingMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
