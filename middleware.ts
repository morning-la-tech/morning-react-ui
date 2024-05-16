import { NextResponse } from 'next/server';
import { auth } from 'morning-react-ui/app/auth';

export default auth((req) => {
  const isDev = process.env.NODE_ENV === 'development';
  const { pathname } = req.nextUrl;

  if (isDev) {
    return NextResponse.next();
  }

  if (pathname === '/healthz') {
    return NextResponse.next();
  }

  if (!req.auth && pathname !== '/login') {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
