import { toggleMovieFavorite, toggleMovieWatchlist } from '@/app/actions';
import get from '@/lib/api/get';
import generateImageUrlByFilename from '@/lib/generateImageUrlByFilename';
import isMovieFavorite from '@/lib/helpers/isMovieFavorite';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from '../FavoriteButton';
import WatchlistButton from '../WatchlistButton';

type Props = {
  movie: Movie;
  index: number;
};

export default async function MovieCard({ movie, index }: Props) {
  const posterPath = generateImageUrlByFilename(movie.poster_path);

  const watchlistMovies = (
    await get<ResultType<Movie>>(`account/{}/watchlist/movies`, {
      cache: 'no-cache',
    })
  )?.results;

  const isFavorite = await isMovieFavorite(movie.id);
  const isInWatchList =
    watchlistMovies?.some((listMovie) => listMovie.id === movie.id) ?? false;

  const handleToggleWatchlist = async (value: boolean) => {
    'use server';
    await toggleMovieWatchlist({ movieId: movie.id, value });
  };

  const handleToggleFavorite = async (value: boolean) => {
    'use server';
    await toggleMovieFavorite({ movieId: movie.id, value });
  };

  return (
    <Link href={`/movie/${movie.id}`} className='min-w-[20vw]'>
      <div className='grid-card group h-full'>
        <div className="relative w-full aspect-[1/1.5] after:content-[' '] after:absolute after:w-full after:h-full after:bg-slate-900 after:bg-opacity-0 group-hover:after:bg-opacity-40 after:duration-300">
          <div className='hidden absolute top-4 right-4 z-10 group-hover:block space-x-4'>
            <FavoriteButton
              checked={isFavorite}
              onToggle={handleToggleFavorite}
            />
            <WatchlistButton
              checked={isInWatchList}
              onToggle={handleToggleWatchlist}
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
        <p className='mx-4 mb-4 break-normal'>
          {movie.title}
          <br />
          {movie.release_date}
        </p>
      </div>
    </Link>
  );
}
