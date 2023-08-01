const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type ReturnType = {
  page: number;
  results: TV[];
};

export default async function getTrendingTV(): Promise<ReturnType> {
  return await (
    await fetch(`${apiBaseUrl}trending/tv/week?api_key=${apiKey}`)
  ).json();
}
