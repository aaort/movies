const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

export default async function getExternalIds(
  movieId: string | number
): Promise<ExternalIds> {
  const response = await fetch(`${apiBaseUrl}movie/${movieId}/external_ids`, {
    headers: {
      Authorization: `Bearer ${readApiKey}`,
    },
  });

  return await response.json();
}
