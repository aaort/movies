import getGuestSessionId from '@/lib/auth/getGuestSessionId';
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

function getExpirationDate(): number {
  const now: Date = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  const millisInMonth = daysInMonth * 24 * 60 * 60 * 1000;

  return now.getTime() + millisInMonth;
}
