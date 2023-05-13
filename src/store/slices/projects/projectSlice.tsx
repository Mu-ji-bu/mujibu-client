import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';

interface ProjectState {
  projectName: string;
  isFollow: boolean;
}

const initialState: ProjectState = {
  projectName: '專案名稱...',
  isFollow: false,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // 1. state -> 當下的狀態
    // 2. action -> 對應的動作
    setIsFollow: (state) => {
      state.isFollow = !state.isFollow;
    },
  },
});

//action
export const { setIsFollow } = projectSlice.actions;
//selector
export const selectProject = (state: RootState) => state.projectReducer;

export default projectSlice.reducer;
