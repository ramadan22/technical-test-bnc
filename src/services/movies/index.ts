import AxiosInstance from '@/lib/axios';
import { DefaultApiResponseType } from '@/types/responseApi';
import { MovieTypes, DetailMovieTypes, ParamsTypes } from './types';
import useMovieLike from '@/lib/zustand/setMoviesLike';

const queries = {
  GET_MOVIES: 'GET_MOVIES',
  GET_DETAIL_MOVIES: 'GET_DETAIL_MOVIES',
  GET_FAVORITE_MOVIES: 'GET_FAVORITE_MOVIES',
  GET_NEW_MOVIES: 'GET_NEW_MOVIES',
  GET_POPULAR_MOVIES: 'GET_POPULAR_MOVIES',
};

const url = 'https://private-2fff44-bncfetest.apiary-mock.com';

const getMovies = async ({
  page = 1,
  size = 10,
  filterBy = 'none',
}: ParamsTypes = {}) => new Promise<
  DefaultApiResponseType<MovieTypes[]>
>((resolve, reject) => {
  AxiosInstance.get(`${url}/movies`)
    .then((response) => {
      let items = { ...response.data };

      const moviesLikes = useMovieLike.getState();

      let filterListMovie: MovieTypes[] = [];

      if (filterBy !== 'none') {
        if (filterBy === 'favorite') {
          moviesLikes.ids.forEach((item) => {
            const find = items.data.find((movieItem: MovieTypes) => movieItem.id === item);
            filterListMovie.push(find);
          });
        } else if (filterBy === 'new') {
          filterListMovie = items.data.sort((a: MovieTypes, b: MovieTypes) => b.year - a.year);
        } else if ((filterBy === 'popular')) {
          filterListMovie = items.data.sort((a: MovieTypes, b: MovieTypes) => b.rating - a.rating);
        }

        items = {
          ...items,
          data: filterListMovie,
        };
      }

      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;

      const slicing = items.data.slice(
        startIndex,
        endIndex,
      ).map((movie: MovieTypes) => {
        const isLike = !!moviesLikes?.ids?.find((like) => like === movie.id);

        return {
          ...movie,
          isLike,
        };
      });

      items = {
        ...items,
        data: slicing,
      };

      const total = filterBy !== 'none'
        ? (filterListMovie.length || 0)
        : (response?.data?.data?.length || 0);

      const pageNumber = page || 1;
      const sizeNumber = size || 10;

      const totalPages = Math.ceil(total / sizeNumber);

      const result = {
        ...items,
        meta: {
          total,
          page: pageNumber,
          size: sizeNumber,
          lastPage: totalPages,
        },
      };

      resolve(result);
    })
    .catch((error) => reject(error));
});

const getDetailMovies = async (id: number) => new Promise<
  DefaultApiResponseType<DetailMovieTypes>
>((resolve, reject) => {
  AxiosInstance.get(`${url}/movies/${id}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getMovies,
  getDetailMovies,
  queries,
};
