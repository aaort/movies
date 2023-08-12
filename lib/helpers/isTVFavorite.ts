import get from '../api/get';

export default async function isTVFavorite(
  tvId: string | number
): Promise<boolean> {
  const favoriteTVs = (
    await get<ResultType<TV>>('account/{}/favorite/tv', { cache: 'no-cache' })
  )?.results;

  return !!favoriteTVs?.some((tv) => tv.id === tvId);
}
