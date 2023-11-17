import getGuestSessionId from '@/lib/auth/getGuestSessionId';
import { APP_URL } from '@/lib/constants';
import getSessionExpireDate from '@/lib/helpers/getSessionExpireDate';
import { NextResponse } from 'next/server';

export async function GET() {
  const guestSessionId = await getGuestSessionId();

  if (!guestSessionId) throw new Error('Unable to get guest session id ');

  const res = NextResponse.redirect(`${APP_URL}general`);
  res.cookies.set({
    name: 'session_id',
    value: guestSessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: getSessionExpireDate(),
    sameSite: 'lax',
  });

  res.cookies.set({
    name: 'is_guest',
    value: 'true',
    httpOnly: false,
    secure: false,
    expires: getSessionExpireDate(),
    sameSite: 'lax',
  });

  return res;
}
