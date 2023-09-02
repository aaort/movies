import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Movies',
  description: 'View last trending movies right now',
};

type Props = React.PropsWithChildren & {};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className={lato.className}>{children}</body>
    </html>
  );
}
