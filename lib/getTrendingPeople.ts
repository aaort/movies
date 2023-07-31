const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type ReturnType = {
  page: number;
  results: Person[];
};

export default async function getTrendingPeople(): Promise<ReturnType> {
  return await (
    await fetch(`${apiBaseUrl}trending/person/week?api_key=${apiKey}`)
  ).json();
}
