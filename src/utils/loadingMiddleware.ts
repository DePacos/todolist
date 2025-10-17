import type { Middleware } from '@reduxjs/toolkit';

import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { setIsLoading } from '@/app/reducer';

export const loadingMiddleware: Middleware = (store) => (next) => (action) => {
  if (isPending(action)) {
    store.dispatch(setIsLoading(true));
  }

  if (isFulfilled(action) || isRejected(action)) {
    store.dispatch(setIsLoading(false));
  }

  return next(action);
};
