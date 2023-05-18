import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';
import { userState } from '../initialState';

const initialState = userState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 1. state -> 當下的狀態
    // 2. action -> 對應的動作
    getUser: (state) => {
      console.log(state);
    },
    updateUser: (state) => {
      console.log(state);
    },
  },
});

//action
export const { updateUser } = userSlice.actions;
//selector
export const selectUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
