const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

export default async function getSessionId(
  requestToken: string
): Promise<string> {
  const response = await fetch(
    `${apiBaseUrl}authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${readApiKey}`,
      },
    }
  );

  return (await response.json()).session_id;
}
