import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';
import { userState } from '../initialState';

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    updateUser: (state, action) => {
      const userData = action.payload;
      return {
        ...state,
        userName: userData.userName,
        email: userData.email,
        avatar: userData.avatar,
        uid: userData.uid,
        createdAt: userData.createdAt,
      };
    },
  },
});

//action
export const { updateUser } = userSlice.actions;
//selector
export const selectUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
