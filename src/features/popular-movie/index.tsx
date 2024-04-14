'use client';

import { staticPage } from '@/data/staticPage';
import { LanguageTypes } from '@/types';
import { CardUI } from '@/ui/card';
import { useGetData } from './hooks/getData';
import { LoadingListMovieUI } from '@/ui/Loading';
import { Heading } from '@/components/heading';
import useMovieLike from '@/lib/zustand/setMoviesLike';

interface PropsTypes {
  language: LanguageTypes;
}

const PopularMovieFeature = ({ language }: PropsTypes) => {
  const setMovieLike = useMovieLike((state) => state.setMovieLike);

  const {
    data: listMovie, isLoading, refetch,
  } = useGetData({ size: 5, filterBy: 'popular' });

  return (
    <>
      <Heading type="h1">
        {staticPage[`${language}`]?.sectionPopularMovie?.title}
      </Heading>
      {isLoading && (
        <LoadingListMovieUI groupValue={1} itemValue={5} />
      )}
      {!isLoading && (
        <div className="grid-list-movie">
          {listMovie?.data?.map((item) => (
            <CardUI
              key={item.id}
              handleLike={(value) => {
                setMovieLike(value);
                refetch();
              }}
              data={{
                id: item.id,
                title: item.title,
                imageUrl: item.imageUrl,
                rating: item.rating,
                isLike: item.isLike,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PopularMovieFeature;
