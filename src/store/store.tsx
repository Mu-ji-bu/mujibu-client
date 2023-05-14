import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Reducers
import projectReducer from './slices/projects/projectSlice';

// Middleware
// import { loggerMiddleware } from './middleware';
import { postApiService } from './services/postApi';

const reducers = combineReducers({
  projectReducer,
  [postApiService.reducerPath]: postApiService.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: reducers,
    middleware: (getCurrentMiddleware) => {
      return getCurrentMiddleware().concat(postApiService.middleware);
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
