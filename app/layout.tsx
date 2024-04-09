import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import { Providers } from './Providers';
import { inter } from './fonts';

export const metadata: Metadata = {
  title: 'React UI',
  description: 'Morning React UI Library',
  icons: { icon: '/favicon.ico', apple: '/apple-icon-180x180.png' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Header>librairie de composants</Header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
