'use server';

import toggleMetadata from '@/lib/api/toggleMetadata';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type Props = {
  movieId: string | number;
  media_type: 'movie' | 'tv';
  value: boolean;
};

export const toggleFavorite = async ({ movieId, media_type, value }: Props) => {
  const sessionId = cookies().get('session_id')?.value;
  if (!sessionId) return;

  await toggleMetadata({
    movieId: movieId,
    sessionId,
    data: { media_id: movieId, media_type, favorite: value },
  });

  revalidatePath('/favorite');
};

export const toggleWatchlist = async ({
  movieId,
  media_type,
  value,
}: Props) => {
  const sessionId = cookies().get('session_id')?.value;
  if (!sessionId) return;

  await toggleMetadata({
    movieId: movieId,
    sessionId,
    data: { media_id: movieId, media_type, watchlist: value },
  });

  revalidatePath('/watchlist');
};

export const deleteSession = async () => {
  'use server';

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const readApiToken = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  try {
    const session_id = cookies().get('session_id')?.value;

    if (!session_id) return;

    const response = await fetch(`${apiBaseUrl}authentication/session`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${readApiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_id }),
    });

    if (response.ok) {
      cookies().delete('session_id');
      redirect(`${appUrl}login`);
    }
  } catch (e) {
    throw e;
  }
};
