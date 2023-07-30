const apiKey = process.env.NEXT_APP_API_KEY;
const baseUrl = process.env.NEXT_APP_BASE_URL;

type ReturnType = {
  page: number;
  results: Movie[];
}

export default async function getTrendingMovies(): Promise<ReturnType> {
  return await (
    await fetch(`${baseUrl}trending/movie/week?api_key=${apiKey}`)
  ).json();
}
