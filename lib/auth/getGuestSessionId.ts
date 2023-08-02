const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

export default async function getGuestSessionId() {
  const data = await fetch(`${baseApiUrl}authentication/guest_session/new`, {
    cache: 'no-cache',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${readApiKey}`,
    },
  });

  return (await data.json()).request_token;
}
