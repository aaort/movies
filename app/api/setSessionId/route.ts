import getSessionId from '@/lib/auth/getSessionId';
import { APP_URL } from '@/lib/constants';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const requestToken = req.nextUrl.searchParams.get('request_token');

  if (!requestToken) return undefined;
  const sessionId = await getSessionId(requestToken);

  const res = NextResponse.redirect(`${APP_URL}general`);
  res.cookies.set({
    name: 'session_id',
    value: sessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
  });

  res.cookies.set({
    name: 'is_guest',
    value: 'false',
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
  });

  return res;
}
