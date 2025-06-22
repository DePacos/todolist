import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { handleError } from '@/utils/handleError.ts';

const baseUrl = import.meta.env.VITE_BASE_API_URL || '';
const APIKEY = import.meta.env.VITE_API_KEY || '';

export const todolistApi = createApi({
  reducerPath: 'todolistApi',
  tagTypes: ['Columns'],
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: baseUrl,
      prepareHeaders: (headers) => {
        headers.set('API-KEY', APIKEY);
        headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
      },
    })(args, api, extraOptions);

    handleError(api, result);

    return result;
  },
  endpoints: () => ({}),
});
