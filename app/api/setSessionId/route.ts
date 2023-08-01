import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  if (!sessionId) return NextResponse.error();

  cookies().set({
    name: 'session_id',
    value: sessionId!,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  return NextResponse.redirect(`${appUrl}/trending/movies`);
}
