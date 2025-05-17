import type {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query/react';

import { setError } from '@/app/reducer/appSlice.ts';
import { RESULTCODE } from '@/constants/resultCode';

import { isErrorWithMessage } from './isErrorWithMessage';

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  let error = 'Some error occurred';

  if (result.error) {
    switch (result.error.status) {
      case 'FETCH_ERROR':
      case 'PARSING_ERROR':
      case 'CUSTOM_ERROR':
        error = result.error.error;
        break;
      case 400:
        error = '400 Bad Request';
        break;
      case 403:
        error = '403 Forbidden';
        break;
      case 500:
        if (isErrorWithMessage(result.error.data)) {
          error = result.error.data.message;
        } else {
          error = JSON.stringify(result.error.data);
        }
        break;
      default:
        error = JSON.stringify(result.error);
        break;
    }
    api.dispatch(setError(error));
  }

  if (api.endpoint === 'login' || api.endpoint === 'me') return;

  if ((result.data as { resultCode: number }).resultCode === RESULTCODE.error) {
    const messages = (result.data as { messages: string[] }).messages;
    error = messages.length ? messages[0] : error;
    api.dispatch(setError(error));
  }
};
