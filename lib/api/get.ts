const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

// Utility function for fetching exclusively from TMDB API with custom configurations
// such as headers, optional api key and base url
/**
 *
 * @param endpoint - Url that request should be made to with TMDB api base url prefixed
 * @param options - RequestInit object, headers's Authorization is included by default but can be overwritten
 * @param includeApiKey - Weither include api key as query param or not
 * @returns Promise of either provided type or null | undefined
 */
export default async function get<T>(
  endpoint: string,
  options?: RequestInit,
  includeApiKey: boolean = false
): Promise<T | undefined | null> {
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
