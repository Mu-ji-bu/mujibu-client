import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiRoutes, { baseURL } from '@routes/apiRoutes';
import { IProjectState } from 'types/project';
import queryString from 'query-string';

interface ProjectData {
  status?: string;
  data: IProjectState;
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
    getProjectById: builder.query<any, any>({
      query: (projectId) => {
        if (projectId) {
          return `${apiRoutes.projectsURL}/${projectId}`;
        }
        throw new Error('Invalid projectId');
      },
    }),
  }),
});

export const {
  useGetAllProjectDataQuery,
  useGetProjectDataQuery,
  useGetProjectByIdQuery,
  util: { getRunningQueriesThunk },
} = projectApiService;

// export endpoints for use in SSR
export const { getAllProjectData, getProjectData, getProjectById } = projectApiService.endpoints;
