const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

export default async function getFavoriteMovies(): Promise<ResultType<Movie>> {
  const response = await fetch(
    `${apiBaseUrl}account/{account_id}/favorite/movies`,
    {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${readApiKey}`,
      },
    }
  );

  return await response.json();
}
