import { useQuery } from '@tanstack/react-query';
import { getMovies, queries } from '@/services/movies';
import { ParamsTypes } from '@/services/movies/types';

export const useGetData = ({ size, filterBy }: ParamsTypes) => useQuery({
  queryKey: [queries.GET_POPULAR_MOVIES, { filterBy, size }],
  queryFn: () => {
    const params: ParamsTypes = {
      size,
      filterBy,
    };

    return getMovies(params);
  },
});
