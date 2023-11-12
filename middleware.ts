import { NextResponse, type NextRequest } from 'next/server';

const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

export async function middleware(request: NextRequest) {
  if (!request.cookies.has('session_id')) {
    return NextResponse.rewrite(`${appUrl}login`);
  }

  if (request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.rewrite(appUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
