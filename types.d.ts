type Movie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Person = {
  adult: boolean;
  gender: number;
  id: number;
  known_for: Movie[];
  known_for_department: string;
  media_type: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

type TV = Pick<
  Movie,
  | 'adult'
  | 'backdrop_path'
  | 'id'
  | 'original_language'
  | 'overview'
  | 'media_type'
  | 'genre_ids'
  | 'popularity'
  | 'vote_average'
  | 'vote_count'
  | 'poster_path'
> & {
  name: string;
  original_name: string;
  poster_path: string;
  first_air_date: string;
  origin_country: string[];
};
