import { toggleFavorite } from '@/app/actions';
import generateImageUrlByFilename from '@/lib/api/generateImageUrlByFilename';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

type Props = {
  movie: Movie;
  index: number;
  favorite: boolean;
};

export default function MovieItem({ movie, index, favorite }: Props) {
  const posterPath = generateImageUrlByFilename(movie.poster_path);

  const handleToggleFavorite = async (value: boolean) => {
    'use server';
    toggleFavorite(movie.id, value);
  };

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className='flex group relative flex-col gap-4 bg-slate-300 text-slate-900 rounded-md overflow-clip'>
        <div className="relative w-full aspect-[1/1.5] after:content-[' '] after:absolute after:w-full after:h-full after:bg-slate-900 after:bg-opacity-0 group-hover:after:bg-opacity-40 after:duration-300">
          <div className='hidden absolute top-4 right-4 z-10 hover:scale-110 group-hover:block'>
            <FavoriteButton
              checked={favorite}
              onToggle={handleToggleFavorite}
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
