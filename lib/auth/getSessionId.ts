const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function getSessionId(
  requestToken: string
): Promise<string> {
  const response = await fetch(
    `${apiBaseUrl}authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    {
      cache: 'no-cache',
    }
  );

  return (await response.json()).session_id;
}
