import Link from 'next/link';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col h-full justify-between">
      <header className="flex justify-between items-center py-10 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
        <h1 className="italic text-xl">Movies</h1>
        <nav className="flex gap-4">
          <ul className="flex gap-4">
            <li>
              <Link href="#" className="navbar-link">
                TV Series
              </Link>
            </li>
            <li>
              <Link href="/trending/people" className="navbar-link">
                People
              </Link>
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
