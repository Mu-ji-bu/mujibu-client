import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import apiRoutes, { baseURL } from '@routes/apiRoutes';
import { IProjectState } from 'types/project';
import { CarouselData } from '@/types/home';

interface CarouselDataRes {
  status: string;
  data: IProjectState[];
}

interface HotDataRes {
  status: string;
  data: IProjectState[];
}

interface NewDataRes {
  status: string;
  data: IProjectState[];
}

interface PicksDataRes {
  status: string;
  data: IProjectState[];
}

interface SuccessDataRes {
  status: string;
  data: IProjectState[];
}

/**
 * carousel
 * hot
 * new
 * picks
 * success
 */

export const homeApiService = createApi({
  reducerPath: 'homeApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCarouselData: builder.query<CarouselDataRes, void>({
      query: () => ({
        url: `${apiRoutes.homeURL}/carousel`,
        method: 'GET',
      }),
    }),
    getHotData: builder.query<HotDataRes, void>({
      query: () => ({
        url: `${apiRoutes.homeURL}/hot`,
        method: 'GET',
      }),
    }),
    getNewData: builder.query<NewDataRes, void>({
      query: () => ({
        url: `${apiRoutes.homeURL}/new`,
        method: 'GET',
      }),
    }),
    getPicksData: builder.query<PicksDataRes, void>({
      query: () => ({
        url: `${apiRoutes.homeURL}/picks`,
        method: 'GET',
      }),
    }),
    getSuccessData: builder.query<SuccessDataRes, void>({
      query: () => ({
        url: `${apiRoutes.homeURL}/success`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetCarouselDataQuery,
  useGetHotDataQuery,
  useGetNewDataQuery,
  useGetPicksDataQuery,
  useGetSuccessDataQuery,
} = homeApiService;
