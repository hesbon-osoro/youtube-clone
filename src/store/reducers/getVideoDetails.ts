import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  YOUTUBE_API_URL,
  convertRawViewsToString,
  timeSince,
} from '../../utils';

const API_KEY = process.env.YOUTUBE_DATA_API_KEY;

export const getVideoDetails = createAsyncThunk(
  'youtubeApp/videoDetails',
  async (id: string) => {
    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_API_URL}/videos?key=${API_KEY}&part=snippet,statisitcs&type=video&id=${id}`
    );
    return parseData(items[0]);
  }
);
const parseData = async (item: {
  snippet: {
    channelId: string;
    title: string;
    description: string;
    publishedAt: string;
    channelTitle: string;
  };
  id: string;
  statistics: { viewCount: string; likeCount: string };
}) => {
  const {
    data: {
      items: [
        {
          snippet: {
            thumbnails: {
              default: { url: channelImage },
            },
          },
          statisitcs: { subscriberCount },
        },
      ],
    },
  } = await axios.get(
    `${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
  );
  return {
    videoId: item.id,
    videoTitle: item.snippet.title,
    videoDescription: item.snippet.description,
    videoViews: parseInt(item.statistics.viewCount).toLocaleString(),
    videoLikes: convertRawViewsToString(item.statistics.likeCount),
    videoAge: timeSince(new Date(item.snippet.publishedAt)),
    channelInfo: {
      id: item.snippet.channelId,
      image: channelImage,
      name: item.snippet.channelTitle,
      subscribers: convertRawViewsToString(subscriberCount, true),
    },
  };
};
