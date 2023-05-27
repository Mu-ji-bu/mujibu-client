import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';
import { userState } from '../initialState';

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    updateUser: (state, action) => {
      const userData = action.payload;
      return { ...userData };
    },
  },
});

//action
export const { updateUser } = userSlice.actions;
//selector
export const selectUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
