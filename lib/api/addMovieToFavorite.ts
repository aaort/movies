import getAccount from './getAccount';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

export default async function addMovieToFavorite(
  movieId: number,
  sessionId: string
) {
  const account = await getAccount();

  const response = await fetch(
    `${apiBaseUrl}account/${account.id}/favorite?session_id=${sessionId}`,
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
        favorite: true,
      }),
    }
  );

  return await response.json();
}
