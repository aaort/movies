import { toggleFavorite, toggleWatchlist } from '@/app/actions';
import get from '@/lib/api/get';
import generateImageUrlByFilename from '@/lib/generateImageUrlByFilename';
import isMovieFavorite from '@/lib/helpers/isMovieFavorite';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from '../FavoriteButton';
import WatchlistButton from '../WatchlistButton';
import isMovieInWatchlist from '@/lib/helpers/isMovieInWatchlist';

type Props = {
  movie: Movie;
  index: number;
};

export default async function MovieCard({ movie, index }: Props) {
  const posterPath = generateImageUrlByFilename(movie.poster_path);

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
    <Link href={`/movie/${movie.id}`} className='min-w-[20vw] grid-card group'>
      <div className='grid-card-overlay'>
        <div className='hidden absolute top-4 right-4 z-10 group-hover:block space-x-4'>
          <FavoriteButton
            checked={isFavorite}
            onToggle={handleToggleFavorite}
          />
          <WatchlistButton
            checked={isInWatchlist}
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
        <div className='grid-card-text-box'>
          <p className='mx-4 mb-4 break-normal'>
            {movie.title}
            <br />
            {movie.release_date}
          </p>
        </div>
      </div>
    </Link>
  );
}
