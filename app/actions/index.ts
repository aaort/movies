import toggleMovieMetadata from '@/lib/api/toggleMovieMetadata';
import { cookies } from 'next/headers';

type Props = {
  movieId: string | number;
  value: boolean;
};

export const toggleFavoriteMovie = async ({ movieId, value }: Props) => {
  'use server';
  const sessionId = cookies().get('session_id')?.value;
  if (!sessionId) return;

  await toggleMovieMetadata({
    movieId: movieId,
    sessionId,
    data: { favorite: value },
  });
};

export const toggleMovieWatchlist = async ({ movieId, value }: Props) => {
  'use server';
  const sessionId = cookies().get('session_id')?.value;
  if (!sessionId) return;

  await toggleMovieMetadata({
    movieId: movieId,
    sessionId,
    data: { watchlist: value },
  });
};
