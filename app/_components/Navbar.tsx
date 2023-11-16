'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { deleteSession } from '../_actions';

type Props = React.ComponentProps<'ul'> & {};

export default function Navbar(props: Props) {
  const segments = useSelectedLayoutSegments();

  const isInForYou = /upcoming|favorite|watchlist/.test(segments?.at(-1) ?? '');
  const isActive = (route: string) => segments.at(-1) === route;

  return (
    <ul className={props.className}>
      <NavbarLink href='/general' isActive={isActive('general')}>
        General
      </NavbarLink>
      <div className='relative inline-block group'>
        <button
          className={clsx('navbar-link after:hidden', {
            'text-current': segments.at(0) === 'trending',
          })}
        >
          Trending
        </button>

        <ul className='scale-y-0 duration-150 group-hover:scale-y-100 flex flex-col [&_a]:text-[1rem] gap-4 p-4 z-50 absolute bg-primary-50 border border-primary-300 rounded-md shadow-2xl'>
          <NavbarLink isActive={isActive('movies')} href='/trending/movies'>
            Movies
          </NavbarLink>
          <NavbarLink isActive={isActive('tvs')} href='/trending/tvs'>
            TV Series
          </NavbarLink>
          <NavbarLink isActive={isActive('people')} href='/trending/people'>
            People
          </NavbarLink>
        </ul>
      </div>

      <div className='relative inline-block group'>
        <button
          className={clsx('navbar-link after:hidden', {
            'text-current': isInForYou,
          })}
        >
          For You
        </button>

        <ul className='scale-y-0 duration-150 group-hover:scale-y-100 [&_a]:text-[1rem] flex flex-col gap-4 p-4 z-50 absolute bg-primary-50 border border-primary-300 rounded-md shadow-2xl'>
          <NavbarLink isActive={isActive('upcoming')} href='/upcoming'>
            Upcoming
          </NavbarLink>
          <NavbarLink isActive={isActive('favorite')} href='/favorite'>
            Favorite
          </NavbarLink>
          <NavbarLink isActive={isActive('watchlist')} href='/watchlist'>
            Watchlist
          </NavbarLink>
        </ul>
      </div>

      <NavbarLink href='/credits' isActive={isActive('credits')}>
        Credits
      </NavbarLink>

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
        className={clsx('navbar-link whitespace-nowrap w-fit', {
          'after:w-full text-current': isActive,
        })}
      >
        {children}
      </Link>
    </li>
  );
}
