import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovies, queries } from '@/services/movies';
import { ParamsTypes } from '@/services/movies/types';

export const useGetData = ({ page, size, filterBy }: ParamsTypes) => useInfiniteQuery({
  queryKey: [queries.GET_FAVORITE_MOVIES],
  queryFn: ({ pageParam }) => {
    const params: ParamsTypes = page ? {
      page,
      size,
    } : {
      page: pageParam,
      size,
    };

    params.filterBy = filterBy;

    return getMovies(params);
  },
  getNextPageParam: (data, pages) => {
    if (pages.length < (data?.meta?.lastPage || 0)) {
      return pages.length + 1;
    }

    return undefined;
  },
  initialPageParam: 1,
});
