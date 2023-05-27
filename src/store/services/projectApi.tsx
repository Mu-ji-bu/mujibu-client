import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiRoutes, { baseURL } from '@routes/apiRoutes';

interface IProjectPlan {
  id: string;
  name: string;
  description: string;
  minimumAmount: number;
  maximumAmount: number;
  remaining: number;
  estimatedDelivery: string;
  discount?: number;
  earlyBirdEndDate?: string;
}

interface IProject {
  id: string;
  image: string;
  category: string;
  projectName: string;
  projectTeam: string;
  proposer: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  backers: number;
  prize: number;
  startTime: string;
  endTime: string;
  remainingTime: string;
  projectType: number;
  plans: IProjectPlan[];
}

interface ProjectData {
  status: string;
  projects: IProject[];
}

interface CurrentData<T> {
  status: string;
  data?: T;
  endpointName: string;
  fulfilledTimeStamp: number;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isUninitialized: boolean;
  refetch: () => void;
  requestId: string;
  startedTimeStamp: number;
}

export const projectApiService = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getProjectData: builder.query<CurrentData<ProjectData>, void>({
      query: () => `${apiRoutes.projectsURL}`,
    }),
  }),
});

export const { useGetProjectDataQuery } = projectApiService;
