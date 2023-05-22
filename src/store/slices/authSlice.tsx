import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import type { UserToken } from '../services/authApi';

type AuthState = {
  token: string | null;
  isLogin: boolean;
  userToken: UserToken;
};

const initialState: AuthState = {
  token: '',
  isLogin: false,
  userToken: {
    access: { token: '', expires: null },
    refresh: { token: '', expires: null },
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLogin = true;
    },
    clearToken: (state) => {
      state.token = '';
      state.isLogin = false;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
  },
});

export const { setToken, clearToken, setUserToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authReducer;

export default authSlice.reducer;
