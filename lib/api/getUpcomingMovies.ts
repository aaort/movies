const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiReadKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

export default async function getUpcomingMovies(): Promise<ResultType<Movie>> {
  return await (
    await fetch(`${apiBaseUrl}/movie/upcoming`, {
      headers: {
        Authorization: `Bearer ${apiReadKey}`,
      },
    })
  ).json();
}
