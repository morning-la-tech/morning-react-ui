import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const useSecureCookies = `${process.env.AUTH_URL}`.startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-' : '';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}${process.env.DOMAIN}.next-auth.session-token`,
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
