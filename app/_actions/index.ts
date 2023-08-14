'use server';

import toggleMovieMetadata from '@/lib/api/toggleMovieMetadata';
import { cookies } from 'next/headers';

type Props = {
  movieId: string | number;
  media_type: 'movie' | 'tv';
  value: boolean;
};

export const toggleFavorite = async ({ movieId, media_type, value }: Props) => {
  const sessionId = cookies().get('session_id')?.value;
  if (!sessionId) return;

  await toggleMovieMetadata({
    movieId: movieId,
    sessionId,
    data: { media_id: movieId, media_type, favorite: value },
  });
};

export const toggleWatchlist = async ({
  movieId,
  media_type,
  value,
}: Props) => {
  const sessionId = cookies().get('session_id')?.value;
  if (!sessionId) return;

  await toggleMovieMetadata({
    movieId: movieId,
    sessionId,
    data: { media_id: movieId, media_type, watchlist: value },
  });
};
