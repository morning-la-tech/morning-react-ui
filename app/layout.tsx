import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './theme.css';

const inter = Inter({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'React UI',
  description: 'Morning React UI Library',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <link rel='icon' href='/favicon.ico' sizes='any' />
      <link rel='apple-touch-icon' href='/apple-icon-180x180.png' type='image/<generated>' sizes='180x180' />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
