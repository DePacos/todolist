import type { Request, Response } from '@/types';

import { todolistApi } from '@/app/api';

const authApi = todolistApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Response<{ userId: number; token: string }>, Request>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<Response<{}>, void>({
      query: () => ({
        url: 'auth/login',
        method: 'DELETE',
      }),
      invalidatesTags: ['Me'],
    }),
    me: builder.query<Response<{ userId: number; email: string }>, void>({
      query: () => 'auth/me',
      providesTags: ['Me'],
    }),
  }),
});

export const { useLoginMutation, useMeQuery, useLogoutMutation } = authApi;
