import { RootState } from '@/store/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import type { IUserState } from '../../types/user';

export interface UserToken {
  access: { token: string; expires: Date | null };
  refresh: { token: string; expires: Date | null };
}

export interface UserResponse {
  user: IUserState;
  tokens: UserToken;
}

export const authApiService = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mujibu-server-fau1.onrender.com/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, void>({
      query: () => ({
        url: '/auth/firebase-google',
        method: 'POST',
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
});

export const { useLoginMutation, useProtectedMutation } = authApiService;
