import type { TV } from '@/types';
import get from '../api/get';
import type { ResultType } from '../types';

export default async function isTVFavorite(
  tvId: string | number
): Promise<boolean> {
  const favoriteTVs = (
    await get<ResultType<TV>>('account/{}/favorite/tv', { cache: 'no-cache' })
  )?.results;

  return !!favoriteTVs?.some((tv) => tv.id === tvId);
}
