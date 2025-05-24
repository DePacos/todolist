import type { Request, Response } from '@/types/types.ts';

import { todolistApi } from '@/app/api/todolistApi.ts';

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
    }),
    me: builder.query<Response<{ userId: number; email: string }>, void>({
      query: () => 'auth/me',
    }),
  }),
});

export const { useLoginMutation, useMeQuery, useLogoutMutation } = authApi;
