import { Auth } from 'next-auth';

declare module 'next/server' {
  interface NextRequest {
    auth?: Auth;
  }
}
