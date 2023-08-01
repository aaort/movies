const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiReadKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

type ReturnType = {
  page: number;
  results: Movie[];
};

export default async function getUpcomingMovies(): Promise<ReturnType> {
  return await (
    await fetch(`${apiBaseUrl}/movie/upcoming`, {
      headers: {
        Authorization: `Bearer ${apiReadKey}`,
      },
    })
  ).json();
}
