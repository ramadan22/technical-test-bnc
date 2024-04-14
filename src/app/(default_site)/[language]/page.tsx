import { QueryClient } from '@tanstack/react-query';
import NewMovieFeature from '@/features/new-movie';
import PopularMovieFeature from '@/features/popular-movie';
import { getMovies, queries } from '@/services/movies';
import { LanguageTypes } from '@/types';

interface PropsTypes {
  params: {
    language: LanguageTypes;
  }
}

const Home = ({ params }: PropsTypes) => {
  const queryClient = new QueryClient();

  const query = async () => {
    await queryClient.prefetchQuery({
      queryKey: [queries.GET_NEW_MOVIES, { filterBy: 'new', size: 5 }],
      queryFn: () => getMovies({ filterBy: 'new' }),
    });

    await queryClient.prefetchQuery({
      queryKey: [queries.GET_POPULAR_MOVIES, { filterBy: 'popular', size: 5 }],
      queryFn: () => getMovies({ filterBy: 'popular' }),
    });
  };

  query();

  return (
    <div className="container lg:py-10 py-8 flex flex-col gap-y-16">
      <div>
        <NewMovieFeature language={params.language} />
      </div>
      <div>
        <PopularMovieFeature language={params.language} />
      </div>
    </div>
  );
};

export default Home;
