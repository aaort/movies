import getGuestSessionId from '@/lib/auth/getGuestSessionId';
import getExpirationDate from '@/lib/helpers/getSessionExpireDate';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export async function GET() {
  const guestSessionId = await getGuestSessionId();

  if (!guestSessionId) throw new Error('Unable to get guest session id ');

  cookies().set({
    name: 'session_id',
    value: guestSessionId,
    httpOnly: true,
    secure: true,
    expires: getExpirationDate(),
    sameSite: 'strict',
  });

  return NextResponse.redirect(`${appUrl}general`);
}
