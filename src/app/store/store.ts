import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { todolistApi } from '@/app/api/todolistApi.ts';
import { appSlice } from '@/app/reducer/appSlice.ts';
import { loadingMiddleware } from '@/utils/loadingMiddleware.ts';

const rootReducer = combineReducers({
  [todolistApi.reducerPath]: todolistApi.reducer,
  [appSlice.reducerPath]: appSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todolistApi.middleware).concat(loadingMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
