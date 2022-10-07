import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { HomePageVideos } from '../../types';
import { YOUTUBE_API_URL, parseData } from '../../utils';

const API_KEY = process.env.YOUTUBE_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
  'youtubeApp/getSearchPageVideos',
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ''
      }`
    );
    const parsedData: HomePageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
);
