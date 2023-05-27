import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export interface PhotoUploadResponse {
  fileUrl: string;
}

export const uploadPhotoApiService = createApi({
  reducerPath: 'uploadPhotoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3010',
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).authReducer.token;
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
    uploadPhoto: builder.mutation<PhotoUploadResponse, FormData>({
      query: (imageFile) => {
        return {
          url: '/upload/file',
          method: 'POST',
          body: imageFile,
        };
      },
    }),
  }),
});

export const { useUploadPhotoMutation } = uploadPhotoApiService;
