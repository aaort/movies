const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

type ReturnType = {
  page: number;
  results: Movie[];
};

export default async function getFavoriteMovies(): Promise<ReturnType> {
  const response = await fetch(
    `${apiBaseUrl}account/{account_id}/favorite/movies`,
    {
      headers: {
        Authorization: `Bearer ${readApiKey}`,
      },
    }
  );

  return await response.json();
}
