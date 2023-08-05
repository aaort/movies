'use client';

import { useState } from 'react';

type Props = {
  checked: boolean;
  onToggle: (value: boolean) => void;
};

export default function FavoriteButton({ checked, onToggle }: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    onToggle(!isChecked);
  };

  return (
    <button
      className='p-2 bg-slate-200 rounded-full hover:opacity-90'
      onClick={handleToggle}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        aria-checked={isChecked}
        className='w-6 h-6 stroke-current aria-checked:fill-red-400 aria-checked:stroke-red-400'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
        />
      </svg>
    </button>
  );
}
