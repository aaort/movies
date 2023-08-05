'use server';

import toggleMovieFavorite from '@/lib/api/toggleMovieFavorite';
import { cookies } from 'next/headers';

export async function toggleFavorite(movieId: number, value: boolean) {
  const sessionId = cookies().get('session_id')?.value;
  if (!sessionId) return;

  try {
    await toggleMovieFavorite({ movieId, sessionId, value });
  } catch (e) {
    throw e;
  }
}
