import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiRoutes, { baseURL } from '@routes/apiRoutes';
import { IProject } from 'types/project';
import queryString from 'query-string';

interface ProjectData {
  status?: string;
  data: IProject;
  total: number;
}

export const projectApiService = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getAllProjectData: builder.query<ProjectData, void>({
      query: () => `${apiRoutes.projectsURL}`,
    }),
    getProjectData: builder.query<ProjectData, Record<string, any>>({
      query: (query) => {
        const searchParams = queryString.stringify(query);
        return `${apiRoutes.projectsURL}?${searchParams}`;
      },
    }),
  }),
});

export const { useGetAllProjectDataQuery, useGetProjectDataQuery } = projectApiService;
