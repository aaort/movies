const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

export default async function getRequestToken(): Promise<string> {
  const data = await fetch(`${baseApiUrl}authentication/token/new`, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${readApiKey}`,
    },
  });

  return (await data.json()).request_token;
}
