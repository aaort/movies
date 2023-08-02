import { NextResponse, type NextRequest } from 'next/server';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export async function middleware(request: NextRequest) {
  if (!request.cookies.has('session_id')) {
    return NextResponse.redirect(`${appUrl}login/options`);
  }

  // TODO:
  // if (request.nextUrl.pathname.startsWith('/login')) {
  //   return NextResponse.redirect(`${appUrl}trending/movies`);
  // }
}

export const config = {
  matcher: '/((?!login|api|_next/static|_next/image|favicon.ico).*)',
};
