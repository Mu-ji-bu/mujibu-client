import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

type TabsState = {
  userTabs: number;
  projectTabs: number;
};

const initialState: TabsState = {
  userTabs: 0,
  projectTabs: 0,
};

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setUserTabsPage: (state, action) => {
      state.userTabs = action.payload;
    },
    setProjectTabsPage: (state, action) => {
      state.projectTabs = action.payload;
    },
  },
});

export const { setUserTabsPage, setProjectTabsPage } = tabsSlice.actions;

export const selectTabs = (state: RootState) => state.tabsReducer;

export default tabsSlice.reducer;
