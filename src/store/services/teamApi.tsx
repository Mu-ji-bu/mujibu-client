import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import type { ITeamState } from '../../types/team';

type TeamData = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

//https://jsonplaceholder.typicode.com/posts/1

export const teamApiService = createApi({
  reducerPath: 'teamApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mujibu-server-fau1.onrender.com/api' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getTeam: builder.query<ITeamState, string>({
      query: (id) => `/team/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetTeamQuery,
  util: { getRunningQueriesThunk },
} = teamApiService;

// export endpoints for use in SSR
export const { getTeam } = teamApiService.endpoints;
