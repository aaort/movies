import addMovieToFavorite from '@/lib/api/addMovieToFavorite';
import generateImageUrlByFilename from '@/lib/api/generateImageUrlByFilename';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  movie: Movie;
  index: number;
};

export default function MovieItem({ movie, index }: Props) {
  async function addToFavorite() {
    'use server';
    const sessionId = cookies().get('session_id')?.value;
    if (!sessionId) return;

    try {
      await addMovieToFavorite(movie.id, sessionId);
    } catch (e) {
      throw e;
    }
  }

  const posterPath = generateImageUrlByFilename(movie.poster_path);

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className='flex relative flex-col gap-4 bg-slate-300 text-slate-900 rounded-md overflow-clip cursor-pointer'>
        <div className="relative w-full aspect-[1/1.5] after:content-[' '] after:absolute after:w-full after:h-full after:bg-slate-900 after:bg-opacity-0 hover:after:bg-opacity-40 after:duration-300">
          <div className='flex flex-col gap-4 absolute top-4 right-4 z-10'>
            <form action={addToFavorite}>
              <button
                className='p-2 bg-slate-200 rounded-full hover:opacity-90'
                type='submit'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                  />
                </svg>
              </button>
            </form>
          </div>
          <Image
            fill
            alt=''
            src={posterPath}
            sizes='(min-width: 1280px) calc(25vw - 112px), (min-width: 1040px) calc(25vw - 80px), (min-width: 780px) calc(25vw - 64px), calc(24.13vw - 49px)'
            className='object-fill'
            priority={index < 6}
          />
        </div>
        <div className='mx-4 mb-4'>
          <p>{movie.title}</p>
          <p>{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
}
