'use client';

/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import { VideoCameraOutlined } from '@ant-design/icons';
import { useGetData } from './hooks/getData';
import { CardUI } from '@/ui/card';
import { staticPage } from '@/data/staticPage';
import { LanguageTypes } from '@/types';
import useMovieLike from '@/lib/zustand/setMoviesLike';
import { ParamsTypes } from '@/services/movies/types';
import { cn } from '@/lib/classnames';
import { LoadingListMovieUI } from '@/ui/Loading';

interface PropsTypes {
  language: LanguageTypes;
}

const FavoriteMovieFeature = ({ language }: PropsTypes) => {
  const setMovieLike = useMovieLike((state) => state.setMovieLike);

  const [params] = useState<ParamsTypes>({
    size: 10,
    filterBy: 'favorite',
  });

  const {
    data: listMovie, isLoading, fetchNextPage, isFetchingNextPage, refetch,
  } = useGetData(params);

  const handleScroll = () => {
    const navComponent = document.getElementById('navbar');

    if (navComponent) {
      const windowOffsetBottom = (window.scrollY + window.innerHeight)
        - navComponent.clientHeight;

      if (windowOffsetBottom >= document.body.offsetHeight) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {(listMovie?.pages[0]?.data?.length || 0) > 0 && (
        <h1 className="text-3xl mb-5">{staticPage[`${language}`].sectionFavoriteMovie.title}</h1>
      )}
      <div
        className={cn(
          'grid-list-movie',
          (listMovie?.pages[0]?.data?.length || 0) <= 0 && 'flex flex-col',
        )}
      >
        {!isLoading && listMovie?.pages?.map((page, idx) => (
          <React.Fragment key={idx}>
            {(page?.data?.length || 0) > 0 && page?.data?.map((item) => (
              <CardUI
                key={item.id}
                data={item}
                handleLike={(value) => {
                  setMovieLike(value);
                  refetch();
                }}
              />
            ))}
            {(page?.data?.length || 0) <= 0 && (
              <div className="absolute inset-0 flex flex-col gap-10 w-full items-center justify-center py-10">
                <div className="text-4xl">
                  <VideoCameraOutlined />
                </div>
                <p>
                  {staticPage[`${language}`].sectionEmptyFavoriteList.text}
                </p>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {(isLoading || isFetchingNextPage) && (
      <LoadingListMovieUI
        groupValue={2}
        itemValue={5}
      />
      )}
    </>
  );
};

export default FavoriteMovieFeature;
