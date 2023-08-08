import get from './get';

const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

type Props = {
  movieId: number | string;
  sessionId: string;
  data: ToggleMovieData;
};

export type ToggleMovieData = {
  favorite?: boolean;
  watchlist?: boolean;
};

export default async function toggleMovieMetadata({
  movieId,
  sessionId,
  data,
}: Props) {
  const account = await get<Account>('account', { cache: 'no-cache' });

  if (!account) return;

  const actionType = data.favorite !== undefined ? 'favorite' : 'watchlist';

  try {
    await get<Response>(
      `account/${account.id}/${actionType}?session_id=${sessionId}`,
      {
        cache: 'no-cache',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${readApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          media_type: 'movie',
          media_id: movieId,
          ...data,
        }),
      }
    );
  } catch (e) {
    console.error(e);
  }

  return undefined;
}
