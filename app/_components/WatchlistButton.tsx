'use client';

import { useState } from 'react';
import { MdPlaylistAdd } from 'react-icons/md';

type Props = {
  checked: boolean;
  onToggle: (value: boolean) => Promise<void>;
};

export default function WatchlistButton({ checked, onToggle }: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    onToggle(!isChecked);
  };

  return (
    <button
      className='p-2 bg-slate-700 rounded-full hover:scale-110'
      onClick={handleToggle}
    >
      <MdPlaylistAdd
        aria-checked={isChecked}
        className='w-6 h-6 stroke-current aria-checked:fill-red-400 aria-checked:stroke-red-400'
      />
    </button>
  );
}
