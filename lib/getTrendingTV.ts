const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function getTrendingTV(): Promise<ResultType<TV>> {
  return await (
    await fetch(`${apiBaseUrl}trending/tv/week?api_key=${apiKey}`)
  ).json();
}
