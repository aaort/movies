import get from '@/lib/api/get';
import toggleMovieMetadata from '@/lib/api/toggleMovieMetadata';
import generateImageUrlByFilename from '@/lib/generateImageUrlByFilename';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from '../FavoriteButton';
import WatchlistButton from '../WatchlistButton';

type Props = {
  movie: Movie;
  index: number;
};

export default async function MovieGridCard({ movie, index }: Props) {
  const posterPath = generateImageUrlByFilename(movie.poster_path);
  const favoriteMovies = (
    await get<ResultType<Movie>>(`account/{}/favorite/movies`, {
      cache: 'no-cache',
    })
  )?.results;

  const watchlistMovies = (
    await get<ResultType<Movie>>(`account/{}/watchlist/movies`, {
      cache: 'no-cache',
    })
  )?.results;

  const isFavorite =
    favoriteMovies?.some((favoriteMovie) => favoriteMovie.id === movie.id) ??
    false;
  const isInWatchList =
    watchlistMovies?.some((listMovie) => listMovie.id === movie.id) ?? false;

  const onToggleFavorite = async (value: boolean) => {
    'use server';
    const sessionId = cookies().get('session_id')?.value;
    if (!sessionId) return;

    await toggleMovieMetadata({
      movieId: movie.id,
      sessionId,
      data: { favorite: value },
    });
  };

  const onToggleWatchlist = async (value: boolean) => {
    'use server';
    const sessionId = cookies().get('session_id')?.value;
    if (!sessionId) return;

    await toggleMovieMetadata({
      movieId: movie.id,
      sessionId,
      data: { watchlist: value },
    });
  };

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className='grid-card group h-full'>
        <div className="relative w-full aspect-[1/1.5] after:content-[' '] after:absolute after:w-full after:h-full after:bg-slate-900 after:bg-opacity-0 group-hover:after:bg-opacity-40 after:duration-300">
          <div className='hidden absolute top-4 right-4 z-10 group-hover:block space-x-4'>
            <FavoriteButton checked={isFavorite} onToggle={onToggleFavorite} />
            <WatchlistButton
              checked={isInWatchList}
              onToggle={onToggleWatchlist}
            />
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
