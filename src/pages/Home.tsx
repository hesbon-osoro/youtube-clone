import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, Navbar, Sidebar, Spinner } from '../components';
import { clearVideos } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getHomePageVideos } from '../store/reducers';
import { HomePageVideos } from '../types';

export default function Home() {
  const dispatch = useAppDispatch();
  const { videos } = useAppSelector(state => state.youtubeApp);

  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: '7.5vh' }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: '92.5vh' }}>
        <Sidebar />
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
              {videos.map((item: HomePageVideos) => (
                <Card data={item} key={item.videoId} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
