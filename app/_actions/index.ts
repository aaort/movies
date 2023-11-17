'use server';

import toggleMetadata from '@/lib/api/toggleMetadata';
import { API_BASE_URL, API_READ_ACCESS_KEY, APP_URL } from '@/lib/constants';
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

  try {
    const session_id = cookies().get('session_id')?.value;

    if (!session_id) return;

    await fetch(`${API_BASE_URL}authentication/session`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_id }),
    });

    cookies().delete('session_id');
    cookies().delete('is_guest');
    redirect(`${APP_URL}login`);
  } catch (e) {
    throw e;
  }
};
