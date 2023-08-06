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
  release_date: string;
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

type Account = {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

type MovieDetails = Movie & {
  belongs_to_collection: string;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
};

type CastPerson = Omit<Person, 'media_type'> & {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

type CrewPerson = Omit<CastPerson, 'cast_id' | 'character'> & {
  department: string;
  job: string;
};

type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};
