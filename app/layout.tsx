import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Movies',
  description: 'View last trending movies right now',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
