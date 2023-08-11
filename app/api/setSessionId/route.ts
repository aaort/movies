import getSessionId from '@/lib/auth/getSessionId';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export async function GET(req: NextRequest) {
  const requestToken = req.nextUrl.searchParams.get('request_token');

  if (!requestToken) return undefined;
  const sessionId = await getSessionId(requestToken);

  const res = NextResponse.redirect(`${appUrl}general`);
  res.cookies.set({
    name: 'session_id',
    value: sessionId,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });

  return res;
}
