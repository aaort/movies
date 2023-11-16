import { toggleFavorite, toggleWatchlist } from '@/app/_actions';
import generateImageUrlByFilename from '@/lib/generateImageUrlByFilename';
import isMovieFavorite from '@/lib/helpers/isMovieFavorite';
import isMovieInWatchlist from '@/lib/helpers/isMovieInWatchlist';
import type { Movie } from '@/types';
import clsx from 'clsx';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { BiMoviePlay } from 'react-icons/bi';
import Actions from './sections/actions';
import isGuest from '@/lib/helpers/isGuest';

type Props = React.ComponentProps<'li'> & {
  movie: Movie;
  index: number;
};

export default async function MovieCard(props: Props) {
  const { movie, index, className, ...rest } = props;
  const posterPath = movie.poster_path
    ? generateImageUrlByFilename(movie.poster_path)
    : null;

  const isFavorite = await isMovieFavorite(movie.id);
  const isInWatchlist = await isMovieInWatchlist(movie.id);

  const handleToggleWatchlist = async (value: boolean) => {
    'use server';
    await toggleWatchlist({ movieId: movie.id, media_type: 'movie', value });
  };

  const handleToggleFavorite = async (value: boolean) => {
    'use server';
    await toggleFavorite({ movieId: movie.id, media_type: 'movie', value });
  };

  return (
    <li className={clsx('grid-card group', className)} {...rest}>
      <Link href={`/movie/${movie.id}`} className='text-current'>
        <div className='grid-card-overlay'>
          {!isGuest() && (
            <Actions
              isFavorite={isFavorite}
              isInWatchlist={isInWatchlist}
              handleToggleFavorite={handleToggleFavorite}
              handleToggleWatchlist={handleToggleWatchlist}
            />
          )}

          {posterPath ? (
            <Image
              fill
              alt=''
              src={posterPath}
              sizes='(min-width: 1280px) calc(25vw - 112px), (min-width: 1040px) calc(25vw - 80px), (min-width: 780px) calc(25vw - 64px), calc(24.13vw - 49px)'
              className='object-fill'
              priority={index < 6}
            />
          ) : (
            <BiMoviePlay className='h-full w-full' />
          )}
          <div className='grid-card-text-box'>
            <p className='overflow-ellipsis break-words line-clamp-2'>
              {movie.title}
            </p>
            <p> {movie.release_date}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
