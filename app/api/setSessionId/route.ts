import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  cookies().set({
    name: 'session_id',
    value: sessionId!,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  return NextResponse.json({}, { status: 200, statusText: 'ok' });
}
