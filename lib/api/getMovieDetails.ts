const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

export default async function getMovieDetails(
  movieId: number
): Promise<MovieDetails> {
  const response = await fetch(`${apiBaseUrl}movie/${movieId}`, {
    headers: {
      Authorization: `Bearer ${readApiKey}`,
    },
  });

  return await response.json();
}
