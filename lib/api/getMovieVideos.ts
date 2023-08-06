const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

type ResultType = {
  id: number;
  results: Video[];
};

export default async function getMovieVideos(
  movieId: number | string
): Promise<ResultType> {
  const response = await fetch(`${apiBaseUrl}movie/${movieId}/videos`, {
    headers: {
      Authorization: `Bearer ${readApiKey}`,
    },
  });

  return await response.json();
}
