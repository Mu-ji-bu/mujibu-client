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
  projectType: string; // 修改這裡的類型為字串
  plans: IProjectPlan[];
}

interface ProjectData {
  status: string;
  data: {
    projects: IProject[];
  };
}

export const projectApiService = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getProjectData: builder.query<ProjectData[], void>({
      query: () => `${apiRoutes.projectsURL}`,
    }),
  }),
});

export const { useGetProjectDataQuery } = projectApiService;
