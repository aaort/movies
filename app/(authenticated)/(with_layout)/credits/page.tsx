import { TMDB_API_DOCS_LINK, TMDB_LINK } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Credits() {
  return (
    <div className='flex flex-col gap-10 items-center'>
      <p className='text-transparent bg-clip-text bg-gradient-to-r from-tmdb-green to-tmdb-blue'>
        This product uses the
        <Link
          className='text-current hover:underline decoration-tmdb-green'
          href={TMDB_API_DOCS_LINK}
        >
          {' '}
          TMDB API{' '}
        </Link>
        but is not endorsed or certified by{' '}
        <Link
          className='text-current hover:underline decoration-tmdb-blue'
          href={TMDB_LINK}
        >
          TMDB
        </Link>
        .
      </p>

      <Image alt='TMDB logo' src='/tmdb_logo.svg' width={185} height={133} />
    </div>
  );
}
