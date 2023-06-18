import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';

// Reducers
import projectReducer from './slices/projectSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import tabsReducer from './slices/tabsSlice';
import homeReducer from './slices/homeSlice';

// Middleware
// import { loggerMiddleware } from './middleware';
import { authApiService } from './services/authApi';
import { userApiService } from './services/userApi';
import { proposalApiService } from './services/proposalApi';
import { projectApiService } from './services/projectApi';
import { uploadPhotoApiService } from './services/uploadPhotoApi';
import { postApiService } from './services/postApi';
import { homeApiService } from './services/homeApi';

const reducers = combineReducers({
  projectReducer,
  userReducer,
  authReducer,
  tabsReducer,
  homeReducer,
  [authApiService.reducerPath]: authApiService.reducer,
  [userApiService.reducerPath]: userApiService.reducer,
  [proposalApiService.reducerPath]: proposalApiService.reducer,
  [uploadPhotoApiService.reducerPath]: uploadPhotoApiService.reducer,
  [postApiService.reducerPath]: postApiService.reducer,
  [projectApiService.reducerPath]: projectApiService.reducer,
  [homeApiService.reducerPath]: homeApiService.reducer,
});

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: reducers,
    middleware: (getCurrentMiddleware) => {
      return getCurrentMiddleware()
        .concat(authApiService.middleware)
        .concat(userApiService.middleware)
        .concat(proposalApiService.middleware)
        .concat(uploadPhotoApiService.middleware)
        .concat(postApiService.middleware)
        .concat(projectApiService.middleware)
        .concat(homeApiService.middleware);
    },
  }),
);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
