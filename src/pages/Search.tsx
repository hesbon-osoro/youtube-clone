import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchCard, Navbar, Sidebar, Spinner } from '../components';
import { clearVideos } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { HomePageVideos } from '../types';
import { useNavigate } from 'react-router-dom';
import { getSearchPageVideos } from '../store/reducers';

export default function Search() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { videos, searchTerm } = useAppSelector(state => state.youtubeApp);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === '') navigate('/');
    else dispatch(getSearchPageVideos(false));
  }, [dispatch, navigate, searchTerm]);
  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: '7.5vh' }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: '92.5vh' }}>
        <Sidebar />
        {videos.length ? (
          <div>
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={600}
            >
              {videos.map((item: HomePageVideos) => (
                <div className="my-5">
                  <SearchCard data={item} key={item.videoId} />
                </div>
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
