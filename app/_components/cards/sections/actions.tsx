'use client';

import { useState } from 'react';

import FavoriteButton from '@/app/_components/FavoriteButton';
import WatchlistButton from '@/app/_components/WatchlistButton';

type Props = {
  isFavorite: boolean;
  isInWatchlist: boolean;
  handleToggleFavorite: (x: boolean) => Promise<void>;
  handleToggleWatchlist: (x: boolean) => Promise<void>;
};

export default function Actions(props: Props) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const {
    isFavorite,
    isInWatchlist,
    handleToggleFavorite,
    handleToggleWatchlist,
  } = props;

  return (
    <div
      style={{ display: isMobile ? 'block' : 'none' }}
      className='block md:hidden md:group-hover:block absolute top-4 right-4 z-10 space-x-4'
    >
      <FavoriteButton checked={isFavorite} onToggle={handleToggleFavorite} />
      <WatchlistButton
        checked={isInWatchlist}
        onToggle={handleToggleWatchlist}
      />
    </div>
  );
}
