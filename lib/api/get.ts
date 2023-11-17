// Utility function for fetching exclusively from TMDB API with custom configurations
// such as headers, optional api key and base url

import { API_BASE_URL, API_KEY, API_READ_ACCESS_KEY } from '../constants';

/**
 *
 * @param endpoint - Url that request should be made to with TMDB api base url prefixed
 * @param options - RequestInit object, headers's Authorization is included by default but can be overwritten
 * @param includeApiKey - Whether include api key as query param or not
 * @param variables - Object of variables to be added to the request url
 * @returns Promise of either provided type or null | undefined
 */
export default async function get<T>(
  endpoint: string,
  options?: RequestInit,
  includeApiKey: boolean = false,
  variables: { [key: string]: string | number } = {}
): Promise<T | undefined | null> {
  const url =
    API_BASE_URL +
    endpoint +
    (includeApiKey ? `?api_key=${API_KEY}` : '') +
    Object.keys(variables).reduce(
      (allVars, key) => `${allVars}&${key}=${variables[key]}`,
      ''
    );

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_READ_ACCESS_KEY}`,
    },
    ...options,
  });

  return await response.json();
}
