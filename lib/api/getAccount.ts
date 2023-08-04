const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

export default async function getAccount(): Promise<Account> {
  const response = await fetch(`${apiBaseUrl}account`, {
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${readApiKey}`,
    },
  });

  return await response.json();
}
