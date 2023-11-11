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

type PersonDetails = Pick<
  Person,
  | 'id'
  | 'adult'
  | 'gender'
  | 'name'
  | 'profile_path'
  | 'popularity'
  | 'known_for_department'
> & {
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  homepage: string | null;
  imdb_id: string;
  place_of_birth: string;
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

type ExternalIds = {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
};

type Review = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

type TVDetails = {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: '';
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: string | null;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

type Credits = {
  id: number;
  cast: CastPerson[];
  crew: CrewPerson[];
};

export type {
  Account,
  CastPerson,
  Credits,
  ExternalIds,
  Movie,
  MovieDetails,
  Person,
  PersonDetails,
  Review,
  TV,
  TVDetails,
  Video,
};
