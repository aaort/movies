const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type ReturnType = {
  page: number;
  results: Movie[];
};

export default async function getTrendingMovies(): Promise<ReturnType> {
  return await (
    await fetch(`${apiBaseUrl}trending/movie/week?api_key=${apiKey}`)
  ).json();
}
