import { API_BASE_URL, API_KEY } from '../constants';

export default async function getSessionId(
  requestToken: string
): Promise<string> {
  const response = await fetch(
    `${API_BASE_URL}authentication/session/new?api_key=${API_KEY}&request_token=${requestToken}`,
    {
      cache: 'no-cache',
    }
  );

  return (await response.json()).session_id;
}
