import type { Movie } from '@/types';
import get from '../api/get';
import type { ResultType } from '../types';

export default async function isMovieInWatchlist(
  movieId: string | number
): Promise<boolean> {
  const watchlistMovies = (
    await get<ResultType<Movie>>(`account/{}/watchlist/movies`, {
      cache: 'no-cache',
    })
  )?.results;

  return !!watchlistMovies?.some((movie) => movie.id === movieId);
}
