import type { Movie } from '@/types';
import get from '../api/get';
import type { ResultType } from '../types';

export default async function isTVInWatchlist(
  tvId: string | number
): Promise<boolean> {
  const watchlistTVs = (
    await get<ResultType<Movie>>(`account/{}/watchlist/tv`, {
      cache: 'no-cache',
    })
  )?.results;

  return !!watchlistTVs?.some((movie) => movie.id === tvId);
}
