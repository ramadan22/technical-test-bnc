export type MovieTypes = {
  id: number;
  title: string;
  year: number;
  rating: number,
  imageUrl: string;
  isLike?: boolean;
}

export type DetailMovieTypes = MovieTypes & {
  desc: string;
  duration: string;
  genre: string;
  imageLargeUrl: string;
  releaseDate: string;
  starring: sting[];
}

export type ParamsTypes = {
  page?: number;
  size?: number;
  filterBy?: 'none' | 'favorite' | 'popular' | 'new';
}
