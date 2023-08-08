import get from './get';

const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

type Props = {
  movieId: number;
  sessionId: string;
  value: boolean;
};

export default async function toggleMovieFavorite({
  movieId,
  sessionId,
  value,
}: Props) {
  const account = await get<Account>('account', { cache: 'no-cache' });

  if (!account) return;

  const response = await get<Response>(
    `account/${account.id}/favorite?session_id=${sessionId}`,
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
        favorite: value,
      }),
    }
  );

  return await response?.json();
}
