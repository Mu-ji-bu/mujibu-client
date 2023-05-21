import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';

// Reducers
import projectReducer from './slices/projectSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import tabsReducer from './slices/tabsSlice';

// Middleware
// import { loggerMiddleware } from './middleware';
import { postApiService } from './services/postApi';

const reducers = combineReducers({
  projectReducer,
  userReducer,
  authReducer,
  tabsReducer,
  [postApiService.reducerPath]: postApiService.reducer,
});

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: reducers,
    middleware: (getCurrentMiddleware) => {
      return getCurrentMiddleware().concat(postApiService.middleware);
    },
  }),
);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
