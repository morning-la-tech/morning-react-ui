import { NextRequest, NextResponse } from 'next/server';
import { auth } from './app/auth';

export default auth((req: NextRequest) => {
  const isDev = process.env.NODE_ENV === 'development';
  const { pathname } = req.nextUrl;

  if (isDev) {
    return NextResponse.next();
  }

  if (pathname === '/healthz') {
    return NextResponse.next();
  }

  if (!req.auth && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.auth && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
