import Link from 'next/link';
import { deleteSession } from '../_actions';
import Drawer from './Drawer';
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
    <header className='flex justify-between gap-4 items-center horizontal-p py-8 bg-primary-100'>
      {leftComponent ?? (includeSearch && <Search />)}
      <nav>
        <div className='block lg:hidden'>
          <Drawer />
        </div>
        <ul className='hidden lg:flex gap-2 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-16 items-center'>
          <NavbarLink href='/general'>General</NavbarLink>
          <ul className='relative inline-block group'>
            <button className='navbar-link after:hidden'>Trending</button>
            <ul className='hidden group-hover:flex [&_a]:text-[1rem] flex-col gap-4 p-4 z-50 absolute bg-primary-50 border border-primary-300 rounded-md shadow-2xl'>
              <NavbarLink href='/trending/movies'>Movies</NavbarLink>
              <NavbarLink href='/trending/tvs'>TV Series</NavbarLink>
              <NavbarLink href='/trending/people'>People</NavbarLink>
            </ul>
          </ul>
          <NavbarLink href='/upcoming'>Upcoming</NavbarLink>
          <NavbarLink href='/favorite'>Favorite</NavbarLink>
          <NavbarLink href='/watchlist'>Watchlist</NavbarLink>
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
      </nav>
    </header>
  );
}

type NavbarLinkProps = React.PropsWithChildren & {
  href: string;
};

function NavbarLink({ children, href }: NavbarLinkProps) {
  return (
    <li>
      <Link href={href} className='navbar-link whitespace-nowrap w-full'>
        {children}
      </Link>
    </li>
  );
}
