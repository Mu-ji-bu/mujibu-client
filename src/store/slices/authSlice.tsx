import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../services/userApi';
import { RootState } from '@/store/store';

type AuthState = {
  user: User | null;
  token: string | null;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }: PayloadAction<{ user: User; token: string }>) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.authReducer.user;

export default authSlice.reducer;
