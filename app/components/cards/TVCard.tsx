import isTVFavorite from '@/lib/helpers/isTVFavorite';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from '../FavoriteButton';
import WatchlistButton from '../WatchlistButton';
import isTVInWatchlist from '@/lib/helpers/isTVInWatchlist';
import { toggleFavorite, toggleWatchlist } from '@/app/actions';

type Props = {
  tv: TV;
  index: number;
};

const imagesBaseUrl = 'https://image.tmdb.org/t/p/original/';

export default async function TVCard({ tv, index }: Props) {
  const isFavorite = await isTVFavorite(tv.id);
  const isInWatchlist = await isTVInWatchlist(tv.id);

  const handleToggleWatchlist = async (value: boolean) => {
    'use server';
    await toggleWatchlist({ movieId: tv.id, media_type: 'tv', value });
  };

  const handleToggleFavorite = async (value: boolean) => {
    'use server';
    await toggleFavorite({ movieId: tv.id, media_type: 'tv', value });
  };

  return (
    <Link href={`/tv/${tv.id}`} className='min-w-[20vw]'>
      <div className='grid-card group h-full'>
        <div className="relative w-full aspect-[1/1.5] after:content-[' '] after:absolute after:w-full after:h-full after:bg-slate-900 after:bg-opacity-0 group-hover:after:bg-opacity-40 after:duration-300">
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
            src={`${imagesBaseUrl}${tv.poster_path}`}
            sizes='(min-width: 1280px) calc(25vw - 112px), (min-width: 1040px) calc(25vw - 80px), (min-width: 780px) calc(25vw - 64px), calc(24.13vw - 49px)'
            className='object-fill'
            priority={index < 6}
          />
        </div>
        <div className='mx-4 mb-4'>
          <p>{tv.name}</p>
          <p>{tv.first_air_date}</p>
        </div>
      </div>
    </Link>
  );
}
