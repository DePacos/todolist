import type { LoginRequest } from '@/schemas';
import type { LoginResponse, MeResponse, Response } from '@/types';

import { todolistApi } from '@/app/api';

const authApi = todolistApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Response<LoginResponse>, LoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<Response<{}>, void>({
      query: () => ({
        url: 'auth/login',
        method: 'DELETE',
      }),
      invalidatesTags: ['Me'],
    }),
    me: builder.query<Response<MeResponse>, void>({
      query: () => 'auth/me',
      providesTags: ['Me'],
    }),
  }),
});

export const { useLoginMutation, useMeQuery, useLogoutMutation } = authApi;
