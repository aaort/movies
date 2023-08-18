'use client';

import { useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type Props = {
  checked: boolean;
  onToggle: (value: boolean) => Promise<void>;
};

export default function FavoriteButton({ checked, onToggle }: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    onToggle(!isChecked);
  };

  const icons = {
    filled: AiFillHeart,
    outlined: AiOutlineHeart,
  };

  const Children: IconType = icons[isChecked ? 'filled' : 'outlined'];
  const props = useMemo(
    () => ({
      'aria-checked': isChecked,
      className:
        'w-6 h-6 stroke-current aria-checked:fill-red-400 aria-checked:stroke-red-400',
    }),
    [isChecked]
  );

  return (
    <button
      className='p-2 bg-primary-700 rounded-full hover:scale-110'
      onClick={handleToggle}
    >
      <Children {...props} />
    </button>
  );
}
