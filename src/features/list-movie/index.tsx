'use client';

import { useEffect } from 'react';
import { useGetData } from './hooks/getData';
import { CardUI } from '@/ui/card';
import { staticPage } from '@/data/staticPage';
import { LanguageTypes } from '@/types';
import useMovieLike from '@/lib/zustand/setMoviesLike';
import { LoadingListMovieUI } from '@/ui/Loading';
import { Heading } from '@/components/heading';

interface PropsTypes {
  language: LanguageTypes;
}

const ListMoviesFeature = ({ language }: PropsTypes) => {
  const setMovieLike = useMovieLike((state) => state.setMovieLike);

  const movieParams = {
    size: 10,
  };

  const {
    data: listMovie, isLoading, fetchNextPage, isFetchingNextPage, refetch,
  } = useGetData(movieParams);

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
      <Heading type="h1">
        {staticPage[`${language}`].sectionListMovie.title}
      </Heading>
      <div className="grid-list-movie">
        {!isLoading && listMovie?.pages?.map((page) => (
          page?.data?.map((item) => (
            <CardUI
              key={item.id}
              data={item}
              handleLike={(value) => {
                setMovieLike(value);
                refetch();
              }}
            />
          ))
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

export default ListMoviesFeature;
