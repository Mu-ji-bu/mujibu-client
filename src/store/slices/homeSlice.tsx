import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { IProjectState } from '@/types/project';
// import { CarouselData, HotData, NewData, PicksData, SuccessData } from '@/types/home';

const carouselData = [] as unknown as IProjectState[];
const hotData = [] as unknown as IProjectState[];
const newData = [] as unknown as IProjectState[];
const picksData = [] as unknown as IProjectState[];
const successData = [] as unknown as IProjectState[];

const initialState = {
  carouselData: carouselData,
  hotData: hotData,
  newData: newData,
  picksData: picksData,
  successData: successData,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setCarousel: (state, action) => {
      state.carouselData = action.payload;
    },
    clearCarousel: (state) => {
      state.carouselData = carouselData;
    },
    setHot: (state, action) => {
      state.hotData = action.payload;
    },
    clearHot: (state) => {
      state.hotData = hotData;
    },
    setNew: (state, action) => {
      state.newData = action.payload;
    },
    clearNew: (state) => {
      state.newData = newData;
    },
    setPicks: (state, action) => {
      state.picksData = action.payload;
    },
    clearPicks: (state) => {
      state.picksData = picksData;
    },
    setSuccess: (state, action) => {
      state.successData = action.payload;
    },
    clearSuccess: (state) => {
      state.successData = successData;
    },
  },
});

export const {
  setCarousel,
  clearCarousel,
  setHot,
  clearHot,
  setNew,
  clearNew,
  setPicks,
  clearPicks,
  setSuccess,
  clearSuccess,
} = homeSlice.actions;

export const selectHome = (state: RootState) => state.homeReducer;

export default homeSlice.reducer;
