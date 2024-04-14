import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next/types';
import { getDetailMovies, queries } from '@/services/movies';
import DetailMoviesFeature from '@/features/detail-movie';
import NewMovieFeature from '@/features/new-movie';
import { LanguageTypes } from '@/types';
import ParagraphUI from '@/ui/paragraph';
import { staticPage } from '@/data/staticPage';
import PopularMovieFeature from '@/features/popular-movie';

type Props = {
  params: {
    id: string;
    language: LanguageTypes;
  }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const url = 'https://private-2fff44-bncfetest.apiary-mock.com';
  const { id } = params;

  const arrayId = id.split('-');

  const idMovie = Number(arrayId[0]);

  const movie = await fetch(`${url}/movies/${idMovie}`).then((res) => res.json());

  return {
    title: `| ${movie.data.title}`,
    description: `${movie.data.desc}`,
    keywords: `movie, popular movie, new movie, ${movie.data.genre}`,
  };
}

const detailPage = async ({ params }: Props) => {
  const queryClient = new QueryClient();

  const arrayId = params.id.split('-');
  const id = Number(arrayId[0]);

  const query = async () => {
    await queryClient.prefetchQuery({
      queryKey: [queries.GET_DETAIL_MOVIES, id],
      queryFn: () => getDetailMovies(id),
    });
  };

  query();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <DetailMoviesFeature language={params.language} id={id} />
      </div>
      <div className="container mt-10 mb-[100px]">
        <ParagraphUI
          title={staticPage[`${params.language}`].paragraphDetailPage.title}
          text={staticPage[`${params.language}`].paragraphDetailPage.description}
        />
      </div>
      <div className="container mb-16">
        <NewMovieFeature language={params.language} />
      </div>
      <div className="container">
        <PopularMovieFeature language={params.language} />
      </div>
    </HydrationBoundary>
  );
};

export default detailPage;
