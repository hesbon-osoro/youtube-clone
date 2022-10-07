import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from '../types';
import {
  getHomePageVideos,
  getRecommendedVideos,
  getSearchPageVideos,
  getVideoDetails,
} from './reducers';

const initialState: InitialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: '',
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
};

const YouTubeSlice = createSlice({
  name: 'youtubeApp',
  initialState,
  reducers: {
    clearVideos: state => {
      state.videos = [];
      state.nextPageToken = null;
    },
    changeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: state => {
      state.searchTerm = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload;
    });
    builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
      state.recommendedVideos = action.payload.parsedData;
    });
  },
});
export const store = configureStore({
  reducer: { youtubeApp: YouTubeSlice.reducer },
});
export const { clearVideos, changeSearchTerm, clearSearchTerm } =
  YouTubeSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
