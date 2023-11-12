import getGuestSessionId from '@/lib/auth/getGuestSessionId';
import getSessionExpireDate from '@/lib/helpers/getSessionExpireDate';
import { NextResponse } from 'next/server';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export async function GET() {
  const guestSessionId = await getGuestSessionId();

  if (!guestSessionId) throw new Error('Unable to get guest session id ');

  const res = NextResponse.redirect(`${appUrl}general`);
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
