// Maximum page for trending movies, tvs and people
const MAX_PAGE = 500;

// tmdb useful links
const TMDB_LINK = 'https://www.themoviedb.org';
const TMDB_API_DOCS_LINK = 'https://developer.themoviedb.org/docs';

// env variables
const APP_URL = process.env.appUrl!;
const API_READ_ACCESS_KEY = process.env.apiReadAccessKey!;
const API_KEY = process.env.apiKey!;
const API_BASE_URL = process.env.apiBaseUrl!;
const BASE_URL = process.env.baseUrl!;

export {
  API_BASE_URL,
  API_KEY,
  API_READ_ACCESS_KEY,
  APP_URL,
  BASE_URL,
  MAX_PAGE,
  TMDB_API_DOCS_LINK,
  TMDB_LINK,
};
