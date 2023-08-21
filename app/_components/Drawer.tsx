'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Drawer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    // Close drawer on each route change
    setIsOpen(false);
  }, [segment]);

  const toggle = () => setIsOpen(!isOpen);

  const classes = `${isOpen ? 'right-0' : '-right-[100%]'}`;

  return (
    <>
      {isOpen ? (
        <MdOutlineClose
          className='text-primary-500/70 w-6 h-6 cursor-pointer'
          onClick={toggle}
        />
      ) : (
        <RxHamburgerMenu
          className='text-primary-500/70 w-6 h-6 cursor-pointer'
          onClick={toggle}
        />
      )}
      <ul
        className={`${classes} absolute block z-[100] bg-primary-100 w-[30%] min-w-[200px] px-10 h-full space-y-10 duration-300`}
      >
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
      </ul>
    </>
  );
}
