import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

type TabsState = {
  userTabs: number;
};

const initialState: TabsState = {
  userTabs: 0,
};

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setUserTabsPage: (state, action) => {
      state.userTabs = action.payload;
    },
  },
});

export const { setUserTabsPage } = tabsSlice.actions;

export const selectTabs = (state: RootState) => state.tabsReducer;

export default tabsSlice.reducer;
