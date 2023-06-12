import { RootState } from '@/store/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import type { IUserState } from '../../types/user';
import apiRoutes, { baseURL } from '@routes/apiRoutes';

export const userApiService = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.userToken.access.token;
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
    patchUser: builder.mutation<IUserState, { _id: string | undefined; body: Object }>({
      query: ({ _id, body }) => ({
        url: `${apiRoutes.usersURL}/${_id}`,
        method: 'PATCH',
        body: body,
      }),
    }),
  }),
});

export const { usePatchUserMutation } = userApiService;
