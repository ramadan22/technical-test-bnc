import { useQuery } from '@tanstack/react-query';
import { getDetailMovies, queries } from '@/services/movies';

export const useGetData = (id: number) => useQuery({
  queryKey: [queries.GET_DETAIL_MOVIES, id],
  queryFn: async () => getDetailMovies(id),
});
