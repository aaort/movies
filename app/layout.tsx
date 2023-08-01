import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

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
        <div className="flex flex-col h-full justify-between">
          <header className="flex flex-wrap justify-end gap-y-4 items-center py-10 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
            <nav>
              <ul className="flex gap-2 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-16 items-center">
                <li className="relative inline-block group">
                  <button className="text-xl">Trending</button>
                  <ul className="hidden group-hover:flex flex-col z-10 absolute bg-white border border-gray-300 rounded-md shadow-2xl">
                    <li className="px-4 py-2">
                      <Link href="/trending/movies" className="navbar-link">
                        Movies
                      </Link>
                    </li>
                    <li className="px-4 py-2">
                      <Link
                        href="/trending/tv"
                        className="navbar-link whitespace-nowrap w-full"
                      >
                        TV Series
                      </Link>
                    </li>
                    <li className="px-4 py-2">
                      <Link href="/trending/people" className="navbar-link">
                        People
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/upcoming" className="navbar-link">
                    Upcoming
                  </Link>
                </li>
                <li>
                  <Link href="#" className="navbar-link">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 mb-10">
            {children}
          </main>
          <footer></footer>
        </div>
      </body>
    </html>
  );
}
