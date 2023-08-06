const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default async function get<T>(
  endpoint: string,
  options?: RequestInit,
  includeApiKey: boolean = false
): Promise<T> {
  const url =
    apiBaseUrl + endpoint + (includeApiKey ? `?api_key=${apiKey}` : '');
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${readApiKey}`,
    },
    ...options,
  });

  return await response.json();
}
