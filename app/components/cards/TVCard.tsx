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
    <Link href={`/tv/${tv.id}`} className='min-w-[20vw] grid-card group'>
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
          src={`${imagesBaseUrl}${tv.poster_path}`}
          sizes='(min-width: 1280px) calc(25vw - 112px), (min-width: 1040px) calc(25vw - 80px), (min-width: 780px) calc(25vw - 64px), calc(24.13vw - 49px)'
          className='object-fill'
          priority={index < 6}
        />
      </div>
      <div className='grid-card-text-box'>
        <p className='overflow-ellipsis break-words line-clamp-2'>
          {tv.original_name}
        </p>
        <p>{tv.first_air_date}</p>
      </div>
    </Link>
  );
}
