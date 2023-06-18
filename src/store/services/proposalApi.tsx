import { RootState } from '@/store/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import type { IProjectState } from '../../types/project';
import apiRoutes, { baseURL } from '@routes/apiRoutes';

export const proposalApiService = createApi({
  reducerPath: 'proposalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).authReducer.userToken.access.token;
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    postProposal: builder.mutation<IProjectState, { body: Object }>({
      query: ({ body }) => ({
        url: `${apiRoutes.proposalURL}`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { usePostProposalMutation } = proposalApiService;
