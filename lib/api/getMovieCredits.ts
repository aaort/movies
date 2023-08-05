const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

type ResultType = {
  id: number;
  cast: CastPerson[];
};

export default async function getMovieCredits(
  movieId: number
): Promise<ResultType> {
  const response = await fetch(`${apiBaseUrl}movie/${movieId}/credits`, {
    headers: {
      Authorization: `Bearer ${readApiKey}`,
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}
