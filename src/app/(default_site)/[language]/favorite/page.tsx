import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getMovies, queries } from '@/services/movies';
import { LanguageTypes } from '@/types';
import FavoriteMovieFeature from '@/features/favorite-movie';
import { ParamsTypes } from '@/services/movies/types';

interface PropsTypes {
  params: {
    language: LanguageTypes;
  }
}

const FavoritePage = async ({ params }: PropsTypes) => {
  const queryClient = new QueryClient();

  const movieParams: ParamsTypes = {
    page: 1,
    size: 10,
    filterBy: 'favorite',
  };

  const query = async () => {
    await queryClient.prefetchQuery({
      queryKey: [queries.GET_FAVORITE_MOVIES],
      queryFn: () => getMovies(movieParams),
    });
  };

  query();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-y-10 min-h-[72vh] container py-10">
        <div>
          <FavoriteMovieFeature language={params.language} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default FavoritePage;
