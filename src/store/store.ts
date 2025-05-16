import { configureStore } from '@reduxjs/toolkit';

import { todolistApi } from '@/api/todolistApi.ts';
import { appSlice } from '@/store/appSlice.ts';

export const store = configureStore({
  reducer: {
    [todolistApi.reducerPath]: todolistApi.reducer,
    [appSlice.name]: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
