import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const useSecureCookies = `${process.env.NEXTAUTH_URL}`.startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-' : '';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  trustHost: true,
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: `.${process.env.DOMAIN}`,
        secure: useSecureCookies,
      },
    },
  },
});
