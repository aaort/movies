import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Drawer from './Drawer';
import Search from './Search';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiToken = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

type Props = {
  includeSearch?: boolean;
  leftComponent?: React.ReactNode;
};

export default async function Header({
  includeSearch = false,
  leftComponent,
}: Props) {
  const deleteSession = async () => {
    'use server';

    try {
      const session_id = cookies().get('session_id')?.value;

      if (!session_id) return;

      const response = await fetch(`${apiBaseUrl}authentication/session`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${readApiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id }),
      });

      if (response.ok) {
        cookies().delete('session_id');
        redirect(`${appUrl}login/options`);
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <header className='flex flex-wrap justify-between gap-4 items-center horizontal-p py-8 bg-primary-100'>
      {leftComponent ?? (includeSearch && <Search />)}
      <nav>
        <div className='block md:hidden'>
          <Drawer />
        </div>
        <ul className='hidden md:flex flex-wrap gap-2 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-16 items-center'>
          <li>
            <Link href='/general' className='navbar-link'>
              General
            </Link>
          </li>
          <li className='relative inline-block group'>
            <button className='navbar-link after:hidden'>Trending</button>
            <ul className='hidden group-hover:flex [&_a]:text-[1rem] flex-col gap-4 p-4 z-50 absolute bg-primary-50 border border-primary-300 rounded-md shadow-2xl'>
              <li>
                <Link href='/trending/movies' className='navbar-link'>
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href='/trending/tvs'
                  className='navbar-link whitespace-nowrap w-full'
                >
                  TV Series
                </Link>
              </li>
              <li>
                <Link href='/trending/people' className='navbar-link'>
                  People
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href='/upcoming' className='navbar-link'>
              Upcoming
            </Link>
          </li>
          <li>
            <Link href='/favorite' className='navbar-link'>
              Favorite
            </Link>
          </li>
          <li>
            <Link href='/watchlist' className='navbar-link'>
              Watchlist
            </Link>
          </li>
          <li>
            <Link href='#' className='navbar-link'>
              About
            </Link>
          </li>
          <li>
            <form action={deleteSession}>
              <button className='text-xl button' type='submit'>
                Log out
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}
