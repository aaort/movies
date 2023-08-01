import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col h-full justify-between">
      <header className="flex justify-between items-center py-10 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
        <Breadcrumbs />
        <nav>
          <ul className="flex gap-2 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-16 items-center">
            <li className="relative inline-block group">
              <button>Trending</button>
              <ul className="hidden group-hover:flex flex-col z-10 absolute bg-white border border-gray-300 divide-y divide-gray-100 rounded-md">
                <li className="px-4 py-2">
                  <Link href="/trending/movies" className="navbar-link">
                    Movies
                  </Link>
                </li>
                <li className="px-4 py-2">
                  <Link
                    href="/trending/tv"
                    className="navbar-link whitespace-nowrap	"
                  >
                    TV
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
              <Link href="#" className="navbar-link">
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
      <main className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-20">
        {children}
      </main>
      <footer></footer>
    </div>
  );
}
