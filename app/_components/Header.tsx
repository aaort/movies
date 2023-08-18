import Link from 'next/link';
import Search from './Search';

type Props = {
  includeSearch?: boolean;
  leftComponent?: React.ReactNode;
};

export default async function Header({
  includeSearch = false,
  leftComponent,
}: Props) {
  return (
    <header className='flex flex-wrap justify-between gap-4 items-center py-10 horizontal-padding'>
      {leftComponent ?? (includeSearch && <Search />)}
      <nav>
        <ul className='flex flex-wrap gap-2 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-16 items-center'>
          <li>
            <Link href='/general' className='navbar-link'>
              General
            </Link>
          </li>
          <li className='relative inline-block group'>
            <button className='text-xl'>Trending</button>
            <ul className='hidden group-hover:flex flex-col gap-4 p-4 z-50 absolute bg-white border border-gray-300 rounded-md shadow-2xl'>
              <li className=''>
                <Link href='/trending/movies' className='navbar-link'>
                  Movies
                </Link>
              </li>
              <li className=''>
                <Link
                  href='/trending/tv'
                  className='navbar-link whitespace-nowrap w-full'
                >
                  TV Series
                </Link>
              </li>
              <li className=''>
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
            <Link href='/favorite/movies' className='navbar-link'>
              Favorite
            </Link>
          </li>
          <li>
            <Link href='#' className='navbar-link'>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
