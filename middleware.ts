import { NextResponse, type NextRequest } from 'next/server';
import { APP_URL } from './lib/constants';

export async function middleware(request: NextRequest) {
  if (!request.cookies.has('session_id')) {
    return NextResponse.rewrite(`${APP_URL}login`);
  }

  if (request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.rewrite(APP_URL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
