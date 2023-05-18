import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Reducers
import projectReducer from './slices/projectSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';

// Middleware
// import { loggerMiddleware } from './middleware';
import { postApiService } from './services/postApi';
import { userApiService } from './services/userApi';
import { authApiService } from './services/authApi';

const reducers = combineReducers({
  projectReducer,
  userReducer,
  authReducer,
  [postApiService.reducerPath]: postApiService.reducer,
  [userApiService.reducerPath]: userApiService.reducer,
  [authApiService.reducerPath]: authApiService.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: reducers,
    middleware: (getCurrentMiddleware) => {
      return getCurrentMiddleware()
        .concat(postApiService.middleware)
        .concat(userApiService.middleware)
        .concat(authApiService.middleware);
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
