'use client';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { deleteSession } from '../_actions';

type Props = {
  classes?: string;
};

export default function Navbar({ classes }: Props) {
  const segments = useSelectedLayoutSegments();

  const isInForYou =
    segments.at(-1)?.includes('upcoming') ||
    segments.at(-1)?.includes('favorite') ||
    segments.at(-1)?.includes('watchlist');

  return (
    <ul className={classes}>
      <NavbarLink href='/general' isActive={segments.at(-1) === 'general'}>
        General
      </NavbarLink>
      <div className='relative inline-block group'>
        <button
          className={`navbar-link after:hidden ${
            segments.at(0) === 'trending' ? 'text-current' : ''
          }`}
        >
          Trending
        </button>
        <ul className='scale-y-0 duration-150 group-hover:scale-y-100 flex flex-col [&_a]:text-[1rem] gap-4 p-4 z-50 absolute bg-primary-50 border border-primary-300 rounded-md shadow-2xl'>
          <NavbarLink
            isActive={segments?.at(-1) === 'movies'}
            href='/trending/movies'
          >
            Movies
          </NavbarLink>
          <NavbarLink isActive={segments.at(-1) === 'tvs'} href='/trending/tvs'>
            TV Series
          </NavbarLink>
          <NavbarLink
            isActive={segments.at(-1) === 'people'}
            href='/trending/people'
          >
            People
          </NavbarLink>
        </ul>
      </div>
      <div className='relative inline-block group'>
        <button
          className={`navbar-link after:hidden ${
            isInForYou ? 'text-current' : ''
          }`}
        >
          For You
        </button>
        <ul className='scale-y-0 duration-150 group-hover:scale-y-100 [&_a]:text-[1rem] flex flex-col gap-4 p-4 z-50 absolute bg-primary-50 border border-primary-300 rounded-md shadow-2xl'>
          <NavbarLink
            isActive={segments.at(-1) === 'upcoming'}
            href='/upcoming'
          >
            Upcoming
          </NavbarLink>
          <NavbarLink
            isActive={segments.at(-1) === 'favorite'}
            href='/favorite'
          >
            Favorite
          </NavbarLink>
          <NavbarLink
            isActive={segments.at(-1) === 'watchlist'}
            href='/watchlist'
          >
            Watchlist
          </NavbarLink>
        </ul>
      </div>
      <li>
        <form action={deleteSession}>
          <button
            className='text-xl button whitespace-nowrap w-full'
            type='submit'
          >
            Log out
          </button>
        </form>
      </li>
    </ul>
  );
}

type NavbarLinkProps = React.PropsWithChildren & {
  href: string;
  isActive: boolean;
};

function NavbarLink({ children, href, isActive }: NavbarLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className={`navbar-link whitespace-nowrap w-fit ${
          isActive ? 'after:w-full text-current' : ''
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
